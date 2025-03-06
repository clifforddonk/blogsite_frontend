"use client";

import Image from "next/image";
import { FiBell } from "react-icons/fi";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getFilteredUsers } from "../../utils/authService";

const Header = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null); // Store a single user object

  useEffect(() => {
    const fetchFilteredUser = async () => {
      const filteredUser = await getFilteredUsers();
      if (filteredUser) {
        setUser(filteredUser);
      }
    };

    fetchFilteredUser();
  }, []);

  const userName = user?.username || "Guest";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName
  )}&background=random&color=fff`;

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Sidebar Toggler */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-200"
      >
        <Menu size={24} />
      </button>

      {/* Bell Icon */}
      <div className="hidden lg:block">
        <button className="relative text-gray-600 hover:text-gray-800">
          <FiBell className="text-2xl" />
        </button>
      </div>

      {/* User Profile & Bell */}
      <div className="flex items-center space-x-3 lg:space-x-0 lg:flex-row-reverse">
        <Image
          src={avatarUrl}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full object-cover"
          loading="lazy"
        />
        <button className="lg:hidden relative text-gray-600 hover:text-gray-800">
          <FiBell className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;
