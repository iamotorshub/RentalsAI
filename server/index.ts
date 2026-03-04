import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

registerRoutes(app);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client");
  app.use(express.static(clientPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`\n🏥 Centro Médico VitalBahía — Servidor Tiani`);
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
  console.log(`📡 RAG Powered by MotorsHub — Activo\n`);
});
