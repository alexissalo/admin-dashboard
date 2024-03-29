import { Modal, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalMarca(props) {
  const { open, close, setName, submit, isEditMode, submitEdit } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={isEditMode ? submitEdit : submit}
          >
            {isEditMode ? <h2>Editar Marca</h2> : <h2>Agregar Marca</h2>}
            <label htmlFor="">Nombre</label>
            <TextField
              id="standard-basic"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "10px" }}
            />
            <label htmlFor="">Descripcion</label>
            <TextField
              id="standard-basic"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "10px" }}
            />
            <Button variant="contained" color="error" onClick={close} sx={{ marginBottom: "10px" }}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalMarca;
