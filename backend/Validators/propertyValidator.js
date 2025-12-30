const { check } = require("express-validator");

const createPropertyValidator = [
    check("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),

    check("price")
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number"),

    check("area")
        .notEmpty().withMessage("Area is required")
        .isNumeric().withMessage("Area must be a number"),

    check("city")
        .notEmpty().withMessage("City is required"),

    check("region")
        .notEmpty().withMessage("Region is required"),

    check("type")
        .notEmpty().withMessage("Property type is required")
        .isIn(["Apartment", "House", "Villa", "Land", "Studio"])
        .withMessage("Invalid property type"),

    check("isSold")
        .optional()
        .isBoolean().withMessage("isSold must be true or false"),

    check("image").notEmpty().withMessage("Main image is required"),
];

module.exports = { createPropertyValidator };
