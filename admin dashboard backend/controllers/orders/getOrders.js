const Order = require("../../models/Order");

const getOrders=async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error('Error al obtener las ordenes:', error);
      res.status(500).json({ error: 'Error al obtener las ordenes' });
    }
  }

module.exports=getOrders;