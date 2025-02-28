"use client";
import React, { useState } from "react";
import { Home, PlusCircle, Users, LogOut, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative">
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-10 p-2 bg-gray-100 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {expanded ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={
          "h-screen bg-gray-800 text-white transition-all duration-300 w-64"
        }
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-2">
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Home className="text-gray-300" size={20} />
                <span className="ml-4">Posts</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                <PlusCircle className="text-gray-300" size={20} />
                <span className="ml-4">Create Post</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Users className="text-gray-300" size={20} />
                {expanded && <span className="ml-4">Contributors</span>}
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-2">
          <button className="flex items-center w-full p-3 rounded-md hover:bg-gray-700 transition-colors">
            <LogOut className="text-red-400" size={20} />
            {expanded && <span className="ml-4 text-red-400">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
