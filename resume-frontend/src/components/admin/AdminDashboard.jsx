import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SystemSettings from "./SystemSettings";
import ActivityLogs from "./ActivityLogs";

import {
  FaDatabase,
  FaUsers,
  FaSignOutAlt,
  FaCogs,
  FaSearch,
  FaUserPlus,
  FaBriefcase,
  FaHeartbeat,
  FaServer,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("User Management");

  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      count: 0,
      subtext: "0 active users",
      icon: <FaUsers size={28} className="text-blue-600" />,
    },
    {
      title: "Total Jobs",
      count: 0,
      subtext: "0 active jobs",
      icon: <FaBriefcase size={28} className="text-green-600" />,
    },
    {
      title: "System Health",
      count: 0,
      subtext: "Healthy",
      icon: <FaHeartbeat size={28} className="text-red-600" />,
    },
    {
      title: "System Status",
      count: 0,
      subtext: "Running",
      icon: <FaServer size={28} className="text-purple-600" />,
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Recruiter",
      status: "Active",
      lastLogin: "2025-05-30 14:23",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Team Leader",
      status: "Inactive",
      lastLogin: "2025-05-29 09:10",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = (user) => {
    navigate("/recruiter/setup-profile", { state: user });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this recruiter?"
    );
    if (confirmDelete) {
      console.log("Deleted user with ID:", id);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "User Management":
        return (
          <>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              {/* Search */}
              <div className="flex items-center border rounded px-3 py-2 w-full md:w-auto">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search user..."
                  className="outline-none w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/admin/add-team-leader")}
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
                >
                  <FaUserPlus /> Add Team Leader
                </button>
                <button
                  onClick={() => navigate("/admin/add-recruiter")}
                  className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
                >
                  <FaUserPlus /> Add Recruiter
                </button>
              </div>
            </div>

            {/* User Table */}
            <div className="mt-6 bg-white shadow p-4 rounded-lg overflow-x-auto w-full">
              {users.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="p-2">ID</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Role</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Last Login</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b text-sm hover:bg-gray-50"
                      >
                        <td className="p-2">{user.id}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.role}</td>
                        <td className="p-2">{user.status}</td>
                        <td className="p-2">{user.lastLogin}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 ml-2 hover:underline"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No users found.</p>
              )}
            </div>
          </>
        );
      case "System Settings":
        return <SystemSettings />;
      case "Activity Logs":
        return <ActivityLogs />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-7">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          System Administration
        </h1>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>

      {/* Boxes */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-[300px] bg-white shadow p-4 rounded-lg cursor-pointer hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <FaCogs size={28} className="text-blue-600" />
            <div>
              <h2 className="font-semibold text-lg">Requirements</h2>
              <p className="text-sm text-gray-600">
                Manage system requirements
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-[300px] bg-white cursor-pointer shadow p-4 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/all-resumes")}
        >
          <div className="flex items-center gap-3">
            <FaDatabase size={28} className="text-green-600" />
            <div>
              <h2 className="font-semibold text-lg">Database</h2>
              <p className="text-sm text-gray-600">Manage Database</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-md font-semibold">{item.title}</h3>
                <p className="text-2xl font-bold text-blue-700">{item.count}</p>
                <p className="text-sm text-gray-600">{item.subtext}</p>
              </div>
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Section Switching */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[200px]">
          {["User Management", "System Settings", "Activity Logs"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`px-4 py-2 rounded w-full text-left transition-all duration-200 ${
                  activeSection === item
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Section Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
