import React from 'react'

const AuthContext = React.createContext({user: {}}); // Create a context object

export {
  AuthContext // Export it so it can be used by other Components
};