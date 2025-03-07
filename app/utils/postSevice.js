import axiosInstance from "@/lib/axios/axiosInstance";

export const postService = {
  // Fetch all posts
  getAllPosts: async () => {
    try {
      const response = await axiosInstance.get("/api/posts");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  },

  // Fetch posts by author ID
  getPostsByAuthorId: async (authorId) => {
    try {
      const response = await axiosInstance.get(`/api/posts/author/${authorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts by author:", error);
      return [];
    }
  },

  // Fetch a single post by ID
  getPostById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  },

  // Create a new post (with optional image/video)
  createPost: async (authorId, postData, image, video) => {
    try {
      const formData = new FormData();
      formData.append("authorId", authorId);
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

      const response = await axiosInstance.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      return null;
    }
  },
  // Update an existing post (with optional new image/video)
  updatePost: async (id, updatedData, imageFile = null, videoFile = null) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("content", updatedData.content);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (videoFile) {
        formData.append("video", videoFile);
      }

      const response = await axiosInstance.put(`/api/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error);
      return null;
    }
  },

  // Delete a post
  deletePost: async (id) => {
    try {
      await axiosInstance.delete(`/api/posts/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error);
      return false;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/api/users/${id}`, userData, {
        headers: {
          "Content-Type": "application/json", // Ensure JSON request
        },
      });
      return response.data; // Return the updated user data
    } catch (error) {
      console.error("Error Updating User:", error.response?.data || error);
      return false;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/users/${id}`);
      return response.status === 200; // Ensure it returns true only on success
    } catch (error) {
      console.error("Error deleting User:", error.response?.data || error);
      return false;
    }
  },
};

export default postService;
