import { useState, useEffect } from "react";
import styles from "../css/Billing.module.css";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(40);
  const [total, setTotal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [cancelMessage, setCancelMessage] = useState(false);

  // ✅ Block unauthenticated users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    const storedSubtotal = Number(localStorage.getItem("cartSubtotal") || 0);
    setSubtotal(storedSubtotal);
    setTotal(storedSubtotal + shipping);
  }, [shipping]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = async () => {
    const isFormValid = Object.values(form).every(
      (value) => value.trim() !== ""
    );
    if (!isFormValid) {
      alert("Please fill in all billing details before proceeding.");
      return;
    }

    try {
      const response = await postData("/api/billing/add", {
        name: form.fullName,
        address: form.address,
        town: form.city,
        zip: Number(form.zip),
        phone: Number(form.phone),
        grantTotal: total,
      });

      if (response?.success) {
        localStorage.setItem(
          "billingData",
          JSON.stringify({
            fullName: form.fullName,
            address: form.address,
            city: form.city,
            zip: form.zip,
            phone: form.phone,
            totalAmount: total,
          })
        );

        setShowPopup(true);
      } else {
        console.error("Billing submission failed:", response?.message);
      }
    } catch (error) {
      console.error("Error submitting billing data:", error);
    }
  };

  const handleCancel = () => {
    setCancelMessage(true);
    setShowPopup(false);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className={styles.billingWrapper}>
      <h2 className={styles.title}>Billing Details</h2>
      <div className={styles.container}>
        {/* Billing Form */}
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Street Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Town / City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>ZIP Code</label>
            <input
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Amount Details */}
        <div className={styles.amountBox}>
          <h3>Amount Details</h3>
          <div className={styles.amountRow}>
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.amountRow}>
            <span>Shipping:</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className={`${styles.amountRow} ${styles.total}`}>
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleProceedToPayment}
            className={styles.paymentButton}
          >
            Proceed to Payment <FaArrowRightToBracket />
          </button>
        </div>
      </div>

      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Payment Received!</h3>
            <p>Thanks for shopping with us 🎉</p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <button
                className={styles.receiptButton}
                onClick={() => navigate("/receipt")}
              >
                Final Receipt
              </button>
              <button
                className={styles.receiptButton}
                style={{ backgroundColor: "#e53e3e" }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Cancel message */}
      {cancelMessage && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Thanks for shopping!</h3>
            <p>Redirecting to home...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
