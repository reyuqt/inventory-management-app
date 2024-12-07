import React, { useState, useEffect } from "react";
import api from "../services/api";

function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/items/")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
