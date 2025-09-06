import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products?limit=7");
      setData(res.data); // data is directly the array
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider value={{ data, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
