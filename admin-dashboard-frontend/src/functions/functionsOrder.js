import axios from "axios";

export const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/order");
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };