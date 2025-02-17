/*import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './ChatbotConfig';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser.js';

const ChatbotComponent = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <div>
      <button 
        onClick={toggleChatbotVisibility} 
        style={buttonStyle}
      >
        {isChatbotVisible ? '🤖' : '🤖'}
      </button>
      {isChatbotVisible && (
        <div style={chatbotStyle}>
          <Chatbot 
            config={config} 
            actionProvider={ActionProvider} 
            messageParser={MessageParser} 
          />
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '60px',
  height: '60px',
  fontSize: '24px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: 1001,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const chatbotStyle = {
  position: 'fixed',
  bottom: '90px', 
  right: '20px',
  maxWidth: '300px',
  zIndex: 1000,
};

export default ChatbotComponent;*/