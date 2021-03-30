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

const DestContext = React.createContext({
  destState: [{ name: "", phone: "", address: "" }],
  destDispatch: () => {},
});
export {
  AuthContext,
  ThemeContext,
  CartContext,
  DestContext,
  // Export it so it can be used by other Components
};
