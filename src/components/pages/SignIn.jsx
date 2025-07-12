import React, { useState } from "react";
import styles from "../css/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const signin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await import("../../utils/api").then((api) =>
        api.postData("/api/users/signin", formData)
      );

      if (res.success && res.data?.token) {
        const user = {
          name: res.data.user?.name || "Unknown",
          email: res.data.user?.email || email,
          userId: res.data.user?.id || res.data.user?._id,
        };

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(user));
        window.dispatchEvent(new Event("userLogin"));
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/"); // Redirect after login
        }, 2000);
      } else {
        setError(res.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Signin Error:", err);
      setError(err.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminClick = () => {
    const baseUrl = import.meta.env.VITE_ADMIN_URL; // Fallback URL
    const finalUrl = baseUrl.endsWith("/")
      ? baseUrl + "signin"
      : baseUrl + "/signin";
    window.open(finalUrl, "_blank"); // Open in a new tab
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>

      <form className={styles.form} onSubmit={signin} noValidate>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoFocus
        />

        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword((prev) => !prev)}
            role="button"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className={styles.orText}>OR</p>

      <button
        type="button"
        className={`${styles.button} ${styles.adminButton}`}
        onClick={handleAdminClick}
        disabled={loading}
      >
        Sign in as Admin
      </button>

      <p className={styles.registerPrompt}>
        Not registered?{" "}
        <span className={styles.link} onClick={() => navigate("/register")}>
          Create an account
        </span>
      </p>

      {showPopup && (
        <div className={styles.popup} role="alert" aria-live="assertive">
          <p>Login Successful!</p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
