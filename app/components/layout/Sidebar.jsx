"use client";
import { Home, PlusCircle, Users, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getFilteredUsers } from "../../utils/authService";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const logoutUser = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  useEffect(() => {
    const fetchFilteredUser = async () => {
      const filteredUser = await getFilteredUsers();
      if (filteredUser) {
        setUser(filteredUser);
      }
    };

    fetchFilteredUser();
  }, []);

  // Function to handle navigation and close sidebar on mobile
  const handleNavigation = (path) => {
    if (window.innerWidth < 1024) {
      // Check if on mobile
      toggleSidebar();
    }
    router.push(path);
  };

  const role = user?.role;

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-10 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-full md:h-screen bg-gray-800 text-white z-20 transition-all duration-300 ease-in-out shadow-lg
          ${
            isOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full lg:translate-x-0 w-0 lg:w-64"
          }
          overflow-hidden lg:overflow-y-auto`}
      >
        {/* Dashboard title */}
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          <h1 className="text-xl font-bold">ByteBlog</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4">
          <div className="space-y-1 px-2">
            <div
              onClick={() => handleNavigation("/dashboard")}
              className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <Home className="text-gray-300" size={20} />
              <span className="ml-4">Posts</span>
            </div>

            <div
              onClick={() => handleNavigation("/dashboard/create-post")}
              className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <PlusCircle className="text-gray-300" size={20} />
              <span className="ml-4">Create Post</span>
            </div>

            <div
              onClick={() => handleNavigation("/dashboard/contributors")}
              className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <Users className="text-gray-300" size={20} />
              <span className="ml-4">Contributors</span>
            </div>

            {role === "admin" && (
              <div
                onClick={() => handleNavigation("/dashboard/admin")}
                className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                <LayoutDashboard className="text-gray-300" size={20} />
                <span className="ml-4">Admin Dashboard</span>
              </div>
            )}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="sticky bottom-0 bg-gray-800 w-full p-2 border-t border-gray-700 mt-auto">
          <button
            onClick={logoutUser}
            className="flex items-center w-full p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="text-red-400" size={20} />
            <span className="ml-4 text-red-400">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
