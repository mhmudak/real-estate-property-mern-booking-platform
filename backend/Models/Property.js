const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    type: {
        type: String, // ENUM
        enum: ["Apartment", "Villa", "Land", "House", "Studio", "Chalet & cabin"],
        required: true
    },
    isSold: {
        type: Boolean,
        required: true,
        default: false
    },
    yearBuilt: {
        type: Number,
        required: true
    },
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    floor: {type: Number, required: true},
    parking: {type: Number, required: true},

    balcony: {type: Boolean, default: false},
    negotiable: {type: Boolean, default: false},

    heating: { type: String, required: true},
    cooling: {type: String, required: true},
    view: {type: String, required: true},

    amenities: {
        type: [String],
        default: []
    },

    tags: {
        type: [String],
        default: []
    },

    // Main thumbnail image
    image: {
        type: String,
        required: true
    },

    // Array of images
    images: {
        type: [String],
        default: []
    },

    // Agent info as an embedded document
    agent: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: false },
      agency: { type: String, required: false },
    },
}, { timestamps: true }); // Adds createAt, updateAt

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;