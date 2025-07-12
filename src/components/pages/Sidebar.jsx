import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/Sidebar.module.css";
import PriceFilter from "./PriceFilter";

const Sidebar = ({ price, setPrice }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const { category } = useParams();

  const categoryList = [
    "fashion",
    "electronics",
    "bags",
    "groceries",
    "beauty",
  ];

  // Set selected category based on URL
  useEffect(() => {
    if (categoryList.includes(category)) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("");
    }
  }, [category]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    navigate(`/category/${cat}`);
  };

  const handleClearFilter = () => {
    setPrice(100000);
  };

  return (
    <div
      className={`${styles.sideBar} d-flex justify-content-center align-items-center flex-column`}
    >
      <h4>Product Categories</h4>
      <div
        className={`${styles.chooseBox} d-flex justify-content-center align-items-center flex-column`}
      >
        {categoryList.map((cat) => (
          <label key={cat}>
            <div
              className="d-flex justify-content-start align-items-center"
              style={{ width: "120px", cursor: "pointer" }}
              onClick={() => handleCategoryChange(cat)}
            >
              <input
                type="radio"
                name="chooseBox"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              <span className="ms-2 text-capitalize">{cat}</span>
            </div>
          </label>
        ))}
      </div>

      <hr style={{ width: "100%" }} />

      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
        FILTER BY PRICE
      </h4>
      <PriceFilter price={price} setPrice={setPrice} />

      <hr style={{ width: "100%" }} />

      <button
        type="button"
        className={`btn ${styles.clearBtn}`}
        onClick={handleClearFilter}
        style={{ color: "white" }}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default Sidebar;
