import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//my imports
import {store,persistor }from "./store";
import { PersistGate } from 'redux-persist/integration/react';
// import store from "./store"; -> before persistent redux
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
// </React.StrictMode>
);

