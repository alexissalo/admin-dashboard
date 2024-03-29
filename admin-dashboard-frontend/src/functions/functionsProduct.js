import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:4000/productos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
  }
};

export const getOneProduct = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:4000/productos/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
  }
};

export const postProducts = async (Producto) => {
  await axios
    .post("http://localhost:4000/productos", Producto)
    .then((res) => {
      const { data } = res;
      return data.mensaje;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const editProduct = async (productId, updatedData) => {
  try {
    await axios.put(
      `http://localhost:4000/productos/${productId}`,
      updatedData
    );
  } catch (error) {
    console.error("Error al editar el producto:", error);
  }
};

export const deleteProduct = async (productId) => {
  console.log(productId);
  try {
    await axios.delete(`http://localhost:4000/productos/${productId}`);
  } catch (error) {
    console.error("Error al borrar el producto:", error);
  }
};
