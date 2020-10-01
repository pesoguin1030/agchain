import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./appContext";
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

function App() {
  // Auth
  const [authState, authDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE":
          return {
            ...prevState,
            user: action.user,
          };
        case "LOGIN":
          return {
            ...prevState,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      user: null,
    }
  );
  // Setup
  useEffect(() => {
    const bootstrapAsync = async () => {
      const authToken = localStorage.getItem("AUTH_TOKEN");
      if (authToken) {
        // Set the token globally
        request.defaults.headers.common.Authorization = `Bearer ${authToken}`;
        // Validate token
        const user = await fetchUser();
        authDispatch({
          type: "RESTORE",
          user: user,
        });
      }
    };
    bootstrapAsync();
  });
  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <Switch>
          <Route path="/dapp">
            <Dapp />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
