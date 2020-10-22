import React from "react";

const AuthContext = React.createContext({
  state: {},
  reducer: () => {},
});

const CartContext = React.createContext({
  cartState: [],
  cartDispatch: () => {},
});

const ThemeContext = React.createContext({
  style: {},
});

export {
  AuthContext,
  ThemeContext,
  CartContext,
  // Export it so it can be used by other Components
};
