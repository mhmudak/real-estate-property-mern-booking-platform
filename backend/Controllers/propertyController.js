const { validationResult } = require("express-validator");
const { createProperty, getPropertyById, getProperties, updateProperty, deleteProperty, filterProperties, getPropertiesByType } = require("../Services/propertyService");
const Property = require("../Models/Property");
const createPropertyController = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
                message: "Validation Error"
            });
        }

        const {
            title, description, price, area, region, city, type, isSold, yearBuilt,
            bedrooms, bathrooms, floor, parking, view, balcony, negotiable, heating, cooling, amenities,
            tags, image, images, agent
        } = req.body;

        const newProperty = await createProperty(
            {
                title, description, price, area, region, city, type, isSold, yearBuilt,
                bedrooms, bathrooms, floor, parking, view, balcony, negotiable, heating, cooling, amenities,
                tags, image, images, agent
            }
        );

        res.status(201).json({
            success: true,
            data: newProperty,
            message: "Property Created Successfully!"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error!"
        });
    }
}

const getPropertyByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await getPropertyById(id);

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (err) {
        if (err.message === "Property not found") {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }

        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error."
        });
    }
}

const getPropertiesController = async (req, res) => {
    try {
        const properties = await getProperties();

        res.status(200).json({
            success: true,
            data: properties,
            message: "Properties got Successfully!"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error"
        });
    }
}


const updatePropertyController = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title, description, price, area, region, city, type, isSold, yearBuilt,
            bedrooms, bathrooms, floor, parking, view, balcony, negotiable, heating, cooling, amenities,
            tags, image, images, agent
        } = req.body;

        const updatedProperty = await updateProperty(
            id, title, description, price, area, region, city, type, isSold, yearBuilt,
            bedrooms, bathrooms, floor, parking, view, balcony, negotiable, heating, cooling, amenities,
            tags, image, images, agent
        );
        res.status(200).json({
            success: true,
            data: updatedProperty,
            message: "Property Updated Successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

const deletePropertyController = async (req, res) => {
    try {
        const deletedproperty = await deleteProperty(req.params.id);
        res.status(200).json({
            success: true,
            data: deletedproperty,
            message: "Property Data deleted Successfully!"
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        });
    }
}

// Filtering

const getPropertiesByTypeController = async (req, res) => {
    try {
        const { type } = req.query;

        if(!type){
            return res.status(400).json({
                success: false,
                message: "Property type is required"
            });
        }

        const properties = await getPropertiesByType(type);

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties,
            message: "Properties filtered by type."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


// GET /api/properties?type=&minPrice=&maxPrice=&searchTerm=&minBeds=&maxBeds=&sale=&city=
const filterPropertiesController = async (req, res) => {
    try {
        const { type, minPrice, maxPrice, searchTerm, minBeds, maxBeds, sold, city } = req.query;

        const properties = await filterProperties(type, minPrice, maxPrice, searchTerm, minBeds, maxBeds, sold, city);

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createPropertyController,
    getPropertyByIdController,
    getPropertiesController,
    updatePropertyController,
    deletePropertyController,
    filterPropertiesController,
    getPropertiesByTypeController
}