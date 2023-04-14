import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./contexts/contextProvider";

import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";

import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

// const store = configureStore(reducers, compose(applyMiddleware(thunk)))
import PrintProvider from "react-easy-print";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <PrintProvider>
      <React.StrictMode>
        <Router basename={window.location.pathname || ""}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </PrintProvider>
  </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
