import React from "react";
import { useNavigate } from "react-router-dom";

export default function OfficialLandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/candidate-auth"); // navigate to candidate auth or any page you want
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-3xl text-center bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Scaling Theory
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Discover exciting job opportunities and apply with just a few clicks.
        </p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Apply for Jobs
        </button>
      </div>
    </div>
  );
}
