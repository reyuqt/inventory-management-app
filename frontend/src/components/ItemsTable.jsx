import React from "react";
import {DataGrid} from "@mui/x-data-grid";

// Component for displaying items in a DataGrid
function ItemsTable({items}) {
  const columns = [
    {field: "id", headerName: "ID", width: 100},
    {field: "name", headerName: "Name", width: 200},
    {field: "quantity", headerName: "Quantity", width: 150},
  ];

  return (
    <DataGrid
      rows={items}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5, 10, 20]}
      checkboxSelection
    />
  );
}

export default ItemsTable;
