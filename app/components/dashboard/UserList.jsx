"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/authService";

const UserList = ({ name }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      try {
        setIsLoading(true);
        const filteredUsers = await getAllUsers();
        setUsers(filteredUsers);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredUsers();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-xl font-bold text-white">{name}</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-pulse text-gray-500">Loading users...</div>
          </div>
        ) : error ? (
          <div className="p-6 text-red-500 text-center">{error}</div>
        ) : (
          <div>
            {users.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.email} className="hover:bg-gray-50">
                    <div className="px-6 py-4 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-800 font-semibold">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {user.email}
                        </div>
                      </div>
                      <div>
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
