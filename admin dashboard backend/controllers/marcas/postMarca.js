const Marca=require("../../models/Marca")

const postMarca=async (req, res) => {
    try {
      const { nombre } = req.body;
      const marca = new Marca({ nombre});
      await marca.save();
      res.status(201).json(marca);
    } catch (error) {
      console.error('Error al crear una marca:', error);
      res.status(500).json({ error: 'Error al crear una marca' });
    }
  }

module.exports=postMarca;