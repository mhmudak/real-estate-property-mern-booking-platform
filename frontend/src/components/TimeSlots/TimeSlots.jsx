import React, { useState, useEffect } from "react";
import { generateTimeSlots } from "../../utils/timeSlots";
import "./TimeSlots.css";
import axios from "axios";

export default function TimeSlots({ propertyId, selectedDate, onSelect }) {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (!selectedDate) return;

    // 1. Generate time slots
    setSlots(generateTimeSlots(9, 19));

    // 2. Fetch booked slots from backend
    const fetchBooked = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bookings/booked/${propertyId}/${selectedDate}`
        );

        setBookedSlots(response.data.bookedSlots || []);
      } catch (err) {
        setBookedSlots([]);
        console.log("Hiii", err);
      }
    };

    fetchBooked();
  }, [selectedDate, propertyId]);

  const handleSelectSlot = (slot) => {
    if (bookedSlots.includes(slot)) return;

    setSelectedSlot(slot);
    onSelect(slot); // send to parent (BookVisit)
  };

  return (
    <div className="slots-container">
      <h3 className="slots-title">Available Time Slots</h3>

      <div className="slots-row">
        {slots.map((slot) => {
          const isDisabled = bookedSlots.includes(slot);

          return (
            <button
              key={slot}
              className={
                `slot-btn ` +
                (selectedSlot === slot ? "selected " : "") +
                (isDisabled ? "disabled " : "")
              }
              onClick={() => handleSelectSlot(slot)}
              disabled={isDisabled}
              type="button"
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
