import React, { useState, useContext } from "react";
import { FaStar, FaRegStar, FaCartPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import styles from "../css/ProductDetail.module.css";
import GetProducts from "../../context/GetProducts";
import CartContext from "../../context/CartContext";
import CartAlert from "./CartAlert"; // 🔔 Popup component

const ProductDetail = () => {
  const { products } = useContext(GetProducts);
  const { addToCart, alertBox } = useContext(CartContext);
  const { id } = useParams();

  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => String(p._id) === id);

  if (!product) {
    console.log("Product not found for ID:", id);
    return <div>Product not found</div>;
  }

  const images = product.images || [];
  const stock = product.stock || 0;

  const setDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const setIncrease = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : stock));
  };

  const handleViewProductClick = () => {
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const currentIndex = products.findIndex((p) => String(p._id) === id);

  let relatedProducts = [];
  const totalProducts = products.length;

  if (currentIndex === totalProducts - 1) {
    relatedProducts = [
      { ...products[0], id: products[0]._id },
      { ...products[1], id: products[1]._id },
    ];
  } else if (currentIndex === totalProducts - 2) {
    relatedProducts = [
      { ...products[currentIndex + 1], id: products[currentIndex + 1]._id },
      { ...products[0], id: products[0]._id },
    ];
  } else {
    relatedProducts = [
      { ...products[currentIndex + 1], id: products[currentIndex + 1]._id },
      { ...products[currentIndex + 2], id: products[currentIndex + 2]._id },
    ];
  }

  return (
    <>
      {/* 🔔 Cart Popup */}
      <CartAlert
        open={alertBox?.open}
        error={alertBox?.error}
        msg={alertBox?.msg}
      />

      <div className={styles.container}>
        <div className="row">
          {/* Product Images */}
          <div className="col-md-6">
            <div className={styles.mb3}>
              <img
                src={images[activeIndex] || "/fallback-image.jpg"}
                alt="Main Product"
                className={styles.mainImage}
              />
            </div>
            <div className={styles.thumbnailContainer}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`${styles.thumbnail} ${
                    activeIndex === index ? styles.active : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.textMuted}>Category: {product.category}</p>
            <p className={styles.textMuted}>Brand: {product.brand}</p>

            <h4 className={styles.priceSection}>
              <del className={styles.textSecondary}>
                ₹{product.previousPrice}
              </del>
              <span className={styles.textSuccess}>₹{product.price}</span>
            </h4>

            <div className={styles.my2}>
              <span className={styles.textPrimary}>In Stock: {stock}</span>
            </div>

            {/* ⭐ Rating */}
            <div className="my-2 d-flex align-items-center">
              <span className="me-2">Rating:</span>
              {[...Array(5)].map((_, idx) =>
                idx < product.rating ? (
                  <FaStar key={idx} color="#f0a500" />
                ) : (
                  <FaRegStar key={idx} color="#ccc" />
                )
              )}
            </div>

            {/* 🎨 Colors */}
            <div className="my-2">
              <strong>Colors:</strong>{" "}
              {product.color && product.color.length > 0
                ? product.color.join(", ")
                : "Not specified"}
            </div>

            {/* 🔢 Quantity */}
            <div
              className={styles.my3}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h6
                className={styles.quantityLabel}
                style={{ fontWeight: "600" }}
              >
                Quantity:
              </h6>
              <div className={`${styles.quantityControls} p-3`}>
                <button
                  className={styles.btnOutlineSecondary}
                  onClick={setDecrease}
                >
                  <TiMinus />
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  className={styles.btnOutlineSecondary}
                  onClick={setIncrease}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* 🛒 Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={styles.btnSuccess}
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart <FaCartPlus />
              </button>
              <button className={styles.btnOutlinePrimary}>Buy Now</button>
            </div>
          </div>
        </div>

        <hr className={styles.hr} />

        {/* Description */}
        <div>
          <h4 className={styles.sectionTitle}>Product Description</h4>
          <p className={`${styles.textSecondary} text-decoration-none`}>
            {product.description || "No description available"}
          </p>
        </div>

        <hr className={styles.hr} />

        {/* Reviews */}
        <div>
          <h4 className={styles.sectionTitle}>Customer Reviews</h4>
          {[
            { name: "Amit", rating: 5, comment: "Fantastic product!" },
            {
              name: "Priya",
              rating: 4,
              comment: "Very good, but packaging can improve.",
            },
            {
              name: "John",
              rating: 3,
              comment: "Average quality for the price.",
            },
          ].map((review, i) => (
            <div key={i} className={styles.review}>
              <strong className={styles.reviewAuthor}>{review.name}</strong>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, idx) =>
                  idx < review.rating ? (
                    <FaStar key={idx} color="#f0a500" />
                  ) : (
                    <FaRegStar key={idx} color="#ccc" />
                  )
                )}
              </div>
              <p className={styles.textMuted}>{review.comment}</p>
            </div>
          ))}
        </div>

        <hr className={styles.hr} />

        {/* Related Products */}
        <div className={styles.relatedProducts}>
          <h4 className={styles.sectionTitle}>Related Products</h4>
          <div className="row">
            {relatedProducts.map((rp, idx) => (
              <div key={idx} className="col-md-4 col-sm-6 my-2">
                <div className={styles.card}>
                  <img
                    src={rp.images?.[0] || "/fallback-image.jpg"}
                    className={styles.cardImgTop}
                    alt={rp.name}
                  />
                  <div
                    className={`${styles.cardBody} d-flex flex-column align-items-center justify-content-center`}
                  >
                    <h5 className={styles.cardTitle}>{rp.name}</h5>
                    <p className={styles.textSuccess}>₹ {rp.price}</p>
                    <Link
                      to={`/product/${rp.id}`}
                      onClick={handleViewProductClick}
                    >
                      <button className={styles.btnOutlineSuccess}>
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
