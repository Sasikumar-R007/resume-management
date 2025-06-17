import React from "react";
import { useState } from "react";
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

  // Mock candidates data

  const mockCandidates = [
    {
      id: "cand001",
      name: "John Doe",
      jobId: "job001",
      job: "Frontend Developer",
      company: "TechCorp",
    },
    {
      id: "cand002",
      name: "Jane Smith",
      jobId: "job002",
      job: "UI/UX Designer",
      company: "Designify",
    },
    {
      id: "cand003",
      name: "Ravi Kumar",
      jobId: "job003",
      job: "Backend Developer",
      company: "CodeLabs",
    },
    {
      id: "cand004",
      name: "Aisha Ali",
      jobId: "job004",
      job: "Full Stack Dev",
      company: "WebFusion",
    },
    {
      id: "cand005",
      name: "David Lee",
      jobId: "job005",
      job: "Project Manager",
      company: "AgileWorks",
    },
    {
      id: "cand006",
      name: "Meena S",
      jobId: "job006",
      job: "QA Tester",
      company: "BugCatchers",
    },
    {
      id: "cand007",
      name: "Tom Victor",
      jobId: "job007",
      job: "DevOps Engineer",
      company: "CloudBase",
    },
    {
      id: "cand008",
      name: "Sara N",
      jobId: "job008",
      job: "Data Analyst",
      company: "InsightSoft",
    },
    {
      id: "cand009",
      name: "Naveen R",
      jobId: "job009",
      job: "Mobile App Dev",
      company: "AppLogic",
    },
    {
      id: "cand010",
      name: "Kavi R",
      jobId: "job010",
      job: "Product Designer",
      company: "PixelMint",
    },
    {
      id: "cand011",
      name: "Deepak S",
      jobId: "job011",
      job: "HR Manager",
      company: "HireNow",
    },
  ];

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");

  const statuses = [
    "Processing",
    "Interview Scheduled",
    "Selected",
    "Screened out",
    "Rejected",
  ];
  const rejectionReasons = [
    "Skill mismatch",
    "Lack of communication",
    "Inadequate experience",
    "Unprofessional behavior",
    "Other",
  ];

  const handleStatusChange = (cand, value) => {
    if (value === "Rejected" || value === "Screened out") {
      const confirmReject = window.confirm(
        `Are you sure you want to mark ${cand.name} as ${value}?`
      );
      if (confirmReject) {
        setSelectedCandidate(cand);
        setShowReasonModal(true);
      }
    } else {
      console.log(`${cand.name} status changed to ${value}`);
      // Later: backend update for status
    }
  };

  const [showAll, setShowAll] = useState(false);
  const visibleCandidates = showAll
    ? mockCandidates
    : mockCandidates.slice(0, 10);

  // Recent activities

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

        {/* Candidate Status */}

        <div className="flex flex-col lg:flex-row gap-4 my-5 w-full">
          {/* Left Column */}
          <div className="lg:w-[75%] w-full bg-white rounded-2xl shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Candidate Status</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left bg-gray-100">
                    <th className="p-2">S.No.</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Job Title</th>
                    <th className="p-2">Company</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCandidates.map((cand, index) => (
                    <tr key={cand.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{index + 1}</td>
                      <td
                        className="p-2 text-blue-600 cursor-pointer hover:underline"
                        onClick={() =>
                          navigate(`/recruiter/candidate/${cand.id}`)
                        }
                      >
                        {cand.name}
                      </td>
                      <td
                        className="p-2 cursor-pointer hover:underline"
                        onClick={() => navigate(`/recruiter/job/${cand.jobId}`)}
                      >
                        {cand.job}
                      </td>
                      <td className="p-2">{cand.company}</td>
                      <td className="p-2">
                        <select
                          className="border px-2 py-1 rounded"
                          defaultValue="Processing"
                          onChange={(e) =>
                            handleStatusChange(cand, e.target.value)
                          }
                        >
                          {statuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showReasonModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      Reason for Screening Out
                    </h3>

                    <div className="mb-4">
                      <label className="block mb-1 font-medium">
                        Select Reason
                      </label>
                      <select
                        className="w-full border px-3 py-2 rounded"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      >
                        <option value="">-- Choose a reason --</option>
                        {rejectionReasons.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 font-medium">
                        Optional Description
                      </label>
                      <textarea
                        rows="3"
                        className="w-full border px-3 py-2 rounded"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Write more details (optional)..."
                      ></textarea>
                    </div>

                    <div className="flex justify-between">
                      <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => setShowReasonModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => {
                          console.log(
                            `Rejected ${selectedCandidate.name} - ${reason} - ${desc}`
                          );
                          setShowReasonModal(false);
                          setReason("");
                          setDesc("");
                          // Schedule: send reason to backend later
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-right mt-4">
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "See More"}
              </button>
            </div>

            {/* Right Column Buttons for small screens */}
            <div className="block lg:hidden mt-6 flex flex-col gap-3">
              <button className="w-full py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-700">
                Pipeline
              </button>
              <button className="w-full py-3 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-400">
                Archived
              </button>
            </div>
          </div>

          {/* Right Column Buttons for large screens */}
          <div className="hidden lg:flex lg:w-[25%] flex-col gap-4">
            <button className="w-full py-3 bg-green-600 text-white text-lg rounded-xl shadow hover:bg-green-700">
              Pipeline
            </button>
            <button className="w-full py-3 bg-yellow-500 text-white text-lg rounded-xl shadow hover:bg-yellow-400">
              Archived
            </button>
          </div>
        </div>

        {/* Recent Activities */}

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
