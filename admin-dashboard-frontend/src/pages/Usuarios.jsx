import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { uploadFile } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Nombre", width: 130 },
];

const rows = [
  { id: 1, nombre: "Snow" },
  { id: 2, nombre: "Lannister" },
];

function Usuarios() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (

      <div>
        <h1>Usuarios</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
  );
}

export default Usuarios;
