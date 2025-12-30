/* eslint-disable no-unused-vars */
import "./AuthPopup.css";
import { useState } from "react";
import { loginService, signupService } from "../../services/userService";
import { toast } from "react-toastify";

function AuthPopup({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);

  // Local state for inputs
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // prevents rendering the component when it’s closed
  if (!isOpen) return null;

  /*  
  ===========================================
   SIGNUP - Connected to Backend using async/await
  ===========================================
  */
  const handleSignup = async () => {
    try {
      const res = await signupService(signupData);
      toast.success("Account created successfully!", {
        className: "myBlueToast",
      });

      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed!");
      console.error("SIGNUP ERROR:", err);
    }
  };

  /*  
  ===========================================
   LOGIN - Connected to Backend using async/await
  ===========================================
  */
  const handleLogin = async () => {
    try {
      const res = await loginService(loginData);
      toast.success(`Welcome ${res.data.user.firstname || "User"}!`, {
        className: "myBlueToast",
      });

      localStorage.setItem("isLoggedIn", "true");

      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed!");
      console.error("LOGIN ERROR:", err);
    }
  };

  return (
    <div className="auth-overlay">
      <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
        {/* CLOSE BUTTON */}
        <span
          className={`close-btn ${isSignUp ? "signup-visible" : ""}`}
          onClick={onClose}
        >
          ×
        </span>

        {/* SIGN UP FORM */}
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="First Name"
              onChange={(e) =>
                setSignupData({ ...signupData, firstname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setSignupData({ ...signupData, lastname: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) =>
                setSignupData({ ...signupData, phoneNumber: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              onChange={(e) =>
                setSignupData({ ...signupData, city: e.target.value })
              }
            />

            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
          </form>
        </div>

        {/* SIGN IN FORM */}
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign In</h1>

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <button type="button" onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </div>

        {/* RIGHT SIDE SLIDING PANELS */}
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
