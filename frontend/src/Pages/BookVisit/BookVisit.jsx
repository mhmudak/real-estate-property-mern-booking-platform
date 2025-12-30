/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Calendar from "../../components/Calendar/Calendar";
import TimeSlots from "../../components/TimeSlots/TimeSlots";
import "./BookVisit.css";
import { Tag, Home } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookVisit() {
  // ---- Get Property Details from Navigation ----
  const location = useLocation();
  const { id: propertyId, title, image, agent, type } = location.state || {};

  // ---- States ----
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // ---- Submit Booking ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      window.openAuthPopup?.(); // 👈 open Header AuthPopup
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/bookings/create",
        {
          propertyId,
          localDate: selectedDate,
          localTime: selectedTime,
          timezone,
        },
        {
          withCredentials: true, // cookies/JWT
        }
      );

      console.log("Booking created:", res.data);
      setError("");
      setShowSuccess(true);
      setSelectedTime("");
      setSelectedDate("");
    } catch (err) {
      if (err.response?.status === 401) {
        window.openAuthPopup?.();
        return;
      }

      toast.error(
        err.response?.data?.message || "Booking failed. Please try again."
      );

      if (err.res && err.res.data && err.res.data.errors) {
        setError(err.res.data.errors[0].msg);
      } else {
        setError(err.res?.data?.message || "Booking failed. Please try again.");
        console.log("Errors:", err);
        // toast.error(err?.response?.data?.message || "You have already booked!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="bookvisit-page">
        {/* -------- SUCCESS MODAL -------- */}
        {showSuccess && (
          <div className="success-modal">
            <div className="modal-content animate">
              <h3>Visit Request Submitted</h3>
              <p>
                Your booking request has been sent. The agent will contact you
                soon.
              </p>
              <button onClick={() => setShowSuccess(false)}>Close</button>
            </div>
          </div>
        )}

        {/* -------- PROPERTY HEADER -------- */}
        <div className="property-header">
          <img src={image} alt={title} className="property-header-image" />

          <div className="property-header-info">
            <h2>
              {title}
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

        {/* -------- BOOKING FORM -------- */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <h3 className="form-title">Book a Visit</h3>

          {/* ---- DATE CALENDAR ---- */}

          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedTime(""); // reset time when changing date
            }}
          />

          {/* ---- TIME SLOTS ---- */}
          {selectedDate && (
            <>
              <TimeSlots
                propertyId={propertyId}
                selectedDate={selectedDate}
                onSelect={(time) => setSelectedTime(time)}
              />
            </>
          )}

          {/* ---- CONFIRM BTN ---- */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
