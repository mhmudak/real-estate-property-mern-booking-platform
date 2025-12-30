import { useState } from "react";
import "./Calendar.css";

export default function Calendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayIndex = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const goPrev = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const goNext = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  const isPastDate = (day) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  return (
    <div className="calendar-container">

      {/* MONTH HEADER */}
      <div className="calendar-header">
        <button className="nav-btn" onClick={goPrev}>‹</button>
        <h3>{monthLabel}</h3>
        <button className="nav-btn" onClick={goNext}>›</button>
      </div>

      {/* WEEKDAYS */}
      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="calendar-grid">
        {/* Empty cells before 1st day */}
        {[...Array(firstDayIndex)].map((_, i) => (
          <div key={"e" + i} className="calendar-empty"></div>
        ))}

        {/* Actual days */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const formattedDate =
            `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const isSelected = formattedDate === selectedDate;
          const disabled = isPastDate(day);

          return (
            <button
              key={day}
              className={`calendar-day 
                ${isSelected ? "selected" : ""} 
                ${disabled ? "disabled" : ""}`}
              disabled={disabled}
              onClick={() => onSelectDate(formattedDate)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
