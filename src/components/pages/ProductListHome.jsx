import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types"; // Optional: Add for type checking
import ProductModel from "./ProductModel";
import "../css/ProductListHome.css";
import GetProducts from "../../context/GetProducts";
import { Link } from "react-router-dom";

// Utility function (move to separate file if reusable)
const chunkProducts = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const ProductCard = React.memo(({ product, onViewDetails }) => (
  <div className="col-6 col-md-4 col-lg-3 item d-flex justify-content-center align-items-center flex-column mb-2">
    <img
      src={product.images?.[0] || "/fallback-image.jpg"}
      alt={`${product.brand} ${product.name}`}
      className="product-image"
      onError={(e) => {
        e.target.src = "/default-fallback.jpg";
      }} // Fallback for image load error
    />
    <p className="fs-5">{product.name}</p>
    <span className="text-decoration-line-through">
      ₹{product.previousPrice}
    </span>
    <span className="fs-5 text-warning">₹{product.price}</span>
    <span className="fs-6">{product.brand}</span>
    <button
      className="view-details-btn"
      onClick={() => onViewDetails(product._id)}
      aria-label={`View details for ${product.brand} ${product.name}`}
      onKeyPress={(e) => e.key === "Enter" && onViewDetails(product._id)} // Keyboard accessibility
    >
      View Details
    </button>
  </div>
));

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.array,
    brand: PropTypes.string,
    name: PropTypes.string,
    previousPrice: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

const ProductListHome = ({ id, name, category }) => {
  const carouselId = `carouselExample-${id}`;
  const [isOpenProductModel, setIsOpenProductModel] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { products } = useContext(GetProducts);

  const viewProductDetails = (productId) => {
    if (productId) {
      setSelectedProductId(productId);
      setIsOpenProductModel(true);
    }
  };

  const closeProductModel = () => {
    setIsOpenProductModel(false);
    setSelectedProductId(null);
  };

  // Memoize filtered and chunked products
  const featuredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.isFeatured === true && product.category === category
      ),
    [products, category]
  );
  const productChunks = useMemo(
    () => chunkProducts(featuredProducts, 3),
    [featuredProducts]
  );

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <div className="container" role="alert">
        No featured products available in {name}
      </div>
    );
  }

  return (
    <>
      <div className="product-list-type">
        <div className="container">
          <div className="box-division d-flex justify-content-between flex-column flex-md-row">
            <div className="first-box d-flex align-items-center justify-content-center">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Best of {name}</h5>
                  <Link
                    to={`/category/${name.toLowerCase()}`}
                    className="btn btn-primary"
                    aria-label={`View more ${name} products`}
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>

            <div className="second-box">
              <div className="middle-portion">
                <div
                  id={carouselId}
                  className="carousel slide"
                  data-bs-ride="carousel"
                  aria-live="polite" // Accessibility for screen readers
                >
                  <div className="carousel-indicators">
                    {productChunks.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>

                  <div className="carousel-inner">
                    {productChunks.map((chunk, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        data-bs-interval="5000"
                      >
                        <div className="row d-flex justify-content-center">
                          {chunk.map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              onViewDetails={viewProductDetails}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev previous-button"
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="prev"
                    aria-label="Previous Slide"
                  >
                    <span className="previous-icon" aria-hidden="true">
                      <i className="ri-arrow-left-s-line"></i>
                    </span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next next-button"
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="next"
                    aria-label="Next Slide"
                  >
                    <span className="next-icon" aria-hidden="true">
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenProductModel && (
        <ProductModel
          productId={selectedProductId}
          closeProductModel={closeProductModel}
        />
      )}
    </>
  );
};

ProductListHome.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ProductListHome;
