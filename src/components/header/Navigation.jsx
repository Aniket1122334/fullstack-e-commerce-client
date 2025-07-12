import Button from "@mui/material/Button";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { RiComputerFill } from "react-icons/ri";
import { GiSchoolBag } from "react-icons/gi";
import { GiFruitBowl } from "react-icons/gi";
import { GiLipstick } from "react-icons/gi";
import { FaPhone } from "react-icons/fa";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useState } from "react";
import GetProducts from "../../context/GetProducts";
import styles from "../css/Navigation.module.css";
import { useContext } from "react";

const Navigation = () => {
  const [sidebarValue, setSidebarValue] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const { products } = useContext(GetProducts);

  const toggleSubmenu = (index, section) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [`${section}-${index}`]: !prev[`${section}-${index}`],
    }));
  };

  const closeSidebar = () => {
    setSidebarValue(false);
    setOpenSubmenus({});
  };

  return (
    <nav>
      <div className="container">
        <div className="row mt-4">
          <div
            className="col-sm-3 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <div className={styles.catWrapper} style={{ width: "100%" }}>
              <Button
                className={`${styles.allCategoryButton} d-flex align-items-center justify-content-between`}
                onClick={() => setSidebarValue(!sidebarValue)}
                aria-expanded={sidebarValue}
                aria-controls="sidebar-nav"
              >
                <span className={`${styles.icon1} me-3`}>
                  <IoMenuOutline />
                </span>
                <span className={styles.text}>ALL CATEGORIES</span>
                <span className={`${styles.icon2} pe-3`}>
                  <TfiAngleDown />
                </span>
              </Button>

              <div
                id="sidebar-nav"
                className={`${styles.sidebarNav} ${
                  sidebarValue ? styles.open : styles.close
                }`}
              >
                <IoClose
                  className={styles.closeButton}
                  onClick={closeSidebar}
                  role="button"
                  aria-label="Close sidebar"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && closeSidebar()}
                />
                <ul>
                  <li>
                    <Link to="/" className={styles.catLink}>
                      <Button>Home</Button>
                    </Link>
                  </li>

                  <li onClick={() => toggleSubmenu(1, "sidebar")}>
                    <div
                      className={styles.catLink}
                      aria-expanded={openSubmenus["sidebar-1"]}
                      aria-controls="sidebar-fashion-submenu"
                    >
                      <Button>Fashion</Button>
                    </div>
                    <ul
                      id="sidebar-fashion-submenu"
                      className={`${styles.submenu} ${
                        openSubmenus["sidebar-1"] ? styles.open : ""
                      }`}
                    >
                      <li>
                        <Link
                          to="/category/fashion/men"
                          className={styles.catLink}
                        >
                          <Button>Men</Button>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/category/fashion/women"
                          className={styles.catLink}
                        >
                          <Button>Women</Button>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li onClick={() => toggleSubmenu(2, "sidebar")}>
                    <div
                      className={styles.catLink}
                      aria-expanded={openSubmenus["sidebar-2"]}
                      aria-controls="sidebar-electronic-submenu"
                    >
                      <Button>Electronic</Button>
                    </div>
                    <ul
                      id="sidebar-electronic-submenu"
                      className={`${styles.submenu} ${
                        openSubmenus["sidebar-2"] ? styles.open : ""
                      }`}
                    >
                      <li>
                        <Link
                          to="/category/electronics/mobiles"
                          className={styles.catLink}
                        >
                          <Button>Mobiles</Button>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/electronics/laptops"
                          className={styles.catLink}
                        >
                          <Button>Laptops</Button>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/electronics/tvs"
                          className={styles.catLink}
                        >
                          <Button>TVs</Button>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/electronics/smartwatches"
                          className={styles.catLink}
                        >
                          <Button>Smart Watches</Button>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li onClick={() => toggleSubmenu(3, "sidebar")}>
                    <div
                      className={styles.catLink}
                      aria-expanded={openSubmenus["sidebar-3"]}
                      aria-controls="sidebar-bags-submenu"
                    >
                      <Button>Bags</Button>
                    </div>
                    <ul
                      id="sidebar-bags-submenu"
                      className={`${styles.submenu} ${
                        openSubmenus["sidebar-3"] ? styles.open : ""
                      }`}
                    >
                      <li>
                        <Link
                          to="/category/bags/men%20bags"
                          className={styles.catLink}
                        >
                          <Button>Men Bags</Button>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/bags/women%20bags"
                          className={styles.catLink}
                        >
                          <Button>Women Bags</Button>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/category/groceries" className={styles.catLink}>
                      <Button>Groceries</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/beauty" className={styles.catLink}>
                      <Button>Beauty</Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`${styles.listmenu} col-sm-9 d-flex align-items-center`}
          >
            <ul className={`${styles.list} list-inline`}>
              <li className="list-inline-item">
                <Link to="/" className={styles.catLink}>
                  <FaHome className="me-1" />
                  Home
                </Link>
              </li>
              <li
                className="list-inline-item"
                onClick={() => toggleSubmenu(1, "list")}
              >
                <div
                  className={styles.catLink}
                  aria-expanded={openSubmenus["list-1"]}
                  aria-controls="list-fashion-submenu"
                >
                  <GiClothes className="me-1" />
                  Fashion
                </div>
                <ul
                  id="list-fashion-submenu"
                  className={`${styles.submenu} ${
                    openSubmenus["list-1"] ? styles.open : ""
                  }`}
                >
                  <li>
                    <Link to="/category/fashion/men" className={styles.catLink}>
                      <Button>Men</Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/fashion/women"
                      className={styles.catLink}
                    >
                      <Button>Women</Button>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="list-inline-item"
                onClick={() => toggleSubmenu(2, "list")}
              >
                <div
                  className={styles.catLink}
                  aria-expanded={openSubmenus["list-2"]}
                  aria-controls="list-electronic-submenu"
                >
                  <RiComputerFill className="me-1" />
                  Electronic
                </div>
                <ul
                  id="list-electronic-submenu"
                  className={`${styles.submenu} ${
                    openSubmenus["list-2"] ? styles.open : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/category/electronics/mobiles"
                      className={styles.catLink}
                    >
                      <Button>Mobiles</Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/electronics/laptops"
                      className={styles.catLink}
                    >
                      <Button>Laptops</Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/electronics/tvs"
                      className={styles.catLink}
                    >
                      <Button>TVs</Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/electronics/smartwatches"
                      className={styles.catLink}
                    >
                      <Button>Smart Watches</Button>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="list-inline-item"
                onClick={() => toggleSubmenu(3, "list")}
              >
                <div
                  className={styles.catLink}
                  aria-expanded={openSubmenus["list-3"]}
                  aria-controls="list-bags-submenu"
                >
                  <GiSchoolBag className="me-1" />
                  Bags
                </div>
                <ul
                  id="list-bags-submenu"
                  className={`${styles.submenu} ${
                    openSubmenus["list-3"] ? styles.open : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/category/bags/men%20bags"
                      className={styles.catLink}
                    >
                      <Button>Men Bags</Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/bags/women%20bags"
                      className={styles.catLink}
                    >
                      <Button>Women Bags</Button>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="list-inline-item">
                <Link to="/category/groceries" className={styles.catLink}>
                  <GiFruitBowl className="me-1" />
                  Groceries
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/category/beauty" className={styles.catLink}>
                  <GiLipstick className="me-1" />
                  Beauty
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/contact" className={styles.catLink}>
                  <FaPhone className="me-1" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
