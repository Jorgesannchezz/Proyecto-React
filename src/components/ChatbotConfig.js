import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const config = {
  botName: "GeminisBot",
  initialMessages: [createChatBotMessage(`Hola! ¿En qué puedo ayudarte hoy?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;