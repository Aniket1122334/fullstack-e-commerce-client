// 📁 context/getProducts.jsx
import { useEffect, useState } from "react";
import GetProducts from "./GetProducts";
import { fetchData } from "../utils/api";

// 2️⃣ Provider Component
const GetProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // 🛑 Fix: "produts" → "products"

  useEffect(() => {
    const getProductsFromAPI = async () => {
      try {
        const response = await fetchData("/api/product");
        if (response?.data) {
          setProducts(response.data);
        } else {
          console.warn("No data returned from fetchData");
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    getProductsFromAPI();
  }, []);

  return (
    <GetProducts.Provider value={{ products }}>{children}</GetProducts.Provider>
  );
};

export default GetProductProvider;
