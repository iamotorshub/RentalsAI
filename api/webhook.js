const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    if (!data) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: "No data received" })
      };
    }

    const nombre = data.nombre || 'No especificado';
    const telefono = data.telefono || 'No especificado';
    const email = data.email || 'No especificado';
    const dia = data.dia || 'No especificado';
    const hora = data.hora || 'No especificado';

    // Mensaje para Telegram
    const mensaje = `🏠 RENTALS AI - Nueva consulta:
📱 Nombre: ${nombre}
📞 Teléfono: ${telefono}
📧 Email: ${email}
📅 Fecha: ${dia}
🕐 Hora: ${hora}`;

    // Enviar a Telegram
    const TELEGRAM_BOT_TOKEN = "8334312092:AAGiK-6DEkboJHfEBFrv893SqfYBf09mps0";
    const TELEGRAM_CHAT_ID = "5392151099";

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: mensaje
      })
    });

    if (response.ok) {
      console.log("✅ Mensaje enviado a Telegram:", mensaje);
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ status: "success", message: "Datos enviados correctamente" })
      };
    } else {
      throw new Error('Error enviando a Telegram');
    }

  } catch (error) {
    console.error("❌ Error en webhook RentalsAI:", error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: "Error procesando webhook", details: error.message })
    };
  }
};