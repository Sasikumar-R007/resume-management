import React from "react";
import { useNavigate } from "react-router-dom";

const TeamLeaderProfileSetup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here...
    navigate("/team-leader/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Complete Your Team Leader Profile
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please provide your information to complete your team leader profile.{" "}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="w-full">
              <label className="block font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="tel"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="date"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamLeaderProfileSetup;
