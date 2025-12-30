const Property = require("../Models/Property");

const createProperty = async (propertyData) => {
    try {
        const newProperty = await Property.create(propertyData);
        return newProperty;
    } catch (err) {
        throw err;
    }
}


// FILTER ONLY ALLOWED FIELDS
function filterFields(body, allowed) {
    const cleaned = {};
    allowed.forEach(key => {
        if (body[key] !== undefined) cleaned[key] = body[key];
    });
    return cleaned;
}

const updateProperty = async (
    propertyId, title, description, price, area, region, city, type, isSold, yearBuilt,
    bedrooms, bathrooms, floor, parking, view, balcony, negotiable, heating, cooling, amenities,
    tags, image, images, agent
) => {
    try {
        const updateFields = {};

        // Required / common fields
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (area) updateFields.area = area;
        if (region) updateFields.region = region;
        if (city) updateFields.city = city;
        if (type) updateFields.type = type;

        // Numbers / optional
        if (yearBuilt !== undefined) updateFields.yearBuilt = yearBuilt;
        if (bedrooms !== undefined) updateFields.bedrooms = bedrooms;
        if (bathrooms !== undefined) updateFields.bathrooms = bathrooms;
        if (floor !== undefined) updateFields.floor = floor;
        if (parking !== undefined) updateFields.parking = parking;

        // Boolean fields
        if (balcony !== undefined) updateFields.balcony = balcony;
        if (negotiable !== undefined) updateFields.negotiable = negotiable;
        if (isSold !== undefined) updateFields.isSold = isSold;

        // Strings
        if (heating !== undefined) updateFields.heating = heating;
        if (cooling !== undefined) updateFields.cooling = cooling;
        if (view !== undefined) updateFields.view = view;

        // Arrays
        if (Array.isArray(amenities)) updateFields.amenities = amenities;
        if (Array.isArray(tags)) updateFields.tags = tags;

        // Image fields
        if (image !== undefined) updateFields.image = image;
        if (Array.isArray(images)) updateFields.images = images;

        // agent (object)
        if (agent !== undefined) updateFields.agent = agent;

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            updateFields,
            { new: true }); // return updated property

        if (!updatedProperty) throw new Error("Property not found");

        return updatedProperty;
    } catch (error) {
        throw error;
    }
};

const getPropertyById = async (id) => {
    try {
        const property = await Property.findById(id);
        if (!property) throw new Error("Property not found");
        return property;
    } catch (err) {
        throw err;
    }
}

const getProperties = async () => {
    try {
        const properties = await Property.find();
        return properties;
    } catch (err) {
        throw err;
    }
}

const deleteProperty = async (propertyId) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(propertyId);
        if (!deletedProperty) throw new Error("Property not found!");
        return deletedProperty;
    } catch (err) {
        throw err;
    }
}

const getPropertiesByType = async (type) => {
    try {
        const properties = await Property.find({ type: { $regex: type, $options: 'i' }});
        return properties;
    } catch (error) {
        throw error;
    }
}

// ADVANCED FILTER - Multiple conditions
const filterProperties = async (type, minPrice, maxPrice, searchTerm, minBeds, maxBeds, sold, city) => {
    try {
        const query = {};

        // type (exact match)
        if (type) query.type = type;

        // city (exact match)
        if (city) query.city = city;

        // sold (boolean from query string)
        // /api/properties?sold=true
        if (sold !== undefined) {
            if (sold === "true") query.sold = true;
            if (sold === "false") query.sold = false;
        }

        // price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // beds range
        if (minBeds || maxBeds) {
            query.beds = {};
            if (minBeds) query.beds.$gte = Number(minBeds);
            if (maxBeds) query.beds.$lte = Number(maxBeds);
        }


        // search (title OR city OR description) - case-insensitive
        if (searchTerm) {
            query.$or = [
                { title: { $regex: searchTerm, $options: "i" } },
                { city: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } },
            ];
        }

        const properties = await Property.find(query);
        return properties;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProperty,
    getPropertyById,
    getProperties,
    updateProperty,
    deleteProperty,
    filterProperties,
    getPropertiesByType
}