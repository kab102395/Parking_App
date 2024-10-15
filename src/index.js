import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // This is the main Router for the app
import App from './App';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <BrowserRouter>  {/* Wrap the entire app with BrowserRouter */}
    <App />
  </BrowserRouter>
);
