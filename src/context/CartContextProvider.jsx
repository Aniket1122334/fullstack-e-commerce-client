import { useState } from "react";
import { postData } from "../utils/api";
import CartContext from "./CartContext";

const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartFields, setCartFields] = useState({});
  const [alertBox, setAlertBox] = useState({});

  const addToCart = (product, quantity) => {
    const user = JSON.parse(localStorage.getItem("userData"));

    // 🔒 Check if user is logged in
    if (!user?.userId) {
      alert("User not logged in.");
      return;
    }

    // 🛒 Prepare the new cart item
    const newCartItem = {
      image: product?.images?.[0],
      productName: product?.name,
      price: product?.price,
      quantity: quantity,
      subTotal: product?.price * quantity,
      productId: product?._id,
      userId: user.userId,
    };

    // ✅ Set the fields and update local state
    setCartFields(newCartItem);
    setCartData((prev) => [...prev, newCartItem]);

    // ✅ Clear popup first
    setAlertBox({ open: false });

    // 🔁 Send to backend
    postData("/api/cart/add", newCartItem)
      .then((res) => {
        if (res) {
          setAlertBox({
            open: true,
            error: false,
            msg: "Item is added in cart",
          });
        }
      })
      .catch((err) => {
        console.error("Error saving to cart:", err);
        setAlertBox({
          open: true,
          error: true,
          msg: "Failed to add item to cart",
        });
      });
  };

  return (
    <CartContext.Provider value={{ cartData, addToCart, alertBox }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
