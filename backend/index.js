import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import vehiculosRoutes from "./routes/vehiculos.js";

dotenv.config(); // Carga las variables del archivo .env
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Probar conexión a la base de datos
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión a la base de datos:", err));

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("🚗 API Parqueadero funcionando correctamente");
});

// Rutas de vehículos (CRUD)
app.use("/api/vehiculos", vehiculosRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
