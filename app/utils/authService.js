import axiosInstance from "@/lib/axios/axiosInstance";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    console.log("Register Response:", response.data); // Debugging
    return response.data;
  } catch (error) {
    // Extract a meaningful error message
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Registration failed!";

    console.error("Registration Error:", errorMessage);
    throw errorMessage; // Throw a string instead of an error object
  }
};

// Login a user
export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    console.log("Login Response:", response.data.message); // Debugging

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store token safely
    } else {
      throw new Error("Invalid token received from server!");
    }

    return response.data;
  } catch (error) {
    // Extract a meaningful error message
    const errorMessage =
      error.response?.data?.message ||
      console.error("Login Error:", errorMessage);
    throw errorMessage; // Throw a string instead of an error object
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
};
