import React, { useReducer, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext, CartContext } from "./appContext";
import Home from "./pages/Home";
import request from "./utils/request";
import Dapp from "./pages/Dapp";
import Admin from "./pages/Admin";
import { fetchUser } from "./api/user";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/Exception/404";
import storage from "./utils/storage";
import ShoppingCart from "./pages/Shop/cart";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import GiftMaker from "./pages/Shop/gift";

// Stylesheets
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-free/css/all.css";
import "./themes/default.css";
import Analysis from "./pages/Shop/analysis";

function App() {
  // Auth
  const [authState, authDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE":
          request.defaults.headers.common.Authorization = `Bearer ${action.accessToken}`;
          storage.setAccessToken(action.accessToken);
          return {
            ...prevState,
            user: action.user,
            accessToken: action.accessToken,
          };
        case "LOGIN":
          request.defaults.headers.common.Authorization = `Bearer ${action.accessToken}`;
          storage.setAccessToken(action.accessToken);
          return {
            ...prevState,
            user: action.user,
            accessToken: action.accessToken,
          };
        case "LOGOUT":
          request.defaults.headers.common.Authorization = ``;
          storage.clear();
          return {
            ...prevState,
            user: null,
            accessToken: null,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      user: null,
      accessToken: null,
    }
  );
  // Shopping cart
  const [cart, setCart] = useState(null);

  // Setup
  useEffect(() => {
    const bootstrapAsync = async () => {
      // Auth
      const accessToken = storage.getAccessToken();
      if (accessToken) {
        // Set the token globally
        request.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // Validate token
        try {
          const user = await fetchUser();
          authDispatch({
            type: "RESTORE",
            user: user,
            accessToken: accessToken,
          });
        } catch (error) {
          console.error("Invalid token");
        }
      }
      // Shopping cart
      const cart = storage.getShoppingCart();
      if (Array.isArray(cart)) {
        setCart(cart);
      } else {
        setCart([]);
      }
    };
    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (cart) {
      storage.setShoppingCart(cart);
    }
  }, [cart]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      <CartContext.Provider value={{ cartState: cart, cartDispatch: setCart }}>
        <Router>
          <Switch>
            <Route path="/admin">
              {authState.user ? <Admin /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {authState.user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route path="/order">
              <Header />
              <Order />
            </Route>
            <Route path="/">
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/shop">
                  <Shop />
                </Route>
                <Route exact path="/shop/gift">
                  <GiftMaker />
                </Route>
                <Route path="/dapp/:traceID">
                  <Dapp />
                </Route>
                <Route path="/shop/cart">
                  <ShoppingCart />
                </Route>
                <Route path="/shop/analysis">
                  <Analysis />
                </Route>
                <Route path="/404">
                  <NotFound />
                </Route>
              </Switch>
              <Route
                exact
                path="/shop/order"
                render={() =>
                  (window.location =
                    "https://dev.to/mxdavis/redirecting-to-an-external-url-within-react-router-3nf1")
                }
              />
              <Footer />
            </Route>
          </Switch>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
