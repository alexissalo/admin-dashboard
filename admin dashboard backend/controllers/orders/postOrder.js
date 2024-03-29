const Order = require("../../models/Order");

const postOrder=async (req, res) => {
    try {
      const { date, idUser, nroPedido, total, buyer, items } = req.body;
      const order = new Order({ date, idUser, nroPedido, total, buyer, items});
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      console.error('Error al crear una tarea:', error);
      res.status(500).json({ error: 'Error al crear una tarea' });
    }
  }

module.exports=postOrder;