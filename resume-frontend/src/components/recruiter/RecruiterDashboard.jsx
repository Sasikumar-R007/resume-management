import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">
        Welcome to Your Recruiter Dashboard
      </h1>
      <p className="text-gray-600 max-w-md mb-6">
        To get started, you need to set up your recruiter profile. This will
        help us personalize your experience.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/recruiter/setup-profile")}
          className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition"
        >
          <FaPlus /> Set Up Profile
        </button>

        <button
          onClick={() => navigate("/recruiter/home")}
          className="bg-white border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition"
        >
          Set Up Later
        </button>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
