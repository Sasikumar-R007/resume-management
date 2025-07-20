import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaChartLine,
  FaUserTie,
  FaChartPie,
  FaUserPlus,
} from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const TeamLeaderDashboard = () => {
  const navigate = useNavigate();
  const [teamLeader, setTeamLeader] = useState({});
  const [requirements, setRequirements] = useState([]);
  const [assignedRecruiters, setAssignedRecruiters] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [dummyRecruiters, setDummyRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const stored = localStorage.getItem("teamLeaderProfile");
    if (stored) setTeamLeader(JSON.parse(stored));

    setAssignedRecruiters([
      {
        id: "R001",
        name: "R. Sudharshan",
        count: 3,
        completed: 2,
        priority: "High",
      },
      { id: "R002", name: "Deepika", count: 1, completed: 1, priority: "Low" },
      {
        id: "R003",
        name: "Venkat",
        count: 2,
        completed: 0,
        priority: "Medium",
      },
    ]);

    setRequirements([
      {
        position: "Frontend Developer",
        criticality: "High",
        company: "TechCorp",
        contact: "Rahul",
        advisor: "Sundar",
        recruiter: "R. Sudharshan",
      },
      {
        position: "UI/UX Designer",
        criticality: "Medium",
        company: "Designify",
        contact: "Megha",
        advisor: "Kavitha",
        recruiter: null,
      },
      {
        position: "Backend Developer",
        criticality: "Low",
        company: "CodeBase",
        contact: "Anjali",
        advisor: "Rajesh",
        recruiter: null,
      },
      {
        position: "QA Tester",
        criticality: "High",
        company: "BugSmash",
        contact: "Kiran",
        advisor: "Sowmiya",
        recruiter: null,
      },
      {
        position: "DevOps Engineer",
        criticality: "Medium",
        company: "CloudNet",
        contact: "Lokesh",
        advisor: "Kavitha",
        recruiter: "Venkat",
      },
      {
        position: "Business Analyst",
        criticality: "Medium",
        company: "BizTech",
        contact: "Prabhu",
        advisor: "Sundar",
        recruiter: null,
      },
    ]);

    setDummyRecruiters(["R. Sudharshan", "Deepika", "Venkat"]);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChangePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTeamLeader({ ...teamLeader, profilePic: imageUrl });
    }
  };

  const handleRemovePic = () => {
    setTeamLeader({ ...teamLeader, profilePic: "" });
  };

  const openAssignModal = (req) => {
    setSelectedReq(req);
    setShowAssignModal(true);
  };

  const handleAssignClick = (req) => {
    setSelectedReq(req);
    setShowAssignPopup(true);
  };

  const confirmAssign = () => {
    if (!selectedRecruiter) {
      alert("Please select a recruiter before assigning.");
      return;
    }

    const confirmMsg = selectedReq.recruiter
      ? `Are you sure you want to change the assignment to ${selectedRecruiter}?`
      : `Are you sure you want to assign this requirement to ${selectedRecruiter}?`;

    if (window.confirm(confirmMsg)) {
      setRequirements((prev) =>
        prev.map((req) =>
          req === selectedReq ? { ...req, recruiter: selectedRecruiter } : req
        )
      );
      setShowAssignModal(false);
      setSelectedRecruiter("");
      setSelectedReq(null);
    }
  };

  const unassigned = requirements.filter((req) => !req.recruiter);
  const assigned = requirements.filter((req) => req.recruiter);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center dark:bg-gray-900">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-800 dark:text-gray-100">
              Welcome {teamLeader.name}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Manage your team and monitor recruitments.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" />
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-lg relative mb-6 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            {teamLeader.profilePic && (
              <img
                src={teamLeader.profilePic}
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
              {teamLeader.profilePic && (
                <button
                  onClick={handleRemovePic}
                  className="text-xs text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="pr-40">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Profile Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-gray-800 dark:text-gray-100">
              <p><span className="font-semibold text-gray-700 dark:text-gray-200">ID:</span> {teamLeader.teamLeadId}</p>
              <p><span className="font-semibold text-gray-700 dark:text-gray-200">Name:</span> {teamLeader.name}</p>
              <p><span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span> {teamLeader.email}</p>
              <p><span className="font-semibold text-gray-700 dark:text-gray-200">Mobile:</span> {teamLeader.mobile}</p>
              <p><span className="font-semibold text-gray-700 dark:text-gray-200">Department:</span> {teamLeader.department}</p>
              <p><span className="font-semibold text-gray-700 dark:text-gray-200">Reporting To:</span> {teamLeader.reportingTo}</p>
              <p><span className="font-semibold text-gray-700 dark:text-gray-200">Joining Date:</span> {teamLeader.joiningDate && new Date(teamLeader.joiningDate).toLocaleDateString("en-IN")}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            "Assigned Recruiters",
            "Ongoing Recruitments",
            "Completed Hires",
            "Team Performance",
          ].map((title, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <p className="text-blue-700 text-2xl font-bold dark:text-blue-400">
                {idx === 3 ? "88%" : idx + 2}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Subtitle {idx + 1}
              </p>
            </div>
          ))}
        </div>

        {/* Assigned Recruiters + Priority Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Assigned Recruiters - Wider (md:col-span-3) */}
          <div className="md:col-span-3 bg-white p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <FaUserTie className="text-blue-500" />
              Assigned Recruiters
            </h2>
            <div className="space-y-4">
              {assignedRecruiters.map((rec, i) => {
                const completed = rec.completed || 0;
                const total = rec.count;
                const progress = Math.round((completed / total) * 100);
                const isComplete = progress === 100;

                return (
                  <div
                    key={i}
                    className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex items-center justify-between cursor-pointer hover:shadow-sm dark:bg-gray-900"
                    onClick={() => navigate(`/recruiter-profile/${rec.id}`)}
                  >
                    {/* Left: Name + Req Count */}
                    <div className="w-1/4">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {rec.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {rec.count}{" "}
                        {rec.count === 1 ? "requirement" : "requirements"}
                      </p>
                    </div>

                    {/* Center: Progress Bar */}
                    <div className="w-2/4 px-4">
                      <div className="text-sm text-gray-600 mb-1 text-center">
                        {completed} of {total} completed
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isComplete ? "bg-green-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Right: High Priority */}
                    <div className="w-1/4 text-right">
                      <span className="bg-gray-100 px-3 py-1 text-xs rounded-full font-semibold text-gray-800">
                        {rec.priority === "High" ? "1 High" : "0 High"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority Distribution - Narrower (md:col-span-1) */}
          <div className="bg-white p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <FaChartPie className="text-purple-500" />
              Priority Distribution
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                <span>High Priority</span>
                <span className="text-white bg-red-500 rounded-full px-3 py-1 text-xs font-bold">1</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                <span>Medium Priority</span>
                <span className="text-white bg-blue-500 rounded-full px-3 py-1 text-xs font-bold">3</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                <span>Low Priority</span>
                <span className="text-white bg-gray-400 rounded-full px-3 py-1 text-xs font-bold">0</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Your Requirements */}
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 mb-8 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
          <h2 className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <FaUserPlus className="text-blue-500" />
            Your Requirements
          </h2>
          <p className="text-sm text-gray-500 mb-4 dark:text-gray-300">
            Assign recruiters to newly received requirements.
          </p>

          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <th className="p-3 rounded-l-md">Position</th>
                <th className="p-3">Criticality</th>
                <th className="p-3">Company</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Talent Advisor</th>
                <th className="p-3 rounded-r-md">Recruiter</th>
                <th className="p-3 rounded-r-md">Reallocate</th>
              </tr>
            </thead>
            <tbody>
              {[...unassigned, ...assigned].map((r, i) => (
                <tr
                  key={r.id}
                  className="bg-white shadow-sm rounded-md transition dark:bg-gray-900 dark:text-gray-100"
                >
                  <td className="p-3 font-medium text-blue-700 dark:text-blue-400">
                    {r.position}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium
    ${
      r.criticality === "High"
        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
        : r.criticality === "Medium"
        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-200"
    }
  `}
                    >
                      {r.criticality}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                    {r.company}
                  </td>
                  <td className="p-3 dark:text-gray-100">{r.contact}</td>
                  <td className="p-3 dark:text-gray-100">{r.advisor}</td>
                  <td className="p-3">
                    {r.recruiter ? (
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        {r.recruiter}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAssignClick(r)}
                        className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Assign
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {r.recruiter ? (
                      <button
                        title="Change Assignment"
                        onClick={() => {
                          setSelectedReq(r);
                          setSelectedRecruiter(r.recruiter);
                          setShowAssignModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        <FiRepeat size={18} />
                      </button>
                    ) : (
                      <button
                        title="Not Assigned Yet"
                        className="text-gray-400 cursor-not-allowed"
                        disabled
                      >
                        <FiRepeat size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAssignPopup && selectedReq && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md dark:bg-gray-800 dark:text-gray-100">
              <h3 className="text-lg font-semibold mb-3">Assign Requirement</h3>
              <div className="text-sm space-y-1 mb-3 text-gray-700 dark:text-gray-200">
                <p>
                  <strong>Position:</strong> {selectedReq.position}
                </p>
                <p>
                  <strong>Company:</strong> {selectedReq.company}
                </p>
                <p>
                  <strong>Criticality:</strong> {selectedReq.criticality}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1 font-medium">
                  Assign to:
                </label>
                <select
                  className="border rounded px-3 py-1 mt-1 w-full dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  value={selectedRecruiter}
                  onChange={(e) => setSelectedRecruiter(e.target.value)}
                >
                  <option value="" disabled>
                    -- Select Recruiter --
                  </option>
                  {assignedRecruiters.map((rec) => (
                    <option key={rec.id} value={rec.name}>
                      {rec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAssignPopup(false)}
                  className="text-gray-600 border px-4 py-1.5 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAssign}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Confirm Assign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamLeaderDashboard;
