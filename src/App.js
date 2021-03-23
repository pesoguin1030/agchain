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
import Dapp from "./pages/Dapp/index";
import Partner from "./pages/Partner/index";

import AccountInfo from "./pages/Account/index";

import Admin from "./pages/Admin";
import { fetchUser } from "./api/user";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Payment from "./pages/Payment";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/Exception/404";
import storage from "./utils/storage";
import ShoppingCart from "./pages/Shop/cart";
import DiffShoppingCart from "./pages/Shop/diffCart";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import GiftMaker from "./pages/Shop/gift";
import SingleProduct from "./pages/Shop/single-product";

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
    // console.log((authState.user));
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
              {authState.user ? <Admin /> : <Login />}
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
            <Route path="/user">
              <Header />
              <Switch>
                <Route exact path="/user/account/info">
                  {authState.user ? <AccountInfo /> : <Login />}
                </Route>
                {/* TODO */}
              </Switch>
            </Route>
            <Route path="/shop">
              <Header />
              <Switch>
                <Route exact path="/shop">
                  <Shop />
                </Route>
                <Route exact path="/shop/single-product/:id">
                  <SingleProduct />
                </Route>
                <Route exact path="/shop/gift/:orderNumber">
                  <GiftMaker />
                </Route>
                <Route path="/dapp/:traceID">
                  <Dapp />
                </Route>
                <Route path="/partner/:traceID">
                  <Partner />
                </Route>
                <Route path="/shop/cart">
                  {authState.user ? <ShoppingCart /> : <Redirect to="/login" />}
                </Route>
                <Route path="/shop/diffCart">
                  {authState.user ? (
                    <DiffShoppingCart />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route exact path="/shop/analysis/:orderNumber">
                  <Analysis />
                </Route>
              </Switch>
            </Route>
            <Route path="/">
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Route exact path="/dapp/:traceID">
                  <Dapp />
                </Route>

                <Route exact path="/partner/:traceID">
                  <Partner />
                </Route>

                <Route path="/404">
                  <NotFound />
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
