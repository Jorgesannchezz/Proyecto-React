import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Si tienes estilos globales
import App from './App'; // Componente principal
import 'bootstrap/dist/css/bootstrap.min.css'; // Si usas Bootstrap

// Montar la app con un solo Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* Renderizamos App dentro de un solo Router */}
  </React.StrictMode>
);
