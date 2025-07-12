import { IoSearchOutline } from "react-icons/io5";
import styles from "../css/SearchBox.module.css";
import GetProducts from "../../context/GetProducts";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { products } = useContext(GetProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term && Array.isArray(products)) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchTerm(""); // Optional: clear the input
    setSuggestions([]); // Optional: hide suggestions
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerSearch}>
        <input
          type="text"
          placeholder="Search for products..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className={styles.searchButton}>
          <IoSearchOutline />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((product) => (
            <li
              key={product._id}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(product._id)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
