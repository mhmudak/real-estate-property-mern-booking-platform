import api from "./api";  // axios instance

export const signupService = async (data) => {
  return await api.post("/users/signup", data);
};

export const loginService = async (data) => {
  return await api.post("/users/login", data);
};
