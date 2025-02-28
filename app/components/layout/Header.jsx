"use client";
import { FiBell } from "react-icons/fi";
import { Menu, X } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Sidebar Toggler */}
      <button
        onClick={toggleSidebar}
        className="text-gray-600 p-2 rounded-lg hover:bg-gray-200 lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Notification Icon */}
      <button className="relative text-gray-600 hover:text-gray-800">
        <FiBell className="text-2xl" />
      </button>
    </div>
  );
};

export default Header;
