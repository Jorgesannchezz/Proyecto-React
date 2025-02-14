import { useEffect, useState } from 'react';
import React from 'react';
import './Fetch.css';

export const Fetch = () => {
    const [user, setUser] = useState<any>(null);

    // Función para obtener los datos del usuario
    const fetchUser = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        setUser(data.results[0]);
      } catch (error) {
        console.error('Error fetching the user:', error);
      }
    };

    useEffect(() => {
        fetchUser();
    }, []); // El array vacío asegura que se ejecute una sola vez al montar el componente

    const onClickButton = () => {
        fetchUser();
    };

    // Renderizar los datos del usuario
    return (
      <div className="container">
          {user ? (
              <div>
                  <img 
                      className="profileImage" 
                      src={user.picture.large} 
                      alt={`${user.name.first} ${user.name.last}`} 
                  />
                  <h2 className="profileName">{`${user.name.first} ${user.name.last}, ${user.dob.age}`}</h2>
                  <p className="profileInfo">{`Email: ${user.email}`}</p>
                  <p className="profileInfo">{`Localización: ${user.location.city}, ${user.location.country}`}</p>
                  <button className="myButton" onClick={onClickButton}>Cambiar Persona</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
