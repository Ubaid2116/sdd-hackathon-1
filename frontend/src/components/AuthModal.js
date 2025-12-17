import { useState, useEffect } from "react";
import Modal from "react-modal";
import { login, signup } from "../services/api";
import styles from "./AuthModal.module.css";

function AuthModal({ isOpen, onRequestClose, initialLoginState = true }) {
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Modal safe for SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("#__docusaurus");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        alert("Login successful!");
      } else {
        await signup({ email, password, experience_level: experienceLevel });
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }

      onRequestClose();

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
      closeTimeoutMS={300}
    >
      <div className={styles.modalContentInner}>
        <button onClick={onRequestClose} className={styles.closeButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <span className={styles.titleIcon}>{isLogin ? "🔐" : "🚀"}</span>
            {isLogin ? "Welcome Back" : "Join Robotics Hub"}
          </h2>
          <p className={styles.modalSubtitle}>
            {isLogin
              ? "Sign in to continue your learning journey"
              : "Create account to get started"}
          </p>
        </div>

        {/* Toggle Login / Sign Up */}
        <div className={styles.toggleButtonGroup}>
          <button
            onClick={() => setIsLogin(true)}
            className={`${styles.toggleButton} ${isLogin ? styles.active : ""}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`${styles.toggleButton} ${
              !isLogin ? styles.active : ""
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Experience Level (only Signup) */}
          {!isLogin && (
            <div className={styles.formGroup}>
              <div className={styles.selectWrapper}>
                <span className={styles.selectIcon}>📊</span>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className={styles.select}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${
              isLoading ? styles.loading : ""
            }`}
          >
            {isLoading ? (
              <span className={styles.loadingSpinner}></span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className={styles.modalFooter}>
          <p className={styles.footerText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={styles.toggleLink}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default AuthModal;