import "./Footer.css";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li>Properties for Sale</li>
            <li>New Listings</li>
            <li>Luxury Homes</li>
            <li>Affordable Homes</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 4 – Social */}
        <div className="footer-column">
          <h3>Follow Us</h3>

          <div className="footer-socials">
            <Facebook size={31} />
            <Instagram size={31} />
            <Linkedin size={31} />
            <Youtube size={31} />
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
}
