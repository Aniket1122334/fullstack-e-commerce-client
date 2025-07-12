import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import styles from "../css/ContactUs.module.css";

const ContactUs = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <p className={styles.contactSubtitle}>
        We’d love to hear from you! Get in touch with us.
      </p>

      <div className={styles.contactCard}>
        {/* Contact Info Section */}
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <span>Email: </span>
            <a
              href="mailto:aniketverma1122334@gmail.com"
              className={styles.link}
            >
              aniketverma1122334@gmail.com
            </a>
          </div>
          <div className={styles.contactItem}>
            <FaPhoneAlt className={styles.icon} />
            <span>Mobile: </span>
            <a href="tel:+919871587106" className={styles.link}>
              9871587106
            </a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className={styles.socialMedia}>
          <h3 className={styles.socialTitle}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a
              href="https://www.instagram.com/aniket_verma_op/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaInstagram className={styles.socialIcon} />
            </a>
            <a
              href="https://www.linkedin.com/in/aniket-972aa32a3/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaLinkedin className={styles.socialIcon} />
            </a>
            <a
              href="https://github.com/Aniket1122334    "
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaGithub className={styles.socialIcon} />
            </a>
            <a
              href="https://x.com/Aniketverma_op"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaTwitter className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Background Animation */}
      <div className={styles.backgroundAnimation}></div>
    </div>
  );
};

export default ContactUs;
