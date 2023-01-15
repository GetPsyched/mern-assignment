import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';
import App from './App';

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
