import React, { useState } from 'react';
import Modal from 'react-modal';
import { login, signup } from '../services/api';
import styles from './AuthModal.module.css';

Modal.setAppElement('#__docusaurus');

function AuthModal({ isOpen, onRequestClose, initialLoginState = true }) {
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
        alert('Login successful!');
      } else {
        await signup({ email, password, experience_level: experienceLevel });
        alert('Signup successful! Please login.');
        setIsLogin(true); 
      }
      onRequestClose();
      window.location.reload();
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
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
        {/* Close Button with Icon */}
        <button
          onClick={onRequestClose}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <span className={styles.titleIcon}>
              {isLogin ? '🔐' : '🚀'}
            </span>
            {isLogin ? 'Welcome Back' : 'Join Robotics Hub'}
          </h2>
          <p className={styles.modalSubtitle}>
            {isLogin ? 'Sign in to continue your learning journey' : 'Create account to get started'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className={styles.toggleButtonGroup}>
          <button
            onClick={() => setIsLogin(true)}
            className={`${styles.toggleButton} ${isLogin ? styles.active : ''}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`${styles.toggleButton} ${!isLogin ? styles.active : ''}`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✉️</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={styles.input}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={styles.input}
                disabled={isLoading}
              />
            </div>
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <div className={styles.selectWrapper}>
                <span className={styles.selectIcon}>📊</span>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className={styles.select}
                  disabled={isLoading}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingSpinner}></span>
            ) : (
              <span className={styles.buttonText}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <p className={styles.footerText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={styles.toggleLink}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default AuthModal;