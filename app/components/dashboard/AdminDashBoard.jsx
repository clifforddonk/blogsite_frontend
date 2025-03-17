"use client";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../utils/authService";
import postService from "@/app/utils/postSevice";
import {
  FileText,
  Calendar,
  User,
  Image,
  Video,
  Clock,
  MessageCircle,
  ChevronRight,
  X,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashBoard() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);

        const response = await postService.getAllPosts();
        // Sort posts by date (newest first) if they have dates
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        setPosts(sortedPosts);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndUsers();
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

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const Modal = ({
    title,
    message,
    isOpen,
    onClose,
    onConfirm,
    confirmText,
    cancelText,
    isLoading,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md"
              disabled={isLoading}
            >
              {cancelText || "Cancel"}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                confirmText || "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeletePost = async (id) => {
    setIsDeleting(true);
    const response = await postService.deletePost(id);

    // Close delete confirmation modal
    setDeleteModalOpen(false);

    // Show success message
    setModalMessage("Post deleted successfully");
    setSuccessModalOpen(true);

    // Wait a moment so user can see the success message
    setTimeout(() => {
      window.location.reload();
    }, 200);

    setIsDeleting(false);
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Content Management
            </h1>
            <Link href="/dashboard/create-post">
              <button className="px-4 py-2 bg-indigo-600 hover:cursor-pointer text-white rounded-md hover:bg-indigo-700 transition font-medium shadow-sm">
                New Post
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full sm:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className={`px-3 py-2 ${
                    viewMode === "grid"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-white text-gray-600"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  className={`px-3 py-2 ${
                    viewMode === "list"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-white text-gray-600"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Posts</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.length}
                </h3>
              </div>
              <div className="p-2 bg-indigo-100 rounded-md">
                <FileText className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {users?.length}
                </h3>
                <Link
                  href="/dashboard/admin/users"
                  className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View all users
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="p-2 bg-indigo-100 rounded-md">
                <User size={20} className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">With Media</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {
                    posts.filter((post) => post.imageUrl || post.videoUrl)
                      .length
                  }
                </h3>
              </div>
              <div className="p-2 bg-emerald-100 rounded-md">
                <Image className="text-emerald-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Post List or Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40 bg-white">
            <div className="text-center p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                {/* Animated circles */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 bg-blue-500 rounded-full mx-1 opacity-75"
                    style={{
                      animation: `bounce 1.4s infinite ease-in-out both`,
                      animationDelay: `${i * 0.16}s`,
                    }}
                  />
                ))}
              </div>
              <div className="text-gray-500 font-medium">
                Loading Your Content...
              </div>
            </div>
          </div>
        ) : filteredPosts.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                >
                  {/* Post Image/Video Thumbnail */}
                  <div className="relative h-40 bg-gray-100 overflow-hidden">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x200?text=Image+Unavailable";
                        }}
                      />
                    ) : post.videoUrl ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-gray-800">
                        <Video size={40} className="text-white opacity-70" />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
                          VIDEO
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-r from-indigo-50 to-indigo-100">
                        <FileText size={40} className="text-indigo-300" />
                      </div>
                    )}

                    {/* Author Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="flex items-center bg-white rounded-full shadow-sm px-2 py-1">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-1">
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
                            <User size={12} className="text-gray-500" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-800 truncate max-w-[80px]">
                          {getAuthorInfo(post)}
                        </span>
                      </div>
                    </div>

                    {/* Time badge */}
                    {post.createdAt && (
                      <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-75 text-white text-xs px-2 py-1 rounded-sm flex items-center">
                        <Clock size={10} className="mr-1" />
                        {getTimeSince(post.createdAt)}
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {truncateContent(post.content, 120)}
                    </p>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {post.createdAt
                          ? formatDate(post.createdAt)
                          : "No date"}
                      </div>

                      <button
                        className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
                        onClick={() => setSelectedPost(post)}
                      >
                        View
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Content
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Media
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded overflow-hidden">
                            {post.imageUrl ? (
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="h-10 w-10 object-cover"
                              />
                            ) : post.videoUrl ? (
                              <div className="h-10 w-10 flex items-center justify-center bg-gray-800">
                                <Video size={16} className="text-white" />
                              </div>
                            ) : (
                              <div className="h-10 w-10 flex items-center justify-center bg-indigo-100">
                                <FileText
                                  size={16}
                                  className="text-indigo-400"
                                />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">
                              {post.title}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                              {truncateContent(post.content, 60)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {getAuthorAvatar(post) ? (
                              <img
                                src={getAuthorAvatar(post)}
                                alt=""
                                className="h-8 w-8 object-cover"
                              />
                            ) : (
                              <User size={14} className="text-gray-500" />
                            )}
                          </div>
                          <div className="ml-2 text-sm text-gray-900">
                            {getAuthorInfo(post)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">
                          {post.createdAt
                            ? formatDate(post.createdAt)
                            : "Unknown"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {post.createdAt ? getTimeSince(post.createdAt) : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-1">
                          {post.imageUrl && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <Image size={10} className="mr-1" />
                              IMG
                            </span>
                          )}
                          {post.videoUrl && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              <Video size={10} className="mr-1" />
                              VID
                            </span>
                          )}
                          {!post.imageUrl && !post.videoUrl && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              <FileText size={10} className="mr-1" />
                              TEXT
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Posts Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm
                ? `We couldn't find any posts matching "${searchTerm}". Try adjusting your search term.`
                : "Your posts will appear here once you create them."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-900 truncate max-w-xl">
                {selectedPost.title}
              </h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              {/* Author info in modal */}
              <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4 border-2 border-white shadow">
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
                    <User size={24} className="text-gray-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {getAuthorInfo(selectedPost)}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
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
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>

              {/* Display Cloudinary Image */}
              {selectedPost.imageUrl && (
                <div className="mt-6 bg-gray-50 p-2 rounded-lg">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-auto rounded-md shadow-sm"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x400?text=Image+Unavailable";
                    }}
                  />
                </div>
              )}

              {/* Display Cloudinary Video */}
              {selectedPost.videoUrl && (
                <div className="mt-6 bg-gray-50 p-2 rounded-lg">
                  <video
                    controls
                    className="w-full rounded-md shadow-sm"
                    poster="https://via.placeholder.com/800x400?text=Video+Thumbnail"
                  >
                    <source src={selectedPost.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 sticky bottom-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {selectedPost.comments && (
                    <div className="text-sm text-gray-600 flex items-center mr-4">
                      <MessageCircle size={16} className="mr-1" />
                      {selectedPost.comments.length || 0} Comments
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    className="px-4 py-2 border bg-red-500 border-gray-300 text-white rounded-md cursor-pointer transition"
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                  >
                    Close
                  </button>
                </div>
                <Modal
                  title="Delete Post"
                  message="Are you sure you want to delete this post? This action cannot be undone."
                  isOpen={deleteModalOpen}
                  onClose={() => setDeleteModalOpen(false)}
                  onConfirm={() => handleDeletePost(selectedPost?.id)}
                  confirmText="Delete Post"
                  cancelText="Cancel"
                  isLoading={isDeleting}
                />
                <Modal
                  title="Notification"
                  message={modalMessage}
                  isOpen={successModalOpen}
                  onClose={() => setSuccessModalOpen(false)}
                  onConfirm={() => setSuccessModalOpen(false)}
                  confirmText="OK"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
