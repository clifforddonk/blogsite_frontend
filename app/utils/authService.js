import axiosInstance from "@/lib/axios/axiosInstance";
import { redirect } from "next/navigation";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    console.log("Register Response:", response.data); // Debugging

    return response.data; // This will contain "User registered successfully!"
  } catch (error) {
    const errorMessage = error.response?.data || "Registration failed!";
    console.error("Registration Error:", errorMessage);
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

    console.log("Login Response:", response.data); // Debugging

    if (!response.data || !response.data.token) {
      throw new Error("Invalid response from server!");
    }

    localStorage.setItem("token", response.data.token); // Store token safely

    return response.data.message; // Return "Login successful!"
  } catch (error) {
    const errorMessage = error.response?.data || "Login failed!";
    console.error("Login Error:", errorMessage);
    throw errorMessage; // Throw correct error
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users");
    return response.data; // Returns an array of users
  } catch (error) {
    console.error("Fetch Users Error:", error.response?.data || error.message);
    throw error.response?.data || "Failed to fetch users.";
  }
};

export const getFilteredUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Session Expired, redirecting...");
      window.location.href = "/auth/login";
    }

    const userEmail = JSON.parse(atob(token.split(".")[1])).sub; // Decode JWT (assuming sub=email)
    const allUsers = await getAllUsers(); // Fetch all users

    // Find the user object by matching email
    const userObject = allUsers.find((user) => user.email === userEmail);

    if (!userObject) {
      console.error("User not found in database!");
      return null;
    }

    console.log("Logged-in User Details:", userObject);
    return userObject; // Now you have the full user object, including the ID
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
// Logout user
