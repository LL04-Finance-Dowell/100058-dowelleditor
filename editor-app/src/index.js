import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './contexts/ContextProvider';

import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'

import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';


// const store = configureStore(reducers, compose(applyMiddleware(thunk)))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <ContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ContextProvider>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
