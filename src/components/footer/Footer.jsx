import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";

import "../css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <div className="footer__grid">
          {/* About Section */}
          <div className="footer__about">
            <h4>About Us</h4>
            <p>
              We are a leading e-commerce platform, offering a wide range of
              products from fashion to electronics. Our mission is to provide
              quality goods with exceptional customer service.
            </p>
          </div>

          {/* Subscribe Section */}
          <div className="footer__subscribe">
            <h4>Subscribe</h4>
            <p>Stay updated with our latest offers and products.</p>
            <div>
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="footer__social">
            <h4>Follow Us</h4>
            <div className="footer__social-links">
              <a
                href="https://www.instagram.com/aniket_verma_op/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/Aniketverma_op"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Contact Section */}

          <div className="footer__contact">
            <h4>Contact Us</h4>

            <p>
              <FaEnvelope /> support@ecommerce.com
            </p>
            <p>
              <FaPhone /> +91 XXX-XXX-XXXX
            </p>
            <p>
              <FaMapMarkerAlt /> 123 E-Commerce Street, Delhi, India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-inner">
            <p>© 2025 E-Commerce. All Rights Reserved.</p>
            <div className="footer__bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">
                <FaEnvelopeOpenText style={{ marginRight: "5px" }} />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
