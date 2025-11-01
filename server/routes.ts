import type { Express } from "express";
import { createServer, type Server } from "http";
import { getClaude } from "./claude";
import Anthropic from "@anthropic-ai/sdk";

// Configuración de Resend
// IMPORTANTE: Asegúrate de tener la variable de entorno RESEND_API_KEY configurada
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_TO = "contacto@iamotorshub.com";

// URL base para imágenes en emails - Render genera automáticamente RENDER_EXTERNAL_URL
const BASE_URL = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL || 'https://your-app.onrender.com';

// Función de registro de rutas
export async function registerRoutes(app: Express): Promise<Server> {
  // Ruta para enviar email de contacto
  app.post("/api/send-contact-email", async (req, res) => {
    try {
      const {
        nombre,
        whatsapp,
        email,
        webInstagram,
        descripcion,
        tipo,
        fuente,
        fecha,
        hora,
      } = req.body;

      if (!nombre || !whatsapp || !email || !tipo) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }

      if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY no está configurada");
        return res.status(500).json({
          error: "Configuración de email no disponible. Por favor contacta al administrador."
        });
      }

      // Cuerpo del mail interno
      const emailBody = `
        <h2>Nueva Solicitud de Contacto - Rentals AI</h2>
        <p><strong>Fuente:</strong> ${fuente || "No especificado"}</p>
        <p><strong>Tipo de contacto:</strong> ${tipo}</p>
        <hr>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${webInstagram ? `<p><strong>Web/Instagram:</strong> ${webInstagram}</p>` : ""}
        ${descripcion ? `<p><strong>Descripción:</strong> ${descripcion}</p>` : ""}
        ${
          fecha && hora
            ? `<p><strong>Fecha y hora solicitada:</strong> ${fecha} a las ${hora}</p>`
            : ""
        }
      `;

      // Enviar correo al equipo (desde tu cuenta de contacto)
      const responseTeam = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Rentals AI <${EMAIL_TO}>`,
          to: [EMAIL_TO],
          replyTo: [email],
          subject: `${tipo} - ${nombre} - Rentals AI`,
          html: emailBody,
        }),
      });

      if (!responseTeam.ok) {
        const errorData = await responseTeam.text();
        console.error("Error al enviar email al equipo:", errorData);
        throw new Error("Error al enviar el email al equipo");
      }

      // Cuerpo del mail de confirmación al cliente (diseño profesional con logo)
      const clientEmailBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header con Logo -->
                  <tr>
                    <td style="background-color: #ffffff; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                      <img src="https://rentalsaicosta.com/images/rentalsai-finalsinfondo.png" alt="Rentals AI" style="max-width: 200px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">
                      <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: bold;">¡Gracias por contactarnos!</h1>
                    </td>
                  </tr>

                  <!-- Contenido -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="font-size: 16px; color: #1f2937; line-height: 1.6; margin-bottom: 20px;">
                        Hola <strong>${nombre}</strong>,
                      </p>
                      <p style="font-size: 16px; color: #1f2937; line-height: 1.6; margin-bottom: 30px;">
                        Hemos recibido tu solicitud de <strong style="color: #6366f1;">${tipo}</strong> y estamos muy contentos de poder ayudarte a optimizar tu propiedad.
                      </p>

                      <!-- Detalles en Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="color: #6366f1; margin: 0 0 15px 0; font-size: 18px;">📋 Detalles de tu solicitud:</h3>
                            ${fecha && hora ? `<p style="margin: 8px 0; color: #4b5563;"><strong>📅 Fecha y hora:</strong> ${fecha} a las ${hora}</p>` : ''}
                            <p style="margin: 8px 0; color: #4b5563;"><strong>📧 Email:</strong> ${email}</p>
                            <p style="margin: 8px 0; color: #4b5563;"><strong>📱 WhatsApp:</strong> ${whatsapp}</p>
                            ${webInstagram ? `<p style="margin: 8px 0; color: #4b5563;"><strong>🌐 Web/Instagram:</strong> ${webInstagram}</p>` : ''}
                            ${descripcion ? `<p style="margin: 8px 0; color: #4b5563;"><strong>💬 Tu mensaje:</strong><br>${descripcion}</p>` : ''}
                          </td>
                        </tr>
                      </table>

                      <!-- Próximos pasos -->
                      <div style="background-color: #eff6ff; border-left: 4px solid #6366f1; padding: 15px 20px; border-radius: 4px; margin-bottom: 30px;">
                        <p style="margin: 0; color: #1e40af; font-weight: bold;">✅ ¿Qué sigue ahora?</p>
                        <p style="margin: 10px 0 0 0; color: #1e3a8a; font-size: 14px;">
                          Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo a la brevedad para confirmar los detalles y agendar una reunión.
                        </p>
                      </div>

                      <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
                        Si tenés alguna pregunta urgente, no dudes en responder este email.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #111827; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                      <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Equipo Rentals AI</p>
                      <p style="color: #d1d5db; margin: 0 0 15px 0; font-size: 14px;">Powered by</p>
                      <img src="https://rentalsaicosta.com/images/logo-footer.png" alt="IA MOTORSHUB" style="max-width: 200px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;">
                      <p style="color: #9ca3af; margin: 10px 0 5px 0; font-size: 13px;">
                        📍 Bahía Blanca, Buenos Aires, Argentina<br>
                        📧 contacto@iamotorshub.com<br>
                        📱 WhatsApp: +54 9 291 520-6692
                      </p>
                      <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 11px;">
                        © ${new Date().getFullYear()} IA MOTORSHUB. Todos los derechos reservados.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Enviar correo de confirmación al cliente (también usando tu cuenta de contacto)
      const responseClient = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Rentals AI <${EMAIL_TO}>`,
          to: [email],
          replyTo: [EMAIL_TO],
          subject: `Confirmación de solicitud - Rentals AI`,
          html: clientEmailBody,
        }),
      });

      const dataTeam = await responseTeam.json();
      let dataClient = null;

      if (!responseClient.ok) {
        const errorData = await responseClient.text();
        console.error("Error al enviar email de confirmación al cliente:", errorData);
      } else {
        dataClient = await responseClient.json();
      }

      res.json({
        success: true,
        teamEmailId: dataTeam.id,
        clientEmailId: dataClient?.id || null,
        message: "Solicitud enviada correctamente. Recibirás una confirmación por email."
      });
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Error al enviar el email" });
    }
  });

  // Ruta para optimizar ingresos (Claude)
  app.post("/api/claude/optimize-income", async (req, res) => {
    try {
      const { currentIncome, propertyType, location, amenities } = req.body;

      const prompt = `
        Ayuda a optimizar los ingresos de esta propiedad:
        - Ingresos actuales: $${currentIncome} USD anuales
        - Tipo: ${propertyType}
        - Ubicación: ${location}
        - Amenities: ${amenities?.join(", ") || "No especificados"}

        Proporciona estrategias específicas y realistas para aumentar los ingresos.
      `;

      const response = await getClaude(
        prompt,
        "Eres un consultor experto en maximización de ingresos por alquiler temporal.",
      );
      res.json(response);
    } catch (error) {
      console.error("Error in income optimization:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
