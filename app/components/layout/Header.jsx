"use client";

import Image from "next/image";
import { FiBell } from "react-icons/fi";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getFilteredUsers } from "../../utils/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null); // Store a single user object
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    router.push("/auth/login"); // Redirect to login page after logout
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
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

  const userName = user?.username || "Guest";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName
  )}&background=random&color=fff`;

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 w-full">
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
      <div className="flex items-center space-x-3 lg:space-x-0 lg:flex-row-reverse relative">
        <div className="relative">
          <Image
            onClick={toggleDropdown}
            src={avatarUrl}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover cursor-pointer"
            loading="lazy"
          />

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-52 bg-white  rounded-lg shadow-md z-50">
              <ul className="text-gray-700">
                <li>
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutUser}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button className="lg:hidden relative text-gray-600 hover:text-gray-800">
          <FiBell className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;
