"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../utils/authService";

const Page = () => {
  const [userData, setUserData] = useState({
    useranme: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter(); // Use router for navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      router.push("/auth/login"); // Correct way to navigate in Next.js
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Page;
