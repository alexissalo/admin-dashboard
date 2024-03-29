import { DataGrid } from "@mui/x-data-grid";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import "../styles/Marcas.css";
import {
  postMarcas,
  getMarcas,
  editMarcas,
  deleteMarca,
} from "../functions/functionsMarcas";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ModalMarca from "../components/ModalMarca";
import { Button } from "@mui/material";

function Marcas() {
  const [name, setName] = useState();
  const [descripcion, setDescripcion]=useState()
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [actualizacion, setActualizacion] = useState();
  const token = localStorage.getItem("token");
  const [selected, setSelected] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "descripcion", headerName: "Descripcion", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              handleOpen();
              setIsEditMode(true);
              setSelected(id);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => deleteMarca(id)}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    getMarcas()
      .then((response) => {
        setMarcas(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setActualizacion(!actualizacion);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const marca = {
        nombre: name,
        descripcion:descripcion
      };
      postMarcas(marca);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    try {
      const marca = {
        nombre: name,
        descripcion:descripcion
      };
      editMarcas(selected, marca);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="marcas">
          <h1>Marcas</h1>
          <Button
            variant="contained"
            sx={{ marginBottom: "10px" }}
            onClick={() => {
              handleOpen();
              setIsEditMode(false);
            }}
          >
            Agregar marca
          </Button>
          <div style={{ height: 400, width: "55%" }}>
            <DataGrid
              rows={marcas}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
          <ModalMarca
            setName={setName}
            open={open}
            close={handleClose}
            submit={handleSubmit}
            isEditMode={isEditMode}
            submitEdit={handleSubmitEdit}
          />
        </div>
      )}
    </>
  );
}

export default Marcas;
