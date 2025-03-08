import axiosInstance from "@/lib/axios/axiosInstance";
import { redirect } from "next/navigation";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);

    return response.data; // This will contain "User registered successfully!"
  } catch (error) {
    const errorMessage = error.response?.data || "Registration failed!";
    throw errorMessage; // Throw the correct error message
  }
};

// Login a user
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (!response.data || !response.data.token) {
      throw new Error("Invalid response from server!");
    }

    localStorage.setItem("token", response.data.token); // Store token safely

    return response.data.message; // Return "Login successful!"
  } catch (error) {
    const errorMessage = error.response?.data || "Login failed!";
    throw errorMessage; // Throw correct error
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users");
    return response.data; // Returns an array of users
  } catch (error) {
    throw error.response?.data || "Failed to fetch users.";
  }
};

export const getFilteredUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
    }

    const userEmail = JSON.parse(atob(token.split(".")[1])).sub; // Decode JWT (assuming sub=email)
    const allUsers = await getAllUsers(); // Fetch all users

    // Find the user object by matching email
    const userObject = allUsers.find((user) => user.email === userEmail);

    if (!userObject) {
      return null;
    }

    return userObject; // Now you have the full user object, including the ID
  } catch (error) {
    return null;
  }
};
// Logout user
