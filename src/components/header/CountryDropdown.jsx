import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { FaAngleDown } from "react-icons/fa6";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import CountryName from "../../context/CountryName";
import styles from "../css/CountryDropDown.module.css";

const CountryDropDown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [countryAlpha, setCountryAlpha] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");

  const { countryList } = useContext(CountryName);

  useEffect(() => {
    setCountryAlpha(countryList);
  }, [countryList]);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const handleSelectCountry = (countryName) => {
    setSelectedCountry(countryName);
    handleCloseModal();
  };

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = countryList.filter((item) =>
      item.country.toLowerCase().includes(keyword)
    );
    setCountryAlpha(filtered);
  };

  const formatCountryName = (name) =>
    name.length > 10 ? `${name.substring(0, 10)}...` : name;

  return (
    <>
      <Button
        className={`${styles.countryDrop} d-flex justify-content-around align-items-center me-3`}
        onClick={handleOpenModal}
        aria-label="Open country selector"
      >
        <div className={`${styles.locationText} d-flex flex-column text-start`}>
          <span className={styles.yourLocation}>Your Location</span>
          <span className={styles.country}>
            {formatCountryName(selectedCountry)}
          </span>
        </div>
        <span className={styles.dropdownIcon}>
          <FaAngleDown style={{ fontWeight: "bold" }} />
        </span>
      </Button>

      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        className={`${styles.locationModel} `}
        aria-labelledby="country-dialog-title"
        PaperProps={{ className: styles.customDialog }}
        aria-describedby="country-dialog-description"
      >
        <IoClose
          className={styles.close_}
          onClick={handleCloseModal}
          role="button"
          aria-label="Close dialog"
        />

        <h4 id="country-dialog-title" className={styles.dialogTitle}>
          Choose Your Delivery Country
        </h4>
        <p id="country-dialog-description" className={styles.dialogDescription}>
          Enter your country and we will specify the offer for your country.
        </p>

        <div className="d-flex justify-content-center align-items-center">
          <div className={`${styles.headerSearch}`}>
            <input
              type="text"
              placeholder="Search Your Country"
              onChange={handleFilter}
              className={styles.searchInput}
              aria-label="Search country"
            />
            <Button className={styles.searchButton} aria-label="Search button">
              <IoSearchOutline />
            </Button>
          </div>
        </div>

        <ul className={styles.countryList}>
          {countryAlpha.length > 0 ? (
            countryAlpha.map((item, index) => (
              <li
                key={item.country}
                className={styles.countryItem}
                style={{ "--index": index }}
              >
                <Button
                  className={
                    selectedCountry === item.country
                      ? styles.activeCountry
                      : styles.passiveCountry
                  }
                  onClick={() => handleSelectCountry(item.country)}
                >
                  {item.country}
                </Button>
              </li>
            ))
          ) : (
            <li className={styles.noCountryFound}>No country found.</li>
          )}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropDown;
