import axios from "axios";

export const getMarcas = async () => {
  try {
    const response = await axios.get("http://localhost:4000/marcas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las Marcas:", error);
  }
};

export const postMarcas = async (Marca) => {
  await axios
    .post("http://localhost:4000/marcas", Marca)
    .then((res) => {
      const { data } = res;
      return data.mensaje;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const editMarcas = async (marcaId, updatedData) => {
  try {
    await axios.put(`http://localhost:4000/marcas/${marcaId}`, updatedData);
  } catch (error) {
    console.error("Error al editar la marca:", error);
  }
};

export const deleteMarca = async (marcaId) => {
  try {
    await axios.delete(`http://localhost:4000/marcas/${marcaId}`);
  } catch (error) {
    console.error("Error al borrar la marca:", error);
  }
};
