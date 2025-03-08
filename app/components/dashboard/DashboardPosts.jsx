"use client";
import { useState, useEffect } from "react";
import postService from "@/app/utils/postSevice";
import { getFilteredUsers } from "@/app/utils/authService";
import {
  FileText,
  Calendar,
  User,
  Image,
  Video,
  Clock,
  MessageCircle,
  Share2,
  ThumbsUp,
  Bookmark,
  Search,
  X,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

export default function UserPostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const userObject = await getFilteredUsers();
        setCurrentUser(userObject);

        const response = await postService.getAllPosts();
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, []);

  const getFilteredPosts = () => {
    let filtered = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeFilter === "my" && currentUser) {
      filtered = filtered.filter((post) => {
        if (post.author.id && currentUser?.id) {
          return post.author.id === currentUser?.id;
        }
        return false;
      });
    }

    return filtered;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const truncateContent = (content, maxLength = 250) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  const getAuthorInfo = (post) => {
    if (post.author && post.author.username) {
      return post.author.username;
    } else {
      return "Unknown author";
    }
  };

  const getAuthorAvatar = (post) => {
    if (post.author && post.author.avatar) {
      return post.author.avatar;
    } else {
      return null;
    }
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <h1 className="text-xl font-semibold text-gray-900">My Feed</h1>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-full w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white">
                <Link href="/dashboard/create-post">New Post</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="bg-white border-b border-gray-200 sm:hidden">
        <div className="max-w-3xl mx-auto px-4 py-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <div className="flex justify-center sm:justify-start space-x-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setActiveFilter("my")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeFilter === "my"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              My Posts
            </button>
          </div>
        </div>

        {/* Create Post Button */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
              <User size={20} className="text-gray-500" />
            </div>
            <button className="flex-1 text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 text-sm">
              Start a post...
            </button>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
            <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
              <Image size={16} className="mr-2 text-blue-500" />
              Photo
            </button>
            <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
              <Video size={16} className="mr-2 text-green-500" />
              Video
            </button>
            <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
              <Calendar size={16} className="mr-2 text-amber-500" />
              Event
            </button>
            <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
              <FileText size={16} className="mr-2 text-red-500" />
              Article
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500 text-sm">Loading posts...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
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
                          <User size={24} className="text-gray-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {getAuthorInfo(post)}
                          {post.author.id === currentUser.id && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          {post.createdAt ? getTimeSince(post.createdAt) : ""}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  {/* Post Title */}
                  <h3
                    className="text-lg font-semibold text-gray-900 mt-3 cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.title}
                  </h3>
                </div>

                {/* Post Content Preview */}
                <div
                  className="px-4 pb-1 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <p className="text-gray-600 whitespace-pre-line">
                    {truncateContent(post.content)}
                    {post.content && post.content.length > 250 && (
                      <span className="text-blue-600 font-medium cursor-pointer ml-1">
                        See more
                      </span>
                    )}
                  </p>
                </div>

                {/* Post Media */}
                {(post.imageUrl || post.videoUrl) && (
                  <div
                    className="mt-2 cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-auto object-cover max-h-96"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/800x400?text=Image+Unavailable";
                        }}
                      />
                    ) : (
                      post.videoUrl && (
                        <div className="relative w-full">
                          <video
                            className="w-full h-auto max-h-96"
                            poster="https://via.placeholder.com/800x400?text=Video+Thumbnail"
                          >
                            <source src={post.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-3">
                              <svg
                                className="w-10 h-10 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="px-4 py-1 mt-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="flex -space-x-1 mr-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center border border-white">
                          <ThumbsUp size={10} className="text-blue-600" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center border border-white">
                          ❤️
                        </div>
                      </div>
                      {Math.floor(Math.random() * 100) + 1} likes
                    </div>
                    <div>
                      {post.comments && post.comments.length > 0 ? (
                        <span>{post.comments.length} comments</span>
                      ) : (
                        <span>{Math.floor(Math.random() * 20)} comments</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-2 py-1 border-t border-gray-100">
                  <div className="flex justify-between">
                    <button className="flex items-center justify-center py-2 px-3 hover:bg-gray-100 rounded-md flex-1 text-gray-600 text-sm">
                      <ThumbsUp size={18} className="mr-2" />
                      Like
                    </button>
                    <button
                      className="flex items-center justify-center py-2 px-3 hover:bg-gray-100 rounded-md flex-1 text-gray-600 text-sm"
                      onClick={() => setSelectedPost(post)}
                    >
                      <MessageCircle size={18} className="mr-2" />
                      Comment
                    </button>
                    <button className="flex items-center justify-center py-2 px-3 hover:bg-gray-100 rounded-md flex-1 text-gray-600 text-sm">
                      <Share2 size={18} className="mr-2" />
                      Share
                    </button>
                    <button className="flex items-center justify-center py-2 px-3 hover:bg-gray-100 rounded-md flex-1 text-gray-600 text-sm">
                      <Bookmark size={18} className="mr-2" />
                      Save
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
              No Posts Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeFilter === "my"
                ? "You haven't created any posts yet."
                : searchTerm
                ? `We couldn't find any posts matching "${searchTerm}". Try adjusting your search term.`
                : "Your feed is empty. Follow more people to see their posts here."}
            </p>
            {(searchTerm || activeFilter === "my") && (
              <div className="mt-4 space-x-2">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition font-medium"
                  >
                    Clear Search
                  </button>
                )}
                {activeFilter === "my" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition font-medium"
                  >
                    View All Posts
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
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
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
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
                    {currentUser &&
                      selectedPost.author &&
                      selectedPost.author.username === currentUser.username && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
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

              {/* Display Image */}
              {selectedPost.imageUrl && (
                <div className="mt-6 bg-gray-50 p-2 rounded-lg">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-auto rounded-md"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x400?text=Image+Unavailable";
                    }}
                  />
                </div>
              )}

              {/* Display Video */}
              {selectedPost.videoUrl && (
                <div className="mt-6 bg-gray-50 p-2 rounded-lg">
                  <video
                    controls
                    className="w-full rounded-md"
                    poster="https://via.placeholder.com/800x400?text=Video+Thumbnail"
                  >
                    <source src={selectedPost.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Comments section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Comments
                </h3>

                {/* Comment input */}
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3 flex-shrink-0">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                    <textarea
                      className="w-full px-3 py-2 text-gray-700 focus:outline-none resize-none"
                      rows="2"
                      placeholder="Add a comment..."
                    ></textarea>
                    <div className="bg-gray-50 px-3 py-2 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-gray-700">
                          <Image size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Video size={16} />
                        </button>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700">
                        Post
                      </button>
                    </div>
                  </div>
                </div>

                {/* Placeholder for comments */}
                {selectedPost.comments && selectedPost.comments.length > 0 ? (
                  <div className="space-y-4">
                    {selectedPost.comments.map((comment, idx) => (
                      <div key={idx} className="flex">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
                        <div className="flex-1">
                          <div className="bg-gray-100 px-4 py-3 rounded-lg">
                            <div className="font-medium text-gray-900 text-sm">
                              User Name
                            </div>
                            <div className="text-gray-700 text-sm mt-1">
                              {comment.content}
                            </div>
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                            <button className="hover:text-blue-600">
                              Like
                            </button>
                            <button className="hover:text-blue-600">
                              Reply
                            </button>
                            <span>{Math.floor(Math.random() * 10) + 1}h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 sticky bottom-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <ThumbsUp size={20} className="mr-1" />
                    Like
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-green-600">
                    <Share2 size={20} className="mr-1" />
                    Share
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-amber-600">
                    <Bookmark size={20} className="mr-1" />
                    Save
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
