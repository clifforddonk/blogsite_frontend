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
      {/* Mobile toggle button - only visible when sidebar is closed */}
      {!expanded && (
        <button
          className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-gray-100 rounded-md shadow-md"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar - absolute positioning for overlay effect */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 z-10 ${
          expanded ? "w-64" : "w-0 lg:w-64"
        } overflow-hidden`}
      >
        {/* Header with Dashboard text and X button */}
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          {/* X button now inside the sidebar header, on the right side */}
          {expanded && (
            <button className="lg:hidden text-white" onClick={toggleSidebar}>
              <X size={20} />
            </button>
          )}
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
                <span className="ml-4">Contributors</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-2">
          <button className="flex items-center w-full p-3 rounded-md hover:bg-gray-700 transition-colors">
            <LogOut className="text-red-400" size={20} />
            <span className="ml-4 text-red-400">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content container with padding to prevent content from being hidden under sidebar on desktop */}
      <div className="lg:ml-64 p-4">
        {/* Your page content goes here */}
        <div className="pt-16 lg:pt-0">
          {/* Content starts here with padding-top on mobile to avoid toggle button */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
