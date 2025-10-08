import express from "express";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;
const router = express.Router();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// GET - listar vehículos
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM vehiculos ORDER BY id DESC");
  res.json(result.rows);
});

// POST - registrar ingreso
router.post("/", async (req, res) => {
  const { placa } = req.body;
  const result = await pool.query(
    "INSERT INTO vehiculos (placa) VALUES ($1) RETURNING *",
    [placa]
  );
  res.json(result.rows[0]);
});

// PUT - registrar salida
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE vehiculos SET hora_salida = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );
  res.json(result.rows[0]);
});

// DELETE - eliminar registro
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM vehiculos WHERE id = $1", [id]);
  res.json({ message: "Registro eliminado" });
});

export default router;
