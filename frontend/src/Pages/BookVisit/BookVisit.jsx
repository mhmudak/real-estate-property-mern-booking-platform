import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./BookVisit.css";
import { Tag, Home } from "lucide-react";

export default function BookVisit() {
  const location = useLocation();
  const { title, agent, image, type } = location.state || {};

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setDate("");
    setTime("");
  };

  return (
    <>
      <Header />

      <div className="bookvisit-page">
        {/* Success Modal */}
        {showSuccess && (
          <div className="success-modal">
            <div className="modal-content">
              <h3>Visit Request Submitted</h3>
              <p>
                Your booking request has been sent. Our agent will contact you
                soon.
              </p>
              <button onClick={() => setShowSuccess(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Property Header */}
        <div className="property-header">
          <img src={image} alt={title} className="property-header-image" />

          <div className="property-header-info">
            <h2>
              {title || "Property Visit"}{" "}
              <div className="property-meta-inline">
                <div className="meta-item">
                  <Home size={16} />
                  <span>{type}</span>
                </div>
                <div className="meta-item">
                  <Tag size={16} />
                  <span>Sale</span>
                </div>
              </div>
            </h2>

            {agent && (
              <p>
                <span className="agent-label">Agent:</span> {agent.name} —{" "}
                {agent.agency}
              </p>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <h3 className="form-title">Book a Visit</h3>

          <div className="floating-container">
            <label className="floating-label">Select a Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="floating-input"
            />
          </div>

          <div className="floating-container">
            <label className="floating-label">Select a Time</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="floating-input"
            />
          </div>

          <button type="submit" className="submit-btn">
            Confirm Booking
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
