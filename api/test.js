export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
        text: "🧪 TEST RENTALS AI - Webhook funcionando correctamente"
      })
    });

    if (response.ok) {
      res.json({ status: "test_sent", message: "Test enviado a Telegram" });
    } else {
      throw new Error('Error en test de Telegram');
    }

  } catch (error) {
    console.error("❌ Error en test:", error);
    res.status(500).json({ error: "Error en test", details: error.message });
  }
}