import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>

          <li className="dropdown">
            <span>Properties ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/purchase" onClick={() => setMenuOpen(false)}>Purchase</Link></li>
              <li><a href="#" className="coming-soon">Rental (coming soon)</a></li>
            </ul>
          </li>

          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          <li><a href="/login" onClick={() => setMenuOpen(false)}>Login</a></li>
          <li><a href="#" className="cart" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-shopping-cart"></i>
          </a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
