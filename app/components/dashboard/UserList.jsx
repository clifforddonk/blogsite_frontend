"use client";
import { useEffect, useState } from "react";
import { getFilteredUsers } from "../../utils/authService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      const filteredUsers = await getFilteredUsers();
      setUsers(filteredUsers);
    };

    fetchFilteredUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <p>Name: {user.username}</p>
              <p>Email: {user.email}</p>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
