import React from "react";
import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeamLeaderMainDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("teamLeaderProfile"));

  const overviewData = [
    {
      icon: <FaUsers size={28} className="text-black" />,
      title: "Assigned Recruiters",
      count: 2,
      subtitle: "Recruiters under your team",
      onClick: () => navigate("/team-leader/recruiters"),
    },
    {
      icon: <FaTasks size={28} className="text-black" />,
      title: "Ongoing Recruitments",
      count: 4,
      subtitle: "Active requirements",
      onClick: () => navigate("/team-leader/requirements"),
    },
    {
      icon: <FaCheckCircle size={28} className="text-black" />,
      title: "Completed Hires",
      count: 1,
      subtitle: "Hires completed successfully",
      onClick: () => navigate("/team-leader/completed-hires"),
    },
    {
      icon: <FaChartLine size={28} className="text-black" />,
      title: "Team Performance",
      count: "N/A",
      subtitle: "Overview of recruiter stats",
      onClick: () => navigate("/team-leader/performance"),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChangePic = (e) => {
    // Logic for uploading pic
    alert("Change picture functionality not implemented");
  };

  const handleRemovePic = () => {
    // Logic for removing pic
    alert("Remove picture functionality not implemented");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <div className="max-w-5xl w-full">
        {/* Header: Welcome + Logout */}
        <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-left">
              Welcome {user?.name}
            </h1>
            <p className="text-gray-700 max-w-xl text-left">
              Track your team, assigned recruiters, and manage the recruitment
              pipeline effectively.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-white shadow p-6 rounded-lg w-full max-w-full mx-auto mt-6 mb-6 relative">
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            {user?.profilePic && (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border"
              />
            )}
            <div className="flex gap-2 mt-2">
              <label className="text-xs text-blue-500 cursor-pointer">
                Change
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChangePic}
                />
              </label>
              {user?.profilePic && (
                <button
                  onClick={handleRemovePic}
                  className="text-xs text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="mb-6 pr-40">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Team Leader Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm text-gray-700">
              <p>
                <strong>ID:</strong> {user?.teamLeadId}
              </p>
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Mobile:</strong> {user?.mobile}
              </p>
              <p>
                <strong>Department:</strong> {user?.department}
              </p>
              <p>
                <strong>Reporting To:</strong> {user?.reportingTo}
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                {new Date(user?.joiningDate).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Overview Boxes (Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-gray-50 transition"
              onClick={item.onClick}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-3xl font-bold text-blue-700">{item.count}</p>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
                <div>{item.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Assigned Recruiters + Priority Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Assigned Recruiters (3/4) */}
          <div className="bg-white p-6 rounded shadow col-span-1 md:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Assigned Recruiters</h2>
            <div className="space-y-4">
              {[
                { name: "Emily Davis", reqCount: 3, high: 1 },
                { name: "James Thompson", reqCount: 1, high: 0 },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded border"
                >
                  <span className="font-medium text-gray-800">{rec.name}</span>
                  <span className="text-sm text-gray-600">
                    {rec.reqCount} requirement{rec.reqCount > 1 && "s"}
                  </span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700">
                    {rec.high} High
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution (1/4) */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Priority Distribution</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>High Priority</span>
                <span className="text-red-500 font-bold">1</span>
              </div>
              <div className="flex justify-between">
                <span>Medium Priority</span>
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div className="flex justify-between">
                <span>Low Priority</span>
                <span className="text-gray-500 font-bold">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderMainDashboard;


// {/* Requirements Table */}
// <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-5 mb-8">
// <h2 className="text-xl font-semibold mb-4">
//   📄 Your Requirements
// </h2>
// <table className="w-full text-sm border-collapse">
//   <thead className="bg-gray-100">
//     <tr>
//       <th className="p-2 border">Position</th>
//       <th className="p-2 border">Criticality</th>
//       <th className="p-2 border">Company</th>
//       <th className="p-2 border">Contact Person</th>
//       <th className="p-2 border">Talent Advisor</th>
//       <th className="p-2 border">Recruiter</th>
//     </tr>
//   </thead>
//   <tbody>
//     {requirements.map((r, i) => (
//       <tr key={i} className="hover:bg-gray-50">
//         <td className="p-2 border text-blue-600 cursor-pointer hover:underline">
//           {r.position}
//         </td>
//         <td className="p-2 border">
//           <span
//             className={`px-2 py-1 rounded text-white text-xs ${
//               r.criticality === "High"
//                 ? "bg-red-500"
//                 : r.criticality === "Medium"
//                 ? "bg-blue-500"
//                 : "bg-gray-500"
//             }`}
//           >
//             {r.criticality}
//           </span>
//         </td>
//         <td className="p-2 border">{r.company}</td>
//         <td className="p-2 border">{r.contact}</td>
//         <td className="p-2 border">{r.advisor}</td>
//         <td className="p-2 border">{r.recruiter}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>
// </div>

// {/* Logout Button */}
// <div className="flex justify-center">
// <button
//   onClick={handleLogout}
//   className="bg-red-500 text-white mt-4 px-4 py-2 rounded hover:bg-red-600"
// >
//   Sign Out
// </button>
// </div>