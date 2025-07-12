import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiTravelDress } from "react-icons/gi";
import { HiMiniTv } from "react-icons/hi2";
import { FaBagShopping } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { GiLipstick } from "react-icons/gi";

import image1 from "../../assets/images/banner/1st.webp";
import image2 from "../../assets/images/banner/2nd.jpg";
import image3 from "../../assets/images/banner/3rd.webp";
import image4 from "../../assets/images/banner/4th.jpg";
import image5 from "../../assets/images/banner/5th.jpg";
import image6 from "../../assets/images/banner/6th.jpg";
import image7 from "../../assets/images/banner/7th.jpg";
import image8 from "../../assets/images/banner/8th.jpg";

import "../css/Home.css";
import ProductListHome from "./ProductListHome";
import Services from "./Services";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container homeBanner">
        <div
          id="carouselExampleInterval"
          className="carouselWrapper carousel slide slider"
          data-bs-ride="carousel"
        >
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {[
              image1,
              image2,
              image3,
              image4,
              image5,
              image6,
              image7,
              image8,
            ].map((img, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                data-bs-interval="3000"
              >
                <img
                  src={img}
                  className="customImage d-block w-100"
                  alt={`Banner Image ${idx + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <button
            className="customPrevButton carousel-control-prev previous_button"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="customIcon" aria-hidden="true">
              <IoIosArrowBack />
            </span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="customNextButton carousel-control-next next_button"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="customIcon" aria-hidden="true">
              <IoIosArrowForward />
            </span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="categoryListBanner">
        <div className="container mt-5">
          <div className="featuredItemHeading">
            <h3>Featured Categories</h3>
          </div>
          <div className="feturedItem d-flex align-items-center justify-content-around p-4 mt-4">
            <Link
              to="/category/fashion"
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <button>
                <GiTravelDress />
              </button>
              <h3>fashion</h3>
            </Link>

            <Link
              to="/category/electronics"
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <button>
                <HiMiniTv />
              </button>
              <h3>Electronics</h3>
            </Link>

            <Link
              to="/category/bags"
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <button>
                <FaBagShopping />
              </button>
              <h3>Bags</h3>
            </Link>

            <Link
              to="/category/groceries"
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <button>
                <GiFruitBowl />
              </button>
              <h3>Groceries</h3>
            </Link>

            <Link
              to="/category/beauty"
              className="d-flex justify-content-center align-items-center flex-column mt-1 "
            >
              <button>
                <GiLipstick />
              </button>
              <h3>Beauty</h3>
            </Link>
          </div>
        </div>
      </div>

      <ProductListHome id="1" name="Fashion" category="fashion" />
      <ProductListHome id="2" name="Electronics" category="electronics" />
      <ProductListHome id="3" name="Bags" category="bags" />
      <ProductListHome id="4" name="Groceries" category="groceries" />
      <ProductListHome id="5" name="Beauty" category="beauty" />
      <Services />
    </>
  );
};

export default Home;
