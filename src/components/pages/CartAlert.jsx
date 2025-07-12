// src/components/CartAlert.jsx
import React, { useEffect, useState } from "react";
import styles from "../css/CartAlert.module.css"; // Style this component

const CartAlert = ({ open, error = false, msg = "" }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000); // Hide after 3 sec
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div className={`${styles.alert} ${error ? styles.error : styles.success}`}>
      {msg}
    </div>
  );
};

export default CartAlert;
