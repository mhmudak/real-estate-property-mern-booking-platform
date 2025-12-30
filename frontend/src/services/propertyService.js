import api from "./api";  // axios instance

// Get all properties
export const getAllProperties = async () => {
  return await api.get("/properties");
};

// Get property by ID
export const getPropertyById = async (id) => {
  return await api.get(`/properties/${id}`);
};
