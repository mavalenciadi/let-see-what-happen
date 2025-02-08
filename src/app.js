const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database");

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Puerto configurable desde .env o por defecto 5000
const PORT = process.env.PORT || 5000;

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => console.log("📦 Base de datos sincronizada"))
  .catch((error) => console.error("❌ Error al sincronizar BD:", error));

// Ruta base para verificar que el servidor funcione
app.get("/", (req, res) => res.send("API Running..."));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
