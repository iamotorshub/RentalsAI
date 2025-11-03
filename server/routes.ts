import type { Express } from "express";
import { createServer, type Server } from "http";
import { getClaude } from "./claude";
import Anthropic from "@anthropic-ai/sdk";

// Configuración de Resend
// IMPORTANTE: Asegúrate de tener la variable de entorno RESEND_API_KEY configurada
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_TO = "contacto@iamotorshub.com";

// URL base para imágenes en emails - Render genera automáticamente RENDER_EXTERNAL_URL
const BASE_URL = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL || 'https://rentalsai.iamotorshub.com';

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

      // Generar link de Google Calendar si es videollamada (antes de los templates)
      let googleCalendarLink = '';
      if (fecha && hora) {
        const [day, month, year] = fecha.split('/');
        const [hours, minutes] = hora.split(':');
        const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
        const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000); // +1 hora

        const formatDateForGoogle = (date: Date) => {
          return date.toISOString().replace(/-|:|\.\d{3}/g, '');
        };

        const startTime = formatDateForGoogle(eventDate);
        const endTime = formatDateForGoogle(endDate);
        const eventTitle = encodeURIComponent('Videollamada con Rentals AI');
        const eventDetails = encodeURIComponent(`Reunión con ${nombre}\\nWhatsApp: ${whatsapp}\\nEmail: ${email}`);

        googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&details=${eventDetails}&location=Online`;
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
        ${googleCalendarLink ? `<p style="margin-top: 20px;"><a href="${googleCalendarLink}" style="display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">📅 Agregar a Google Calendar</a></p>` : ''}
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

      // Mensaje de confirmación personalizado según el tipo
      const confirmationMessage = fecha && hora
        ? '¡Tu demo fue confirmada! Nos vemos pronto.'
        : '¡Tu mensaje fue confirmado! Nos contactaremos a la brevedad.';

      // Cuerpo del mail de confirmación al cliente (diseño profesional con logo)
      const clientEmailBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 10px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header Banner con Logo Rentals AI -->
                  <tr>
                    <td style="background-color: #ffffff; padding: 15px 20px 8px 20px; text-align: center; border-radius: 8px 8px 0 0;">
                      <img src="https://i.ibb.co/9mCB4S3R/rentalsai-finalsinfondo.png" alt="Rentals AI" width="280" height="280" style="max-width: 280px; height: auto; margin: 0; display: block; margin-left: auto; margin-right: auto; border: 0;">
                    </td>
                  </tr>

                  <!-- Mensaje de confirmación estilizado -->
                  <tr>
                    <td style="padding: 8px 30px 12px 30px; text-align: center;">
                      <h1 style="color: #6366f1; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">${confirmationMessage}</h1>
                    </td>
                  </tr>

                  <!-- Contenido -->
                  <tr>
                    <td style="padding: 5px 30px 10px 30px;">
                      <p style="font-size: 15px; color: #1f2937; line-height: 1.5; margin-bottom: 10px;">
                        Hola <strong>${nombre}</strong>,
                      </p>
                      <p style="font-size: 15px; color: #1f2937; line-height: 1.5; margin-bottom: 12px;">
                        Recibimos tu solicitud de <strong style="color: #6366f1;">${tipo}</strong>. ${fecha && hora ? 'Tu reunión está confirmada para el ' + fecha + ' a las ' + hora + '.' : 'Nos pondremos en contacto contigo a la brevedad.'}
                      </p>

                      <!-- Detalles en Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 10px;">
                        <tr>
                          <td style="padding: 12px;">
                            <h3 style="color: #6366f1; margin: 0 0 8px 0; font-size: 16px;">📋 Detalles:</h3>
                            ${fecha && hora ? `<p style="margin: 4px 0; color: #4b5563; font-size: 14px;"><strong>📅 Fecha y hora:</strong> ${fecha} a las ${hora}</p>` : ''}
                            <p style="margin: 4px 0; color: #4b5563; font-size: 14px;"><strong>📧 Email:</strong> ${email}</p>
                            <p style="margin: 4px 0; color: #4b5563; font-size: 14px;"><strong>📱 WhatsApp:</strong> ${whatsapp}</p>
                            ${webInstagram ? `<p style="margin: 4px 0; color: #4b5563; font-size: 14px;"><strong>🌐 Web/Instagram:</strong> ${webInstagram}</p>` : ''}
                            ${descripcion ? `<p style="margin: 4px 0; color: #4b5563; font-size: 14px;"><strong>💬 Mensaje:</strong><br>${descripcion}</p>` : ''}
                          </td>
                        </tr>
                      </table>

                      ${googleCalendarLink ? `
                      <!-- Botón Google Calendar -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
                        <tr>
                          <td align="center">
                            <a href="${googleCalendarLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                              📅 Agregar a Google Calendar
                            </a>
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <p style="font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0;">
                        Si tenés alguna pregunta, respondé este email.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer con Logo IA MOTORSHUB - Compacto con gradiente -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 5px 20px 3px 20px; text-align: center; border-radius: 0 0 8px 8px;">
                      <p style="color: #ffffff; margin: 0 0 2px 0; font-size: 14px; font-weight: bold;">Equipo Rentals AI</p>
                      <p style="color: #d1d5db; margin: 0; font-size: 11px; line-height: 1.8;">Powered by</p>
                      <img src="https://i.ibb.co/S79mNmfV/IAMOTORSHUB-LOGO-BLANCO.png" alt="IA MOTORSHUB" width="320" height="107" style="max-width: 320px; height: auto; margin: 0; display: block; margin-left: auto; margin-right: auto; border: 0;">
                      <p style="color: #9ca3af; margin: 0; font-size: 10px; line-height: 1.8;">
                        📍 Bahía Blanca, Buenos Aires<br>
                        📧 contacto@iamotorshub.com<br>
                        📱 +54 9 291 520-6692
                      </p>
                      <p style="color: #6b7280; margin: 2px 0 0 0; font-size: 9px;">
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
