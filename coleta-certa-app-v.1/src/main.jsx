// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import ReportPage from './pages/ReportPage.jsx';

// Aqui definimos todas as rotas (URLs) do nosso aplicativo
const router = createBrowserRouter([
  {
    path: '/',          // A URL raiz do nosso site
    element: <App />,   // O componente principal que será carregado
    children: [         // Rotas "filhas" que serão exibidas dentro do App
      {
        path: '/',
        element: <HomePage />, // Na URL raiz, mostre a HomePage
      },
      {
        path: '/denunciar',      // Na URL /denunciar
        element: <ReportPage />, // mostre a ReportPage
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);