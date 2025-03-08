"use client";
import { useState, useEffect } from "react";
import postService from "@/app/utils/postSevice";
import { getFilteredUsers } from "@/app/utils/authService";
import {
  Type,
  FileText,
  Image,
  Video,
  Send,
  CheckCircle,
  X,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [imageName, setImageName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getFilteredUsers();
      if (fetchedUser) setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (type === "image") {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0]?.name || "");
    }
    if (type === "video") {
      setVideo(e.target.files[0]);
      setVideoName(e.target.files[0]?.name || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage("User data is still loading...");
      setShowErrorModal(true);
      return;
    }

    setLoading(true);

    try {
      const response = await postService.createPost(
        user.id,
        { title: formData.title, content: formData.content },
        image,
        video
      );

      if (response) {
        setShowSuccessModal(true);
        // Reset form after successful submission
        setFormData({ title: "", content: "" });
        setImage(null);
        setVideo(null);
        setImageName("");
        setVideoName("");
      } else {
        throw new Error("Post creation failed");
      }
    } catch (error) {
      setErrorMessage("Failed to create post.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Close modals
  const closeSuccessModal = () => setShowSuccessModal(false);
  const closeErrorModal = () => setShowErrorModal(false);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FileText className="mr-2" /> Create a New Post
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Type className="w-4 h-4 mr-1" /> Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Enter your post title"
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <FileText className="w-4 h-4 mr-1" /> Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              placeholder="Write your post content here..."
              onChange={handleInputChange}
              required
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Image className="w-4 h-4 mr-1" /> Image (optional)
              </label>
              <div className="flex items-center">
                <label className="flex-grow cursor-pointer bg-gray-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition">
                  <span className="flex items-center justify-center text-sm text-gray-600">
                    {imageName || "Choose image file..."}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "image")}
                    className="hidden"
                  />
                </label>
                {imageName && (
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImageName("");
                    }}
                    className="ml-2 p-1 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Video className="w-4 h-4 mr-1" /> Video (optional)
              </label>
              <div className="flex items-center">
                <label className="flex-grow cursor-pointer bg-gray-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition">
                  <span className="flex items-center justify-center text-sm text-gray-600">
                    {videoName || "Choose video file..."}
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, "video")}
                    className="hidden"
                  />
                </label>
                {videoName && (
                  <button
                    type="button"
                    onClick={() => {
                      setVideo(null);
                      setVideoName("");
                    }}
                    className="ml-2 p-1 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !user}
              className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white 
                ${
                  loading || !user
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
            >
              <Send className="mr-2 h-5 w-5" />
              {loading ? "Creating Post..." : "Publish Post"}
            </button>
          </div>

          {!user && (
            <p className="text-center text-amber-600 text-sm mt-2">
              Loading user data... Please wait
            </p>
          )}
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeSuccessModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Post Created Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your post has been published and is now visible to others.
              </p>
              <Link href="/dashboard">
                <button
                  onClick={closeSuccessModal}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeErrorModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <X size={40} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <button
                onClick={closeErrorModal}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
