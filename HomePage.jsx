import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ✅ FIX PUBLIC KEY ERROR (VERY IMPORTANT)
if (typeof window !== "undefined") {
  if (!window.PublicKeyCredential) {
    window.PublicKeyCredential = function () {};
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);