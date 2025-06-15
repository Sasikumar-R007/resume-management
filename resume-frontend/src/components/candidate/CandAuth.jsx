import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CandAuth() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex justify-center mt-4">
          <div className="inline-flex bg-gray-200 dark:bg-gray-700 p-1 rounded-full">
            <button
              onClick={() => setTab("login")}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                tab === "login"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("register")}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                tab === "register"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-white"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {tab === "login" ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={() => navigate("/candidate-form")}
              >
                Login
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Register
              </button>
            </form>
          )}
          <div className="my-4 text-center text-sm text-gray-500 dark:text-gray-400">
            or continue with
          </div>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded py-2 hover:shadow">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-700 dark:text-white">
                Google
              </span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded py-2 hover:shadow">
              <img
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="linkedin"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-700 dark:text-white">
                LinkedIn
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
