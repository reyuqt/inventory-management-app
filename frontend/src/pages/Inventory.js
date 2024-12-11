import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../services/api";

function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/items/")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  // Define the columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "price", headerName: "Price", width: 150},
    { field: "isActive", headerName: "Active", width: 100 },
  ];

  return (
    <div style={{ width: "100%" }}>
      <h1>Inventory</h1>
      <DataGrid
        rows={items}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
}

export default Inventory;
