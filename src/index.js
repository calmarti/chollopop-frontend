import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { addTokenToHeaders } from './api/client';

const token = storage.get("AUTH_TOKEN");
addTokenToHeaders(token);


ReactDOM.render(
  /* <React.StrictMode> */
      <App isAlreadyLogged={!!token} /> ,
 /*  </React.StrictMode>, */
  document.getElementById('root')
);


