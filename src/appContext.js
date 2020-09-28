import React from "react";

const AuthContext = React.createContext({
  user: {},
}); // Create a context object

const ThemeContext = React.createContext({
  style: {},
}); // Create a context object

export {
  AuthContext,
  ThemeContext,
  // Export it so it can be used by other Components
};
