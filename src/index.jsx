import 'bulma/css/bulma.min.css';
// import 'bulma-extensions/dist/css/bulma-extensions.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './i18n/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);