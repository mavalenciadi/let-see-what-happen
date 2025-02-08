const { Sequelize } = require("sequelize");
require("dotenv").config(); // Cargar variables de entorno desde .env

// Crear la conexión a la base de datos usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST,  // Servidor de la base de datos
    dialect: process.env.DB_DIALECT, // Puede ser "postgres" o "mysql"
    logging: false, // Desactiva los logs de SQL en consola (opcional)
  }
);

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa!");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
};

testConnection(); // Ejecuta la prueba de conexión al iniciar

module.exports = sequelize; // Exportamos la conexión para usarla en los modelos
