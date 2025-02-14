import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const VoiceInput = () => {
  const [submittedText, setSubmittedText] = useState('');
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  // Comprobar si el navegador soporta el reconocimiento de voz
  const isSpeechRecognitionSupported = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!isSpeechRecognitionSupported) {
    return <div>No esta permitido el microfono.</div>;
  }

  const handleSubmit = () => {
    setSubmittedText(transcript); 
    resetTranscript(); 
  };

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <input
        type="text"
        value={transcript}
        readOnly 
      />
      <button onClick={handleSubmit}>Enviar</button>
      {!listening ? (
        <button onClick={handleStartListening}>Escuchar</button> 
      ) : (
        <button onClick={handleStopListening}>Dejar de escuchar</button> 
      )}
      <div>
        <h3>TEXTO ENVIADO:</h3>
        <p>{submittedText}</p>
      </div>
    </div>
  );
};