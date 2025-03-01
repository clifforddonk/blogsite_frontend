"use client";
import { Home, PlusCircle, Users, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

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
          <div className="space-y-2 px-2">
            <Link href="">
              <div className="flex items-center p-3 rounded-md hover:bg-gray-700">
                <Home className="text-gray-300" size={20} />
                <span className="ml-4">Posts</span>
              </div>
            </Link>
            <Link href="">
              <div className="flex items-center p-3 rounded-md hover:bg-gray-700">
                <PlusCircle className="text-gray-300" size={20} />
                <span className="ml-4">Create Post</span>
              </div>
            </Link>
            <Link href="">
              <div className="flex items-center p-3 rounded-md hover:bg-gray-700">
                <Users className="text-gray-300" size={20} />
                <span className="ml-4">Contributors</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-2">
          <button
            className="flex items-center w-full p-3 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
          >
            <LogOut className="text-red-400" size={20} />
            <span className="ml-4 text-red-400">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
