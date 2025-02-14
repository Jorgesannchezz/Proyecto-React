// filepath: /E:/Clase/2-DAM/DAD/Proyecto_react_native/ProyectoJorgeBolañosJS/src/App.jsx
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import ComponentsSection from './components/ComponentsSection';
import ApiSection from './components/ApiSection';
import UseReducerSection from './components/UseReducerSection';
import Login from './components/Login';
import Profile from './components/Profile';
import Informes from './components/Informe';
import { Fetch } from "./components/componentes/Fetch";
import { AuthProvider } from './context/AuthContext'; // Contexto de autenticación
import { ThemeProvider } from './context/ThemeContext'; // Contexto de tema
import ChatbotComponent from './components/Chatbot'; // Importa el componente del chatbot

function App() {
  return (
    <Router>  {/* El Router solo debe estar aquí */}
      <AuthProvider>  {/* El AuthProvider puede estar aquí */}
        <ThemeProvider>  {/* El ThemeProvider puede estar aquí */}
          <Navbar />
          <Routes>
            <Route path="/components" element={<ComponentsSection />} />
            <Route path="/api" element={<Fetch />} />
            <Route path="/use-reducer" element={<UseReducerSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/informes" element={<Informes />} />
            <Route path="/" element={<ComponentsSection />} /> {/* Página de inicio */}
          </Routes>
          <ChatbotComponent /> {/* Añade el componente del chatbot */}
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
