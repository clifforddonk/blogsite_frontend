"use client";
import { useState, useEffect } from "react";
import postService from "@/app/utils/postSevice";
import {
  FileText,
  Calendar,
  User,
  Image,
  Video,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function DashboardPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        // Sort posts by date (newest first) if they have dates
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        setPosts(sortedPosts);
        console.log("Fetched posts:", sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time since post
  const getTimeSince = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
  };

  // Truncate content for cards
  const truncateContent = (content, maxLength = 150) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  // Get author information
  const getAuthorInfo = (post) => {
    // Prioritize post.author.username as requested
    if (post.author && post.author.username) {
      return post.author.username;
    } else {
      return "Unknown author";
    }
  };

  // Get author avatar
  const getAuthorAvatar = (post) => {
    // Updated to prioritize matching structure with username
    if (post.author && post.author.avatar) {
      return post.author.avatar;
    } else {
      // Return null to use the default avatar
      return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <FileText className="mr-2" /> Blog Posts
        </h2>
        <div className="text-gray-500">
          {!loading && (
            <span>
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-500">Loading your posts...</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              {/* Author Badge - Top Left */}
              <div className="absolute top-4 left-4 z-10 flex items-center">
                <div className="flex items-center bg-white bg-opacity-90 px-3 py-1 rounded-full shadow-md">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
                    {getAuthorAvatar(post) ? (
                      <img
                        src={getAuthorAvatar(post)}
                        alt="Author"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <User size={14} className="text-gray-500" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-800 truncate max-w-[100px]">
                    {getAuthorInfo(post)}
                  </span>
                </div>
              </div>

              {/* Post Image/Video Thumbnail */}
              <div className="relative bg-gray-100 h-48 overflow-hidden">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", post.imageUrl);
                      e.target.src =
                        "https://via.placeholder.com/400x200?text=Image+Unavailable";
                      e.target.alt = "Image unavailable";
                    }}
                  />
                ) : post.videoUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-gray-800">
                    <Video size={48} className="text-white opacity-70" />
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      VIDEO
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-r from-gray-100 to-gray-200">
                    <FileText size={48} className="text-gray-400" />
                  </div>
                )}

                {/* Time badge */}
                {post.createdAt && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock size={12} className="mr-1" />
                    {getTimeSince(post.createdAt)}
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {truncateContent(post.content)}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {post.createdAt ? formatDate(post.createdAt) : "No date"}
                  </div>

                  <div className="flex items-center">
                    {post.comments && (
                      <div className="text-sm text-gray-500 flex items-center mr-3">
                        <MessageCircle size={14} className="mr-1" />
                        {post.comments.length || 0}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {post.imageUrl && (
                        <span className="flex items-center text-xs text-gray-500">
                          <Image size={12} className="mr-1" />
                        </span>
                      )}
                      {post.videoUrl && (
                        <span className="flex items-center text-xs text-gray-500">
                          <Video size={12} className="mr-1" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Post Controls */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    className="w-full px-3 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded font-medium transition-colors"
                    onClick={() => setSelectedPost(post)}
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No Posts Available
          </h3>
          <p className="text-gray-500">
            Your posts will appear here once you create them.
          </p>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedPost.title}
                </h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Author info in modal */}
              <div className="flex items-center mb-6 bg-gray-50 p-3 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                  {getAuthorAvatar(selectedPost) ? (
                    <img
                      src={getAuthorAvatar(selectedPost)}
                      alt="Author"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <User size={20} className="text-gray-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {getAuthorInfo(selectedPost)}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {selectedPost.createdAt
                      ? formatDate(selectedPost.createdAt)
                      : "No date"}
                    {selectedPost.createdAt && (
                      <span className="ml-2 text-gray-400">
                        ({getTimeSince(selectedPost.createdAt)})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="whitespace-pre-line">{selectedPost.content}</p>
              </div>

              {/* Display Cloudinary Image */}
              {selectedPost.imageUrl && (
                <div className="mt-6">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-auto rounded-md shadow-md"
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        selectedPost.imageUrl
                      );
                      e.target.src =
                        "https://via.placeholder.com/800x400?text=Image+Unavailable";
                      e.target.alt = "Image unavailable";
                    }}
                  />
                </div>
              )}

              {/* Display Cloudinary Video */}
              {selectedPost.videoUrl && (
                <div className="mt-6">
                  <video
                    controls
                    className="w-full rounded-md shadow-md"
                    poster="https://via.placeholder.com/800x400?text=Video+Thumbnail"
                  >
                    <source src={selectedPost.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
