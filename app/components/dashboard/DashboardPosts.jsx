"use client"; // Ensure it runs only on the client side
import axiosInstance from "@/lib/axios/axiosInstance";
import { useEffect, useState } from "react";

export default function DashboardPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("api/posts");
        setPosts(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Dashboard Posts</h2>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
              <p>{post.content}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
