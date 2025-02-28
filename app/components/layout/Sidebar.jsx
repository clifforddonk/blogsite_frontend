"use client";
import { Home, PlusCircle, Users, LogOut } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Sidebar Overlay (closes sidebar when clicked outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white z-20 transform transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 lg:w-64"
        } overflow-hidden lg:relative`}
      >
        {/* Dashboard title */}
        <div className="p-6 flex items-center justify-between  mt-0">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="">
          <ul className="space-y-2 px-2">
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-md hover:bg-gray-700"
              >
                <Home className="text-gray-300" size={20} />
                <span className="ml-4">Posts</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-md hover:bg-gray-700"
              >
                <PlusCircle className="text-gray-300" size={20} />
                <span className="ml-4">Create Post</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-md hover:bg-gray-700"
              >
                <Users className="text-gray-300" size={20} />
                <span className="ml-4">Contributors</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-2">
          <button className="flex items-center w-full p-3 rounded-md hover:bg-gray-700">
            <LogOut className="text-red-400" size={20} />
            <span className="ml-4 text-red-400">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
