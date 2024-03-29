import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

export const login = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM admins WHERE nombre =?  AND contraseña = ? `,
      [nombre, contraseña]
    );

    res.json({
      mensaje: "Usuario logeado correctamente",
    });

    if (result.rows.length === 0) {
      console.error("Credenciales invalidas");
    }

    res.json({ result: result.rows[0] });
  } catch (error) {
    console.error(error);
  }
};

export const register = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const result = pool.query(
      "INSERT INTO admins (nombre, contraseña) VALUES (?,?)",
      [nombre, contraseña]
    );

    res.json({ result: result.rows[0] });
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
  }
};
