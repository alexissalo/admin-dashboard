const Marca = require("../../models/Marca");

const editMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre} =req.body;

    const updatedMarca = await Marca.findByIdAndUpdate(
      id,
      {
        nombre
      },
      { new: true }
    );

    if (!updatedMarca) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    res.json(updatedMarca);
  } catch (error) {
    console.error("Error al editar la marca:", error);
    res.status(500).json({ error: "Error al editar la marca" });
  }
};

module.exports = editMarca;