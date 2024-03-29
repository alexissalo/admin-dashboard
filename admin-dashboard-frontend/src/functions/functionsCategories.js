import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:4000/categorias");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
  }
};

export const postCategories = async (Categoria) => {
  await axios
    .post("http://localhost:4000/categorias", Categoria)
    .then((res) => {
      const { data } = res;
      return data.mensaje;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const editCategories = async (categorieId, updatedData) => {
  try {
    await axios.put(`http://localhost:4000/categorias/${categorieId}`, updatedData);
  } catch (error) {
    console.error("Error al editar la categoria:", error);
  }
};

export const deleteCategories = async (categorieId) => {
  console.log(categorieId)
  try {
    await axios.delete(`http://localhost:4000/categorias/${categorieId}`);
  } catch (error) {
    console.error("Error al borrar la categoria:", error);
  }
};
