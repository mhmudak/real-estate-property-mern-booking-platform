const { check } = require("express-validator");

const bookingValidator = [
    check("propertyId")
        .notEmpty()
        .withMessage("Property ID is required"),

    check("date")
        .notEmpty()
        .withMessage("Date is required"),

    check("time")
        .notEmpty()
        .withMessage("Time is required"),
];

module.exports = { bookingValidator };
