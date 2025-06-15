import React from "react";
import {
  FaBriefcase,
  FaUserCheck,
  FaCalendarCheck,
  FaHandshake,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecruiterDashboardMain = () => {
  const navigate = useNavigate();
  const handleUploadClick = () => {
    navigate("/upload-resume");
  };

  const summaryCards = [
    {
      icon: <FaBriefcase size={28} className="text-black" />,
      title: "Total Jobs Posted",
      count: 12,
      subtitle: "Active jobs: 5",
      path: "/recruiter/total-jobs",
    },
    {
      icon: <FaUserCheck size={28} className="text-black" />,
      title: "Candidates Applied",
      count: 89,
      subtitle: "New applications: 12",
      path: "/recruiter/candidates-applied",
    },
    {
      icon: <FaCalendarCheck size={28} className="text-black" />,
      title: "Interviews Scheduled",
      count: 7,
      subtitle: "This week: 3",
    },
    {
      icon: <FaHandshake size={28} className="text-black" />,
      title: "Offers Made",
      count: 3,
      subtitle: "Pending: 1",
    },
  ];

  const recentActivities = [
    "Job 'Frontend Developer' posted 2 days ago",
    "Interview scheduled with John Doe",
    "Candidate Jane Smith applied for Backend Developer",
    "Offer sent to Michael Lee",
    "Profile updated successfully",
  ];

  const handleLogout = () => {
    localStorage.removeItem("user"); // or whatever you stored
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Welcome to Your Recruiter Dashboard
        </h1>
        <p className="mb-8 text-gray-700 max-w-xl mx-auto text-center">
          To get started, review your current jobs and candidates, or update
          your profile to better manage your recruitment process.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {summaryCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.path)} // 👉 navigate on click
              className="p-6 border rounded-lg flex justify-between items-center bg-white shadow cursor-pointer hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-blue-700">{card.count}</p>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
              </div>
              <div>{card.icon}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-3">
          <div>
            <button
              onClick={handleUploadClick}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Upload Resume
            </button>
            {/* <button
              onClick={() => navigate("/all-resumes")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition ml-4"
            >
              View Profiles
            </button> */}
          </div>

          <button
            onClick={() => navigate("/recruiter/add-job")}
            className="bg-blue-600 text-white ml-4 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Job
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow max-w-full mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <button className="text-blue-600 hover:underline flex items-center gap-1">
              <FaEdit /> Edit Profile
            </button>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {recentActivities.map((item, idx) => (
              <li key={idx} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white mt-5 px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default RecruiterDashboardMain;
