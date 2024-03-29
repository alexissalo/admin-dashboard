import pool from "../db.js";

export const getCategories = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM categorias ORDER BY id ASC"
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};

export const editCategories = async (req, res) => {
  try {
    const result = await pool.query("UPDATE categorias SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    if (!result) {
      return res.status(404).json({ error: "Categoria no encontrada" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error al editar la categoria:", error);
    res.status(500).json({ error: "Error al editar la categoria" });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM categorias WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Categoria no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error al borrar la categoria:", error);
    res.status(500).json({ error: "Error al borrar la categoria" });
  }
};

export const postCategories = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query(
      "INSERT INTO categorias(nombre) VALUES (?)",
      [nombre]
    );
    res.json({
      id: result.insertId,
      nombre
    });
  } catch (error) {
    console.error("Error al crear la categoria:", error);
    res.status(500).json({ error: "Error al la categoria" });
  }
};
