import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import CountryDropDown from "./CountryDropdown";
import Button from "@mui/material/Button";
import { CiUser } from "react-icons/ci";
import { IoBagAddOutline, IoMenuOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import CountryList from "../../context/CountryName";
import styles from "../css/Header.module.css";

const Header = () => {
  const { countryList } = useContext(CountryList);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      alert("Please sign in to view your cart.");
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        setUserName(userData.name || "User");
      } else {
        setUserName("");
      }
    };

    checkToken();
    window.addEventListener("userLogin", checkToken);
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("userLogin", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  useEffect(() => {
    const syncCartFromStorage = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartTotal(0);
        setCartCount(0);
        return;
      }

      const ttl = Number(localStorage.getItem("cartTotalAmount") || 0);
      const cnt = Number(localStorage.getItem("cartItemCount") || 0);
      setCartTotal(ttl.toFixed(2));
      setCartCount(cnt);
    };

    syncCartFromStorage();
    window.addEventListener("storage", syncCartFromStorage);

    return () => {
      window.removeEventListener("storage", syncCartFromStorage);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartTotal(0);
        setCartCount(0);
        return;
      }

      const ttl = Number(localStorage.getItem("cartTotalAmount") || 0);
      const cnt = Number(localStorage.getItem("cartItemCount") || 0);
      setCartTotal(ttl.toFixed(2));
      setCartCount(cnt);
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserName("");
    if (menuOpen) toggleMenu();
  };

  const handleSignInClick = () => {
    if (menuOpen) toggleMenu();
    navigate("/signin");
  };

  return (
    <div className={styles.headerWrapper}>
      {/* ===== Mobile View ===== */}
      <div className="d-sm-none w-100 p-2">
        <div className="d-flex align-items-center">
          <Link to="/">
            <div className={styles.logoWrapperMobile}>
              <img src={Logo} alt="Logo" className={styles.logoImageMobile} />
            </div>
          </Link>

          <div className={`flex-grow-1 ${styles.searchBarWrapperMobile}`}>
            <SearchBox />
          </div>

          <div className={styles.menuWrapperMobile}>
            <Button
              onClick={toggleMenu}
              className="p-0"
              style={{
                backgroundColor: "#f0f0f0",
                color: "black",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                minWidth: "unset",
              }}
            >
              <IoMenuOutline size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {menuOpen && (
        <div
          className={`${styles.mobileMenu} d-sm-none w-100 px-4 py-3 animate__animated animate__fadeInDown`}
          style={{
            backgroundColor: "#ffffff",
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {countryList.length > 0 && (
            <div className="d-flex justify-content-center mb-3">
              <CountryDropDown />
            </div>
          )}

          <div className="text-center mt-3">
            <span
              className="d-block mb-2 fw-bold"
              style={{ fontSize: "16px", color: "#2d3748" }}
            >
              Total: ₹{cartTotal}
            </span>

            <button
              onClick={(e) => {
                toggleMenu();
                handleCartClick(e);
              }}
              className={styles.circleButton}
              style={{
                backgroundColor: "#e6fffa",
                color: "#319795",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "30px",
                width: "100%",
                border: "none",
              }}
            >
              <IoBagAddOutline style={{ marginRight: "6px" }} /> Cart (
              {cartCount})
            </button>
          </div>

          <div className="text-center mt-3">
            {!isLoggedIn ? (
              <Link to="/signin" onClick={handleSignInClick}>
                <Button
                  className="btn btn-primary w-100"
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "20px",
                    backgroundColor: "#2c7a7b",
                    color: "white",
                    border: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  Sign In
                </Button>
              </Link>
            ) : (
              <div className="dropdown">
                <Button
                  className="btn btn-primary w-100 dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "20px",
                    backgroundColor: "#2c7a7b",
                    color: "white",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <CiUser />
                  Welcome {userName}
                </Button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="userDropdown"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleSignOut}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== Mobile Navigation ===== */}
      <div className="d-sm-none w-100">
        <Navigation />
      </div>

      {/* ===== Desktop View ===== */}
      <header className={`d-none d-sm-block ${styles.header}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className={`${styles.logoWrapper} col-sm-2 text-center`}>
              <Link to="/">
                <img src={Logo} alt="Logo" className={styles.logoImage} />
              </Link>
            </div>
            <div className="col-sm-10 d-flex align-items-center">
              {countryList.length > 0 && <CountryDropDown />}
              <SearchBox />
              <div
                className={`${styles.part3} ms-auto d-flex align-items-center`}
              >
                {!isLoggedIn ? (
                  <Link to="/signin" onClick={handleSignInClick}>
                    <button
                      className={`${styles.signInButton} btn btn-primary`}
                      style={{
                        padding: "8px 20px",
                        fontSize: "14px",
                        fontWeight: "600",
                        borderRadius: "20px",
                        backgroundColor: "#2c7a7b",
                        color: "white",
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Sign In
                    </button>
                  </Link>
                ) : (
                  <div className="dropdown">
                    <button
                      className={`${styles.userButton} dropdown-toggle`}
                      id="userDropdownDesktop"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        padding: "8px 20px",
                        fontSize: "14px",
                        fontWeight: "600",
                        borderRadius: "20px",
                        backgroundColor: "#2c7a7b",
                        color: "white",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <CiUser />
                      Welcome {userName}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="userDropdownDesktop"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={handleSignOut}
                          to="/"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                <div
                  className={`${styles.cartTab} d-flex align-items-center ms-3`}
                >
                  <span className={styles.price}>₹{cartTotal}</span>
                  <div
                    className={`${styles.cartIconWrapper} position-relative ms-2`}
                  >
                    <button
                      onClick={handleCartClick}
                      className={styles.circleButton}
                    >
                      <IoBagAddOutline />
                    </button>
                    <span
                      className={`${styles.cartCount} d-flex align-items-center justify-content-center`}
                    >
                      {cartCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Desktop Navigation ===== */}
      <div className="d-none d-sm-block">
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
