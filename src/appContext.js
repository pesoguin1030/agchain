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

const destContext = React.createContext({
  destState: [{ name: "", phone: "", address: "" }],
  destDispatch: () => {},
});
export {
  AuthContext,
  ThemeContext,
  CartContext,
  destContext,
  // Export it so it can be used by other Components
};
