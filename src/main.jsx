import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CountryNameProvider from "./context/CountryNameProvider";
import GetProductProvider from "./context/GetProductProvider"; // ✅ Import this
import "./index.css";
import CartContextProvider from "./context/CartContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <CountryNameProvider>
          <GetProductProvider>
            <App />
          </GetProductProvider>
        </CountryNameProvider>
      </CartContextProvider>
    </BrowserRouter>
  </StrictMode>
);
