import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../css/SpecificProduct.module.css";
import { postData } from "../../utils/api"; // Make sure this exists

const SpecificProduct = ({ products, itemView }) => {
  const {
    _id,
    name = "Unnamed Product",
    price = 0,
    rating = 0,
    images = [],
    category = "General",
    stock = 10,
  } = products;

  const image =
    images.length > 0 ? images[0] : "https://via.placeholder.com/300";

  const [popup, setPopup] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user?.userId) {
      alert("Please login to add items to cart.");
      return;
    }

    const payload = {
      userId: user.userId,
      productId: _id,
      productName: name,
      price,
      image,
      quantity: 1,
      stock,
      subTotal: price,
    };

    const result = await postData("/api/cart/add", payload);
    if (result.success) {
      setPopup(true);
      setTimeout(() => setPopup(false), 2000); // Hide after 2 sec
    } else {
      alert(result.message || "Something went wrong.");
    }
  };

  return (
    <div className={`container mt-4 ${itemView}`}>
      <Link
        to={`/product/${_id}`}
        className={`text-decoration-none ${styles.cardWrapper} ${itemView}`}
      >
        <div className={styles.imageDiv}>
          <img src={image} alt={name} className={styles.cardImage} />
        </div>

        <div className={styles.cardBody}>
          <h5 className={styles.title}>{name}</h5>
          <p className={styles.category}>{category}</p>

          <div className={styles.ratingStars}>
            {[...Array(5)].map((_, i) =>
              i < Math.round(rating) ? (
                <FaStar key={i} color="#f0a500" />
              ) : (
                <FaRegStar key={i} color="#ccc" />
              )
            )}
          </div>

          <h6 className={styles.price}>₹ {price}</h6>

          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={styles.btnSuccess}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert("Proceed to Buy");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </Link>

      {/* ✅ Popup Notification */}
      {popup && (
        <div className={styles.popup}>
          <p>✅ Item added to cart!</p>
        </div>
      )}
    </div>
  );
};

export default SpecificProduct;
