import React, { useState } from 'react';
import { Fetch } from './componentes/Fetch';
import Botones from './componentes/Botones';
import { InputBox } from './componentes/InputBox';
import CatUsingHooks from "./componentes/CatsUsingHooks";
import "./componentes.css";
import { VoiceInput } from "./recVoice"

const ComponentsSection = () => {
  
  const [showComponent, setShowComponent] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);

  return (
    <div className="components-section">
      {/* Grupo 1: Botón y componente */}
      <div className="component-wrapper">
        <button onClick={() => setShowComponent(!showComponent)}>
          {showComponent ? 'Ocultar componente' : 'Mostrar componente'}
        </button>

        {showComponent && (
          <div className="component-container">
            <CatUsingHooks />
          </div>
        )}
      </div>

      {/* Grupo 2: Botón y componente */}
      <div className="component-wrapper">
        <button onClick={() => setShowComponent2(!showComponent2)}>
          {showComponent2 ? 'Ocultar componente' : 'Mostrar componente'}
        </button>

        {showComponent2 && (
          <div className="component-container">
            <Botones />
          </div>
        )}
      </div>

      {/* Grupo 3: Botón y componente */}
      <div className="component-wrapper">
        <button onClick={() => setShowComponent3(!showComponent3)}>
          {showComponent3 ? 'Ocultar componente' : 'Mostrar componente'}
        </button>

        {showComponent3 && (
          <div className="component-container">
            <VoiceInput />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentsSection;
