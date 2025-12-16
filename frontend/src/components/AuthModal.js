import React, { useState } from 'react';
import Modal from 'react-modal';
import { login, signup } from '../services/api';
import styles from './AuthModal.module.css';


Modal.setAppElement('#__docusaurus'); // Crucial for react-modal to attach to the Docusaurus root element

function AuthModal({ isOpen, onRequestClose, initialLoginState = true }) {
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
      setError(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{isLogin ? 'Login' : 'Signup'}</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.toggleButtonGroup}>
          <button
            onClick={() => setIsLogin(true)}
            className={`${styles.toggleText} ${isLogin ? styles.toggleTextActive : ''}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`${styles.toggleText} ${!isLogin ? styles.toggleTextActive : ''}`}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Experience Level:</label>
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
          )}
          <button
            type="submit"
            className={styles.submitButton}
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <button
          onClick={onRequestClose}
          className={styles.closeButton}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default AuthModal;