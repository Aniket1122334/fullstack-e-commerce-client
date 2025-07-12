import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Sidebar from "./Sidebar";
import "../css/Listening.css";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { HiViewGrid } from "react-icons/hi";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import SpecificProduct from "./SpecificProduct";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetProducts from "../../context/GetProducts";

const Listening = () => {
  const [productView, setProductView] = useState("three");
  const [price, setPrice] = useState(100000);
  const { category, subcategory } = useParams();
  const { products } = useContext(GetProducts);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleResize = () => {
      setProductView(window.innerWidth < 768 ? "two" : "three");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredProducts = products.filter((product) => {
    if (!product.category) return false;

    const matchCategory = product.category === category;
    const matchSubCategory = subcategory
      ? product.subCategory === subcategory
      : true;
    const withinPrice = product.price <= price;

    return matchCategory && matchSubCategory && withinPrice;
  });

  return (
    <>
      <div className="lsit d-flex container justify-content-between align-items-center">
        <div
          className="product-list d-flex align-items-start"
          style={{ width: "100%" }}
        >
          <div className="listInner left">
            <Sidebar price={price} setPrice={setPrice} />
          </div>

          <div
            className="rightPortion d-flex"
            style={{ width: "100%", flexDirection: "column" }}
          >
            <div
              className="listInner right p-3 d-flex align-items-center"
              style={{
                width: "100%",
                borderBottom: "2px solid var(--glass-border)",
              }}
            >
              <div className="grid-option d-flex align-items-center justify-content-start">
                <button
                  className="btn d-flex align-items-center justify-content-center"
                  onClick={() => setProductView("one")}
                >
                  <IoIosMenu />
                </button>
                <button
                  className="btn d-flex align-items-center justify-content-center"
                  onClick={() => setProductView("two")}
                >
                  <HiViewGrid />
                </button>
                <button
                  className={`btn three-view align-items-center justify-content-center ${
                    window.innerWidth > 767 ? "d-flex" : ""
                  }`}
                  style={{
                    display: window.innerWidth <= 767 ? "none" : "flex",
                  }}
                  onClick={() => setProductView("three")}
                >
                  <RiLayoutGrid2Fill />
                </button>
              </div>

              <div className="showBy">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <span>Show 10</span>
                    <span style={{ marginLeft: "3px" }}>
                      <IoIosArrowDown />
                    </span>
                  </div>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{ list: { "aria-labelledby": "basic-button" } }}
                >
                  {[10, 20, 30, 40].map((count) => (
                    <MenuItem key={count} onClick={handleClose}>
                      {count}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            <div className="specificProductList row">
              {filteredProducts.length === 0 && (
                <p className="text-center mt-4">
                  No products found in this category.
                </p>
              )}

              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className={`col-${
                    productView === "three"
                      ? "4"
                      : productView === "two"
                      ? "6"
                      : "12"
                  }`}
                >
                  <SpecificProduct itemView={productView} products={product} />
                </div>
              ))}
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    «
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    »
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listening;
