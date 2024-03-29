import pool from "../db.js";

export const getMarcas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM marcas ORDER BY id ASC"
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
};

export const editMarcas = async (req, res) => {
  try {
    const result = await pool.query("UPDATE marcas SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    if (!result) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error al editar la marca:", error);
    res.status(500).json({ error: "Error al editar la marca" });
  }
};

export const deleteMarcas = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM marcas WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Marca no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error al borrar la marca:", error);
    res.status(500).json({ error: "Error al borrar la marca" });
  }
};

export const postMarca = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO marcas(nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion]
    );
  } catch (error) {
    console.error("Error al crear la categoria:", error);
    res.status(500).json({ error: "Error al la categoria" });
  }
};
