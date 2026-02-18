export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "No data received" });
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
      res.json({ status: "success", message: "Datos enviados correctamente" });
    } else {
      throw new Error('Error enviando a Telegram');
    }

  } catch (error) {
    console.error("❌ Error en webhook RentalsAI:", error);
    res.status(500).json({ error: "Error procesando webhook", details: error.message });
  }
}