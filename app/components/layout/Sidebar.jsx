"use client";
import { Home, PlusCircle, Users, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();

  const logoutUser = () => {
    localStorage.removeItem("token");
    router.push("/auth/login"); // Redirect to login page after logout
  };

  return (
    <>
      {/* Sidebar Overlay (closes sidebar when clicked outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gray-800 text-white z-20 transform transition-all duration-300 ${
          isOpen ? "w-72" : "w-0 lg:w-64"
        } overflow-y-auto lg:overflow-y-visible lg:translate-x-0`}
      >
        {/* Dashboard title */}
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="space-y-2 px-2">
            <Link href="/dashboard">
              <div className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200">
                <Home className="text-gray-300" size={20} />
                <span className="ml-4">Posts</span>
              </div>
            </Link>
            <Link href="/dashboard/user/create-post">
              <div className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200">
                <PlusCircle className="text-gray-300" size={20} />
                <span className="ml-4">Create Post</span>
              </div>
            </Link>
            <Link href="/dashboard/contributors">
              <div className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors duration-200">
                <Users className="text-gray-300" size={20} />
                <span className="ml-4">Contributors</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="sticky bottom-0 bg-gray-800 w-full p-2">
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
