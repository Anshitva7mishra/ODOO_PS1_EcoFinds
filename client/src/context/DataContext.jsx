import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchAllProducts = async () => {
    // 🛑 Prevent re-fetch if already loaded
    if (data.length > 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get("https://fakestoreapi.com/products?limit=7", {
        withCredentials: false, // ✅ no CORS issue
      });
      setData(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ data, isLoading, error, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
