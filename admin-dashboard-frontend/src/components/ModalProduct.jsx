import { Modal, Box, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "../styles/Products.css";
import { getOneProduct } from "../functions/functionsProduct";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Modals(props) {
  const {
    open,
    close,
    name,
    price,
    description,
    file,
    setFile,
    stock,
    category,
    categorias,
    marca,
    marcas,
    submit,
    isEditMode,
    submitEdit,
  } = props;
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isEditMode ? (
          <h2 style={{ textAlign: "center" }}>Editar Producto</h2>
        ) : (
          <h2 style={{ textAlign: "center" }}>Agregar Productos</h2>
        )}
        <div>
          {file &&(
            <img
              src={URL.createObjectURL(file)}
              alt=""
              style={{ width: "100px", height: "100px", objectFit: "cover",  }}
            />
          )}
        </div>
        <form
          className="form-product"
          onSubmit={isEditMode ? submitEdit : submit}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Imagen</label>
            <input
              type="file"
              name=""
              required
              id=""
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Nombre</label>
            <TextField
              id="standard-basic"
              variant="standard"
              required
              onChange={(e) => name(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Descripcion</label>
            <TextField
              id="standard-basic"
              required
              variant="standard"
              onChange={(e) => description(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Precio</label>
            <TextField
              id="standard-number"
              variant="standard"
              required
              type="number"
              onChange={(e) => price(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Stock</label>
            <TextField
              id="standard-number"
              required
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={(e) => stock(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Marca</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={"Elige una marca"}
              onChange={(e) => marca(e.target.value)}
              required
            >
              <MenuItem value="Elige una marca">Elige una Marca</MenuItem>
              {marcas.map((item) => (
                <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
              ))}
            </Select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="">Categoria</label>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={"Elige una categoria"}
              onChange={(e) => category(e.target.value)}
              required
            >
              <MenuItem value="Elige una categoria">
                Elige una categoria
              </MenuItem>
              {categorias.map((item) => (
                <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
              ))}
            </Select>
          </div>
          <Button variant="contained" color="error" onClick={close}>Cancelar</Button>
          <Button variant="contained" type="submit">Aceptar</Button>

        </form>
      </Box>
    </Modal>
  );
}

export default Modals;
