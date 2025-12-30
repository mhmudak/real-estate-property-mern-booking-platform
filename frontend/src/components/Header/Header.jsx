import "./Header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthPopup from "../AuthPopup/AuthPopup";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showAuthPopup, setShowAuthPopup] = useState(false);

  /*  
  ==========================================
   useEffect → run once on page load
  ==========================================
  */
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") {
      setIsLoggedIn(true);
    }

    // 🔑 GLOBAL TRIGGER
    window.openAuthPopup = () => {
      setShowAuthPopup(true);
      setMenuOpen(false);
    };
  }, []); // runs ONCE when Header mounts

  /*  
  ==========================================
   LOGOUT HANDLER
  ==========================================
  */
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  return (
    <header>
      <h1 className="logo">
        <Link to="/">Real Estate</Link>
      </h1>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* Navigation */}
      <nav className={menuOpen ? "nav open" : "nav"}>
        <ul className="nav-list">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li className="dropdown">
            <span>Properties ▾</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/purchase" onClick={() => setMenuOpen(false)}>
                  Purchase
                </Link>
              </li>
              <li>
                <a href="#" className="coming-soon">
                  Rental (coming soon)
                </a>
              </li>
              <li>
                <Link to="/myfavorites" onClick={() => setMenuOpen(false)}>
                  My Favorites
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
          </li>

          {/* LOGIN OR LOGOUT */}
          <li>
            {!isLoggedIn ? (
              <Link
                className="login-btn"
                onClick={() => {
                  setShowAuthPopup(true);
                  setMenuOpen(false);
                }}
              >
                Login
              </Link>
            ) : (
              <Link className="login-btn" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {/* AuthPopup */}
      {showAuthPopup && (
        <AuthPopup
          isOpen={showAuthPopup}
          onClose={() => {
            setShowAuthPopup(false);

            // when auth popup closes → check localStorage for login
            if (localStorage.getItem("isLoggedIn") === "true") {
              setIsLoggedIn(true);
            }
          }}
        />
      )}
    </header>
  );
}

export default Header;
