const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },

    localDate: {
      type: String,  // "2025-01-10"
      required: true
    },

    localTime: {
      type: String,  // "14:30"
      required: true
    },

    timezone: {
      type: String,
      default: "UTC"
    },

    utcDateTime: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },

    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

// Prevent double booking for same slot
bookingSchema.index(
  { propertyId: 1, localDate: 1, localTime: 1 },
  { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
