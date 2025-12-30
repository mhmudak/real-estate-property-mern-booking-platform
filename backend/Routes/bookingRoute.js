const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authentication");

const {
    createBookingController,
    getBookingByIdController,
    getBookingsController,
    updateBookingController,
    deleteBookingController,
    getBookedSlotsController,
} = require("../Controllers/bookingController");



// ROUTES
router.post("/create", authenticateToken, createBookingController); // create booking (protected)
router.get("/booked/:propertyId/:date", getBookedSlotsController);
// router.get("/:id", authenticateToken, getBookingByIdController);
// router.put("/:id", authenticateToken, updateBookingController);
// router.delete("/:id", authenticateToken, deleteBookingController);

module.exports = router;