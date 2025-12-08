import "./AuthPopup.css";
import { useState } from "react";

function AuthPopup({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="auth-overlay">
      <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
        {/* ✖ Close Button */}
        <span
          className={`close-btn ${isSignUp ? "signup-visible" : ""}`}
          onClick={onClose}
        >
          ×
        </span>

        {/* 🟩 Sign Up Form */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign Up</button>
          </form>
        </div>

        {/* 🟦 Sign In Form */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign In</button>
          </form>
        </div>

        {/* 🔁 Sliding Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected, please log in with your info</p>
              <button className="ghost" onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details to start your journey with us</p>
              <button className="ghost" onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPopup;
