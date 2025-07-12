import styles from "../css/PriceFilter.module.css";

const PriceFilter = ({ price, setPrice, min = 100, max = 100000 }) => {
  const handleChange = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
  };

  return (
    <div className={styles.priceFilter}>
      <span className={`${styles.title} fs-6`}>FILTER BY PRICE</span>

      <input
        type="range"
        min={min}
        max={max}
        value={price}
        onChange={handleChange}
        className={styles.slider}
      />

      <div className={`${styles.priceValue} mt-2`}>
        Up to: <strong>₹ {price.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default PriceFilter;
