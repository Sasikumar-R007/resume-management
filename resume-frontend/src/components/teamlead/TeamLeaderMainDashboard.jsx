import React from "react";
import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaChartLine,
  FaSearch,
  FaUserPlus,
  FaRegFolderOpen,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeamLeaderMainDashboard = () => {
  const navigate = useNavigate();
  const overviewData = [
    {
      icon: <FaUsers size={28} className="text-black" />,
      title: "Assigned Recruiters",
      count: 0,
      subtitle: "Recruiters assigned to you",
    },
    {
      icon: <FaTasks size={28} className="text-black" />,
      title: "Ongoing Recruitments",
      count: 0,
      subtitle: "Recruitments in progress",
    },
    {
      icon: <FaCheckCircle size={28} className="text-black" />,
      title: "Completed Hires",
      count: 0,
      subtitle: "Successfully hired candidates",
    },
    {
      icon: <FaChartLine size={28} className="text-black" />,
      title: "Team Performance",
      count: "N/A",
      subtitle: "Your team's recruitment stats",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user"); // or whatever you stored
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Welcome to Your Team Leader Dashboard
      </h1>
      <p className="text-center text-gray-700 mb-8">
        Manage your recruitment team, track progress, and stay organized.
      </p>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
        {overviewData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-3xl font-bold text-blue-700">{item.count}</p>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
            </div>
            <div>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mb-8 max-w-5xl mx-auto">
        <button
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded hover:bg-gray-800 transition"
          onClick={() => navigate("/admin/add-recruiter")}
        >
          <FaUserPlus /> Add Recruiter
        </button>
        <button className="flex items-center gap-2 border border-black px-5 py-3 rounded hover:bg-gray-200 transition">
          <FaFileAlt /> View Reports
        </button>
        <button
          onClick={() => navigate("/all-resumes")}
          className="flex items-center gap-2 border border-black px-5 py-3 rounded hover:bg-gray-200 transition"
        >
          <FaRegFolderOpen />
          View Profiles
        </button>
      </div>

      {/* Search Recruiter Section */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4 gap-3">
          <FaSearch className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search Recruiter..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
          />
        </div>
        <div className="text-center text-gray-500 py-10">
          No recruiters found
        </div>
      </div>
      <div className="flex justify-center">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white mt-5 px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
      </div>
    </div>
  );
};

export default TeamLeaderMainDashboard;
