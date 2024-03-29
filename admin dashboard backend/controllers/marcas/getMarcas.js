const Marca = require("../../models/Marca");

const getMarcas=async (req, res) => {
    try {
      const marcas = await Marca.find();
      res.json(marcas);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
      res.status(500).json({ error: 'Error al obtener las marcas' });
    }
  }

module.exports=getMarcas;