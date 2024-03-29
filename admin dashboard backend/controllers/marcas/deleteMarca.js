const Marca = require("../../models/Marca");

const deleteMarca=async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMarca = await Marca.findByIdAndDelete(id);
  
      if (!deletedMarca) {
        return res.status(404).json({ error: 'Marca no encontrada' });
      }
  
      res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
      console.error('Error al borrar la Marca:', error);
      res.status(500).json({ error: 'Error al borrar la Marca' });
    }
  }

module.exports=deleteMarca;