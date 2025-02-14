const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_KEY = "AIzaSyBDN3Ar7fnJXgUcG1gdbq9HMc0yEBHbwBA";

// Contexto del chatbot
const context = `
Eres Geminis, un chatbot especializado en ayudar con mi proyecto de tienda ecommerce.
Responde de manera profesional y clara. Si una pregunta no está relacionada con el proyecto,
responde: "No estoy preparado para esa información, pero puedo ayudarte con preguntas
relacionadas con nuestra tienda de ropa como pedidos, devoluciones, etc".
`;

// Ruta para manejar los mensajes del usuario
app.post('/api/geminis', async (req, res) => {
  const userMessage = req.body.message;

  // Construcción del prompt con el contexto
  const fullPrompt = `${context}\nUsuario: ${userMessage}\nGeminis:`;

  try {
    // Llamada a la API de Google Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: fullPrompt }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Obtener la respuesta de la API
    const botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "Lo siento, no pude procesar tu mensaje en este momento.";

    // Responder al usuario
    res.json({ reply: botResponse });

  } catch (error) {
    console.error('Error en la API:', error.response ? error.response.data : error.message);
    res.json({ reply: 'Lo siento, hubo un error al procesar tu solicitud.' });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


//AIzaSyBDN3Ar7fnJXgUcG1gdbq9HMc0yEBHbwBA