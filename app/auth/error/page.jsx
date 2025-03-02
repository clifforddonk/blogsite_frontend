import Link from "next/link";

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          OAuth Account Not Linked
        </h2>
        <p className="text-center text-gray-600">
          The email associated with your Google account is already registered.
          Please sign in using your email and password.
        </p>
        <Link href="/auth/login">
          <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm  font-semibold text-gray-100 bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Return To Log In in page
          </button>
        </Link>
      </div>
    </div>
  );
}
