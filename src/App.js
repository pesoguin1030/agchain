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

// Stylesheets management
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-free/css/all.css";
import "./themes/default.css";
import storage from "./utils/storage";
import ShoppingCart from "./pages/Shop/cart";

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
            user: action.user.name,
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
          const user = await fetchUser(accessToken);
          console.log(user);
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
            <Route path="/dapp">
              <Dapp />
            </Route>
            <Route path="/admin">
              {authState.user ? <Admin /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {authState.user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/shop/cart">
                  <ShoppingCart />
                </Route>
              </Switch>
              <Footer />
            </Route>
          </Switch>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
