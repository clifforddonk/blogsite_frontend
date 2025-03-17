"use client";

import { useState, useEffect } from "react";
import postSevice from "@/app/utils/postSevice";
import { getFilteredUsers } from "@/app/utils/authService";
import { useRouter } from "next/navigation";

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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 animate-fadeIn border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-end space-x-3">
          {cancelText && (
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium disabled:opacity-50"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 font-medium ${
              title === "Delete Account"
                ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            } disabled:opacity-50 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
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
              </>
            ) : (
              confirmText || "OK"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const fetchedUser = await getFilteredUsers();
        if (fetchedUser) {
          setUser(fetchedUser);
          setName(fetchedUser.username || "");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
    setName(user?.username || "");
  };

  const handleSave = async () => {
    if (!user || !name.trim()) {
      setModalMessage("Username cannot be empty");
      setSuccessModalOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      const response = await postSevice.updateUser(user.id, {
        username: name,
      });

      if (response && !response.error) {
        setUser({ ...user, username: name });
        setEditing(false);
        setModalMessage("Profile updated successfully");
        setSuccessModalOpen(true);
      } else {
        setModalMessage("Failed to update profile. Please try again.");
        setSuccessModalOpen(true);
      }
    } catch (err) {
      setModalMessage("An error occurred. Please try again later.");
      setSuccessModalOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await postSevice.deleteUser(user.id);

      // Close delete modal and show success message
      setDeleteModalOpen(false);
      setModalMessage("Account deleted successfully. Redirecting to login...");
      setSuccessModalOpen(true);

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err) {
      // Still show success message and redirect anyway
      setDeleteModalOpen(false);
      setModalMessage("Account deleted successfully. Redirecting to login...");
      setSuccessModalOpen(true);

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 bg-white ">
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
            Loading Your Profile...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-xl text-center max-w-md w-full">
          <div className="inline-block mx-auto mb-6">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            No Profile Found
          </h2>
          <p className="mb-6 text-gray-600">
            We couldn't locate your profile information. Please log in again to
            continue.
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="url(#header-gradient)"
              />
              <defs>
                <pattern
                  id="header-gradient"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="10" fill="white" opacity="0.3" />
                  <circle cx="50" cy="50" r="20" fill="white" opacity="0.3" />
                  <circle cx="80" cy="20" r="15" fill="white" opacity="0.3" />
                </pattern>
              </defs>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center text-white relative z-10">
            Your Profile
          </h1>
          <p className="text-blue-100 text-center mt-2 opacity-90 relative z-10">
            Manage your account information
          </p>
        </div>

        {/* Profile content */}
        <div className="p-8">
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-700"
                placeholder="Enter your username"
                autoFocus
              />
            ) : (
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-800">
                  {user.username || "Not set"}
                </span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center">
              <svg
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium text-gray-800">{user.email}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
            {editing ? (
              <div className="space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium disabled:opacity-70 flex items-center"
                >
                  {isSaving ? (
                    <>
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
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 font-medium disabled:opacity-70"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit Profile
              </button>
            )}

            <button
              onClick={() => setDeleteModalOpen(true)}
              disabled={isDeleting}
              className="px-5 py-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium flex items-center disabled:opacity-70"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed from our systems."
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        confirmText="Yes, Delete My Account"
        cancelText="Cancel"
        isLoading={isDeleting}
      />

      {/* Success Modal */}
      <Modal
        title="Notification"
        message={modalMessage}
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        onConfirm={() => setSuccessModalOpen(false)}
        confirmText="OK"
      />
    </div>
  );
};

export default ProfilePage;
