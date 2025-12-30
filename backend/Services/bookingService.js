const Booking = require("../Models/Booking");
const Property = require("../Models/Property");
const User = require("../Models/User");
const { DateTime } = require("luxon");

// Convert local → UTC
function convertLocalToUTC(localDate, localTime, timezone) {
  const dt = DateTime.fromISO(`${localDate}T${localTime}`, { zone: timezone });

  if (!dt.isValid) throw new Error("Invalid date or time format");

  return dt.toUTC().toJSDate();
}

async function createBooking({ userId, propertyId, localDate, localTime, timezone }) {

  // Validate property
  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found");

  // Validate user
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Check if slot already booked
  const exists = await Booking.findOne({ propertyId, userId });
  if (exists) throw new Error("You can only book 1 Appointment per property.");

  // Convert to UTC
  const utcDateTime = convertLocalToUTC(localDate, localTime, timezone);

  return await Booking.create({
    userId,
    propertyId,
    localDate,
    localTime,
    timezone,
    utcDateTime
  });
}

async function getBookedSlots(propertyId, localDate) {
  const bookings = await Booking.find({ propertyId, localDate }).select("localTime");
  return bookings.map((b) => b.localTime);
}

module.exports = {
  createBooking,
  getBookedSlots
};
