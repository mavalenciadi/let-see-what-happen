const express = require("express");
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();

// Middleware para permitir JSON en requests
app.use(express.json());

// Middleware para habilitar CORS (evita problemas de acceso entre frontend y backend)
app.use(require("cors")());

// Ruta base para verificar que el servidor funcione
app.get("/", (req, res) => res.send("API Running..."));

// Puerto configurable desde .env o por defecto 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
