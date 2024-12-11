import React, { createContext, useState, useEffect } from 'react';
import api from "../services/api";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/items/")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  return (
    <ItemsContext.Provider value={items}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;