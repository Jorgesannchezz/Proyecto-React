import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <h2>Perfil de Usuario</h2>
      {user ? (
        <div>
          <h4>Bienvenido, {user.name}!</h4>
        </div>
      ) : (
        <p>No estás autenticado.</p>
      )}
    </div>
  );
};

export default Profile;
