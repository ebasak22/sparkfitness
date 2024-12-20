import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from '../firebase'; // Import Firebase config

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const auth = getAuth(firebaseApp); // Firebase Auth instance

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Google Login Handler
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User Signed In: ', result.user);
        setFeedback({ message: 'Login successful with Google!', type: 'success' });
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error('Error during sign-in:', error.message);
        setFeedback({ message: `Google Login Error: ${error.message}`, type: 'error' });
      });
  };

  // Email/Password Login Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback({ message: 'Login successful!', type: 'success' });
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setFeedback({ message: `Error: ${errorData.error}`, type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setFeedback({ message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      {feedback.message && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input with Toggle Visibility */}
        <div className="form-group password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={handleTogglePassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Login Button */}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {/* Google Sign-In */}
      <div className="google-login">
        <p>Or</p>
        <button onClick={handleGoogleLogin} className="google-login-btn">
  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
  Sign in with Google
</button>

      </div>

      {/* Links */}
      <p className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p className="signup">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
