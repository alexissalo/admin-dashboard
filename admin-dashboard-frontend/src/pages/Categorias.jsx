import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, Button } from "@mui/material";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import "../styles/Categorias.css";
import {
  postCategories,
  getCategories,
  editCategories,
  deleteCategories,
} from "../functions/functionsCategories";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ModalCategories from "../components/ModalCategories";

function Categorias() {
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [actualizacion, setActualizacion] = useState();
  const token = localStorage.getItem("token");
  const [selected, setSelected] = useState();
  const [isEditMode, setIsEditMode]=useState(false)
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 200 },
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
            onClick={()=>{
              handleOpen()
              setIsEditMode(true)
              setSelected(id)
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => deleteCategories(id)}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(
          response.map((doc) => ({
            id: doc._id,
            ...doc,
          }))
        );
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
      const categoria = {
        nombre: name,
      };
      postCategories(categoria);
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    try {
      const categoria = {
        nombre: name,
      };
      editCategories(selected, categoria);
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };


  return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="categorias">
            <h1>Categorias</h1>
            <Button variant="contained" sx={{marginBottom:"10px"}} onClick={()=>{
              handleOpen()
              setIsEditMode(false)
              }}>Agregar categoria</Button>
            <div style={{ height: 400, width: "55%" }}>
              <DataGrid
                rows={categories}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
            <ModalCategories
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

export default Categorias;
