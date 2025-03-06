"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../utils/authService";
import { User, Mail, Lock } from "lucide-react"; // Import icons
import Link from "next/link";

const Page = ({ regUser }) => {
  const [userData, setUserData] = useState({
    username: "", // Fixed the typo in the state (was useranme)
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // Added for success messages
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      const result = await registerUser(userData);
      setMessage(result); // The API returns a success message, assign it

      // Delay redirect to show success message
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err); // The API now sends clear error messages
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Blog Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Blog</h1>
          <p className="text-gray-600 mt-1">Create your account</p>
        </div>

        {/* Messages */}
        {regUser?.data?.message && (
          <p className="text-blue-600 text-center mb-4">
            {regUser.data.message}
          </p>
        )}
        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Register
            </button>
          </div>
          <div>
            <p className="text-center">
              Already Have An Account?
              <Link href="/auth/login">
                <span className="text-blue-600 hover:underline">Sign In</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
