import pool from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM productos"
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM productos WHERE id=?",[req.params.id,]
    );
    res.json(result[0]);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getProductsByPrice = async (req, res) => {
    try {
      const [result] = await pool.query(
        "SELECT * FROM productos WHERE (precio BETWEEN ? AND ?)"
      );
      res.json(result);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
      res.status(500).json({ error: "Error al obtener las categorias" });
    }
  };

export const editProduct = async (req, res) => {
  try {
    const result = await pool.query("UPDATE productos SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    if (!result) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error al editar el producto:", error);
    res.status(500).json({ error: "Error al editar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "producto no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error al borrar el producto:", error);
    res.status(500).json({ error: "Error al borrar el producto" });
  }
};

export const postProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, img, categoria, marca } = req.body;
    const [result] = await pool.query(
      "INSERT INTO productos(nombre, descripcion, precio, stock, img, categoria, marca) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, descripcion, precio, stock, img, categoria, marca]
    );
  } catch (error) {
    console.error("Error al crear una tarea:", error);
    res.status(500).json({ error: "Error al crear una tarea" });
  }
};
