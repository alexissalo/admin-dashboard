import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getOrders } from "../functions/functionsOrder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../components/Loader";
import { Modal, Box, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/Ventas.css";

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

function Ventas() {
  const [orders, setOrders] = useState([]);
  const [idCompra, setIdCompra] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nroPedido", headerName: "Nro de Pedido", width: 70 },
    { field: "date", headerName: "Fecha", width: 130 },
    { field: "idUser", headerName: "IdUser", width: 130 },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 90,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Detalles"
            color="inherit"
            onClick={() => {
              setIdCompra(id);
              handleOpen();
            }}
          />,
        ];
      },
    },
  ];
  useEffect(() => {
    getOrders()
      .then((response) => {
        console.log(response);
        setOrders(
          response.map((doc) => ({
            id: doc._id,
            ...doc,
          }))
        );
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(orders);
  return (
    <div className="ventas">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Ventas</h1>
          <div style={{ height: 400, width: "80%" }}>
            <DataGrid
              rows={orders}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((item) => {
                      {
                        item.items.map((e) => {
                          return(
                            <TableRow
                            key={e._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {e._id}
                            </TableCell>
                            <TableCell align="right">{e.title}</TableCell>
                            <TableCell align="right">{e.price}</TableCell>
                            <TableCell align="right">{e.quantity}</TableCell>
                          </TableRow>
                          )
                          
                          });
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Ventas;
