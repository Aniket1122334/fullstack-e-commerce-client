import React, { useState, useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoCloseSharp } from "react-icons/io5";
import { FaStar, FaStarHalfAlt, FaCartPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import GetProducts from "../../context/GetProducts";
import { postData } from "../../utils/api";
import "../css/ProductModel.css";

// Snackbar alert wrapper
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductModel = ({ productId, closeProductModel }) => {
  const { products } = useContext(GetProducts);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [totalProduct, setTotalProduct] = useState(1);

  // ✅ Two separate snackbars
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [loginSnackbarOpen, setLoginSnackbarOpen] = useState(false);

  const product = products.find((p) => p._id === productId);

  useEffect(() => {
    setActiveIndex(0);
  }, [productId]);

  if (!product) {
    return (
      <Dialog open={open} onClose={closeProductModel} fullWidth maxWidth="md">
        <div className="p-3 text-center">
          <button
            className="close_"
            onClick={() => {
              setOpen(false);
              closeProductModel();
            }}
          >
            <IoCloseSharp />
          </button>
          <h4>Product not found</h4>
        </div>
      </Dialog>
    );
  }

  const images = product.images || [];
  const stock = product.stock || 4;
  const rating = product.rating || 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const setDecrease = () => {
    setTotalProduct((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const setIncrease = () => {
    setTotalProduct((prev) => (prev < stock ? prev + 1 : stock));
  };

  // ✅ Updated handleAddToCart with login check
  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user || !user.userId) {
      setLoginSnackbarOpen(true); // Show login warning
      return;
    }

    const cartItem = {
      userId: user.userId,
      productId: product._id,
      productName: product.name,
      image: images[0],
      quantity: totalProduct,
      price: product.price,
      subTotal: product.price * totalProduct,
      stock: stock,
    };

    try {
      const response = await postData("/api/cart/add", cartItem);
      if (response.success) {
        setSuccessSnackbarOpen(true); // Show success snackbar
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        closeProductModel();
      }}
      fullWidth
      maxWidth="md"
    >
      <div className="p-3">
        <button
          className="close_"
          onClick={() => {
            setOpen(false);
            closeProductModel();
          }}
        >
          <IoCloseSharp />
        </button>

        <h4 className="text-center mt-4">{product.name || "Product Name"}</h4>

        <div className="header_details d-flex align-items-center justify-content-around my-3">
          <div className="brand">
            Brands: <strong>{product.brand || "Brand_Name"}</strong>
          </div>

          <div className="review d-flex align-items-center">
            Stars:{" "}
            {[...Array(fullStars)].map((_, i) => (
              <FaStar key={i} className="text-warning" />
            ))}
            {hasHalfStar && <FaStarHalfAlt className="text-warning" />}
            {[...Array(emptyStars)].map((_, i) => (
              <FaStar key={i} className="text-secondary" />
            ))}
          </div>
        </div>

        <hr />

        <div className="row">
          {/* Left Side - Images */}
          <div className="col-md-6 px-4">
            <div className="main-image-container mb-3">
              <img
                src={images[activeIndex] || "/fallback-image.jpg"}
                alt={`${product.brand} ${product.name}`}
                className="img-fluid w-100"
              />
            </div>

            <div className="d-flex justify-content-start gap-2 flex-nowrap overflow-auto">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`border ${
                    index === activeIndex
                      ? "border-success"
                      : "border-secondary"
                  } rounded`}
                  style={{ cursor: "pointer", padding: "2px" }}
                  onClick={() => setActiveIndex(index)}
                >
                  <img
                    src={img}
                    alt={`Thumb ${index + 1}`}
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Info */}
          <div className="col-md-6 px-4 d-flex flex-column justify-content-center">
            <div>
              <span className="fs-5 text-secondary">
                Price:{" "}
                <span className="text-decoration-line-through">
                  ₹{product.previousPrice || 5000}
                </span>
              </span>
            </div>

            <div className="mb-3">
              <span className="fs-4 text-primary">
                Deal Of The Day: ₹{product.price}
              </span>
              <hr />
            </div>

            <h5 className="text-uppercase text-info">Product Description</h5>
            <span className="fs-6 text-secondary">
              {product.description || "This is a product description."}
              <hr />
            </span>

            <div className="stock mb-2 text-primary">
              <span style={{ fontWeight: 600, fontSize: "15px" }}>
                In Stock : {stock}
              </span>
            </div>

            <div className="addMore mb-2">
              <div className="d-flex justify-content-around align-items-center">
                <div className="decrease" onClick={setDecrease}>
                  <TiMinus />
                </div>
                <div className="addTab">
                  <span className="fs-5">{totalProduct}</span>
                </div>
                <div className="increase" onClick={setIncrease}>
                  <FaPlus />
                </div>
              </div>
            </div>

            <button
              className="btn btn-success mt-3"
              style={{
                width: "250px",
                padding: "10px 20px",
                fontWeight: "600",
                borderRadius: "8px",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart <FaCartPlus />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item added to cart!
        </Alert>
      </Snackbar>

      {/* ✅ Login Warning Snackbar */}
      <Snackbar
        open={loginSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setLoginSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setLoginSnackbarOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please login first to add items to cart!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ProductModel;
