import type { Express } from "express";
import { createServer, type Server } from "http";
import { getClaude } from "./claude";
import Anthropic from "@anthropic-ai/sdk";

// Configuración de Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_TO = "contacto@iamotorshub.com";

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
        throw new Error("Error al enviar el email al equipo");
      }

      // Cuerpo del mail de confirmación al cliente
      const clientEmailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">¡Gracias por contactarnos, ${nombre}!</h2>
          <p>Hemos recibido tu solicitud de <strong>${tipo.toLowerCase()}</strong>.</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <h3 style="color: #1f2937;">Detalles de tu solicitud:</h3>
          ${
            fecha && hora
              ? `<p><strong>📅 Fecha y hora:</strong> ${fecha} a las ${hora}</p>`
              : ""
          }
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>📱 WhatsApp:</strong> ${whatsapp}</p>
          ${
            webInstagram
              ? `<p><strong>🌐 Web/Instagram:</strong> ${webInstagram}</p>`
              : ""
          }
          ${
            descripcion
              ? `<p><strong>💬 Mensaje:</strong> ${descripcion}</p>`
              : ""
          }
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p>Nuestro equipo se pondrá en contacto contigo pronto para confirmar los detalles.</p>
          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            Saludos,<br>
            <strong>Equipo Rentals AI</strong>
          </p>
        </div>
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

      if (!responseClient.ok) {
        console.warn("Error al enviar email de confirmación al cliente");
      }

      const dataTeam = await responseTeam.json();
      const dataClient = await responseClient.json();

      res.json({
        success: true,
        teamEmailId: dataTeam.id,
        clientEmailId: dataClient.id,
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
