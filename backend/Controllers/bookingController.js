const { createBooking, getBookedSlots } = require("../Services/bookingService");

exports.createBookingController = async (req, res) => {
  try {
    const { propertyId, localDate, localTime, timezone } = req.body;

    const booking = await createBooking({
      userId: req.user.id,
      propertyId,
      localDate,
      localTime,
      timezone
    });

    res.status(201).json({ success: true, booking });

  } catch (err) {
    const status = err.message.includes("not") || err.message.includes("slot")
      ? 400
      : 500;

    res.status(status).json({
      success: false,
      message: err.message
    });
  }
};

exports.getBookedSlotsController = async (req, res) => {
  try {
    const { propertyId, date } = req.params;

    const bookedSlots = await getBookedSlots(propertyId, date);

    res.json({ success: true, bookedSlots });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
