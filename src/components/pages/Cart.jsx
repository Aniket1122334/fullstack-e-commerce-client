import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Cart.module.css";
import { FaMinus, FaPlus, FaArrowRightToBracket } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { fetchData, putData, removeData } from "../../utils/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Function to update localStorage
  const updateCartLocalStorage = (updatedCartItems) => {
    const subtotal = updatedCartItems.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );
    const shipping = updatedCartItems.length > 0 ? 40 : 0;
    const grandTotal = subtotal + shipping;

    localStorage.setItem("cartSubtotal", subtotal.toFixed(2)); // Added
    localStorage.setItem("cartTotalAmount", grandTotal.toFixed(2));
    localStorage.setItem("cartItemCount", updatedCartItems.length);
  };

  // Fetch cart items initially
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    if (user?.userId) {
      fetchData(`/api/cart?userId=${user.userId}`).then((data) => {
        if (Array.isArray(data)) {
          setCartItems(data);
          updateCartLocalStorage(data);
        }
      });
    }
  }, []);

  const updateQuantity = async (id, type) => {
    let updatedItems = [];

    setCartItems((prev) => {
      updatedItems = prev.map((item) => {
        if (item._id === id) {
          const newQuantity =
            type === "inc"
              ? Math.min(item.quantity + 1, item.stock || 10)
              : Math.max(item.quantity - 1, 1);

          const updatedItem = {
            ...item,
            quantity: newQuantity,
            subTotal: newQuantity * item.price,
          };

          updateCartInDatabase(updatedItem);
          return updatedItem;
        }
        return item;
      });

      updateCartLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const updateCartInDatabase = async (updatedItem) => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user?.userId) {
        await putData(`/api/cart/${updatedItem._id}`, {
          userId: user.userId,
          quantity: updatedItem.quantity,
          subTotal: updatedItem.subTotal,
        });
      }
    } catch (error) {
      console.error("Failed to update cart in database:", error);
    }
  };

  const removeItem = async (id) => {
    const originalItems = [...cartItems];
    const filteredItems = originalItems.filter((item) => item._id !== id);
    setCartItems(filteredItems);
    updateCartLocalStorage(filteredItems);

    try {
      const result = await removeData(`/api/cart/${id}`);
      if (!result.success) throw new Error(result.message);
    } catch (error) {
      console.error("Failed to remove item from database:", error);
      setCartItems(originalItems); // rollback
      updateCartLocalStorage(originalItems);
    }
  };

  const totalSubtotal = cartItems.reduce((acc, item) => acc + item.subTotal, 0);
  const shipping = cartItems.length > 0 ? 40 : 0;
  const grandTotal = totalSubtotal + shipping;

  const handleProceedToBilling = () => {
    if (cartItems.length === 0) {
      alert("Please add products in cart first.");
    } else {
      navigate("/billing");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Your Cart</h2>
        <p className={styles.summary}>
          There {cartItems.length === 1 ? "is" : "are"}{" "}
          <b>{cartItems.length}</b> product
          {cartItems.length !== 1 ? "s" : ""} in your cart
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className={styles.productColumn}>
                    <Link to={`/product/${item.productId}`}>
                      <div className={styles.productInfo}>
                        <div className={styles.imageWrapper}>
                          <img
                            src={item.image}
                            alt={item.productName}
                            className={styles.productImage}
                          />
                        </div>
                        <div className={styles.infoText}>
                          <h6>{item.productName}</h6>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className={styles.centeredText}>₹ {item.price}</td>
                  <td className={styles.centeredText}>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item._id, "dec")}>
                        <FaMinus />
                      </button>
                      <div className={styles.quantityValue}>
                        {item.quantity}
                      </div>
                      <button onClick={() => updateQuantity(item._id, "inc")}>
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className={styles.centeredText}>
                    ₹ {item.subTotal.toFixed(2)}
                  </td>
                  <td className={styles.centeredText}>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeItem(item._id)}
                    >
                      <IoCloseSharp />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className={styles.totalAmount}>
          <h4>CART TOTAL</h4>
          <div className={styles.dFlex}>
            <h6>SubTotal:</h6>
            <span>₹{totalSubtotal.toFixed(2)}</span>
          </div>
          <div className={styles.dFlex}>
            <h6>Shipping:</h6>
            <span>₹{shipping}</span>
          </div>
          <div className={styles.dFlex}>
            <h6>Total:</h6>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

          <button
            className={styles.totalButton}
            onClick={handleProceedToBilling}
          >
            <h5>Proceed To Payment</h5>
            <FaArrowRightToBracket />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
