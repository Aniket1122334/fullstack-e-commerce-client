import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Receipt.module.css";

const Receipt = () => {
  const navigate = useNavigate();

  const [receipt, setReceipt] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    totalAmount: 0,
  });

  // ✅ Block unauthenticated access
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const billingData = JSON.parse(localStorage.getItem("billingData"));

    if (billingData) {
      setReceipt({
        fullName: billingData.fullName || billingData.name || "",
        address: billingData.address || "",
        city: billingData.city || billingData.town || "",
        zip: billingData.zip || "",
        phone: billingData.phone || "",
        totalAmount: billingData.totalAmount || billingData.grantTotal || 0,
      });
    }
  }, []);

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className={styles.receiptWrapper}>
      <h2 className={styles.title}>Receipt</h2>
      <div className={styles.receiptBox}>
        <div className={styles.row}>
          <span className={styles.label}>Full Name:</span>
          <span>{receipt.fullName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Address:</span>
          <span>{receipt.address}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Town / City:</span>
          <span>{receipt.city}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>ZIP Code:</span>
          <span>{receipt.zip}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Phone Number:</span>
          <span>{receipt.phone}</span>
        </div>
        <div className={`${styles.row} ${styles.totalRow}`}>
          <span className={styles.label}>Total Amount:</span>
          <span>₹{receipt.totalAmount.toFixed(2)}</span>
        </div>

        {/* ✅ Continue Shopping Button */}
        <div className={styles.buttonWrapper}>
          <button
            className={styles.continueButton}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
