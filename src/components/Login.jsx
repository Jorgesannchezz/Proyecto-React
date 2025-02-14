import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username);
    navigate('/profile');
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Introduce tu nombre" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Login;
