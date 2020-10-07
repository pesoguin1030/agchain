import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDIbYr1PWgESCldK_C0OYoVOQMjU_lEJig",
  authDomain: "fresh-io.firebaseapp.com",
  databaseURL: "https://fresh-io.firebaseio.com",
  projectId: "fresh-io",
  storageBucket: "fresh-io.appspot.com",
  messagingSenderId: "51185430857",
  appId: "1:51185430857:web:75c1b7494682706d09aa98",
  measurementId: "G-MY6TVXNKZ1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
