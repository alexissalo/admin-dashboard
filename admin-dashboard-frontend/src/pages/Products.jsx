import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";
import { uploadFile } from "../firebase";
import {
  postProducts,
  getProducts,
  editProduct,
  deleteProduct,
} from "../functions/functionsProduct";
import { getCategories } from "../functions/functionsCategories";
import { getMarcas } from "../functions/functionsMarcas";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Modals from "../components/ModalProduct";
import Button from "@mui/material/Button";


function Products() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState();
  const [categories, setCategories] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [marca, setMarca] = useState();
  const [talle, setTalle] = useState();
  const [actualizacion, setActualizacion] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setActualizacion(!actualizacion);
      });
  }, [actualizacion]);

  useEffect(() => {
    getMarcas()
      .then((response) => {
        setMarcas(
          response
        );
      })
      .catch((err) => console.log(err));
  }, [marcas]);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(
          response.map((doc) => ({
            nombre: doc.nombre,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlFile = await uploadFile(file);
      const product = {
        nombre: name,
        descripcion: description,
        precio: price,
        img: urlFile ? urlFile : "aaaa",
        stock: stock,
        marca: marca !== "Elige una marca" ? marca : null,
        categoria: category !== "Elige una categoria" ? category : null,
      };
      postProducts(product);
      handleClose()
      setFile(null)
      console.log(urlFile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const urlFile = await uploadFile(file);
      const producto = {
        nombre: name,
        descripcion: description,
        precio: price,
        img: urlFile ? urlFile : "aaaa",
        stock: stock,
        marca: marca !== "Elige una marca" ? marca : null,
        categoria: category === "Elige una categoria" ? category : null,
      };
      editProduct(selected, producto);
      handleClose()
      setFile(null)
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "descripcion", headerName: "Descripcion", width: 130 },
    {
      field: "precio",
      headerName: "Precio",
      type: "number",
      width: 130,
    },
    { field: "stock", headerName: "Stock", width: 130, type: "number" },
    { field: "img", headerName: "Imagen", width: 130 },
    { field: "marca", headerName: "Marca", width: 130 },
    { field: "categoria", headerName: "Categoria", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id,nombre, descripcion, precio, stock, img, categoria, marca }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              setSelected({id,nombre, descripcion, precio, stock, img, categoria, marca});
              handleOpen();
              setIsEditMode(true);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => deleteProduct(id)}
          />,
        ];
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="productos">
          <h1>Productos</h1>
          <Button
            variant="contained"
            sx={{margin:"10px"}}
            onClick={() => {
              handleOpen();
              setIsEditMode(false);
            }}
          >
            Agregar productos
          </Button>
          <div style={{ height: 400, width: "95%" }}>
            <DataGrid
              rows={products}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
            />
          </div>
          <Modals
            open={open}
            close={handleClose}
            name={setName}
            price={setPrice}
            description={setDescription}
            file={file}
            setFile={setFile}
            category={setCategory}
            stock={setStock}
            categorias={categories}
            marca={setMarca}
            marcas={marcas}
            submit={handleSubmit}
            isEditMode={isEditMode}
            submitEdit={handleSubmitEdit}
          />
        </div>
      )}
    </>
  );
}

export default Products;
