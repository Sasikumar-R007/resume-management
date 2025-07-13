import React, { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaUserCheck,
  FaCalendarCheck,
  FaHandshake,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClipboardList, AlertCircle, CheckCircle } from "lucide-react";

const RecruiterDashboardMain = () => {
  const navigate = useNavigate();
  const handleUploadClick = () => {
    // navigate("/upload-resume");
    navigate("/candidate-form");
  };

  const summaryCards = [
    {
      icon: <FaBriefcase size={28} className="text-black" />,
      title: "Active jobs",
      count: 12,
      subtitle: "Total Jobs Posted: 25",
      path: "/recruiter/total-jobs",
    },
    {
      icon: <FaUserCheck size={28} className="text-black" />,
      title: "New applications:",
      count: 12,
      subtitle: "Candidates Applied: 82",
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

  const [recruiter, setRecruiter] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("recruiterProfile");
    if (stored) {
      setRecruiter(JSON.parse(stored));
    }
  }, []);

  const [activeCandidates, setActiveCandidates] = useState([
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
  ]);

  const [archivedCandidates, setArchivedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");
  const [showAll, setShowAll] = useState(false);

  //Rec Profile session data

  // const [recruiter, setRecruiter] = useState({
  //   recruiterId: "STTA01",
  //   reportingTo: "Prakash Raj Raja",
  //   designedIn: "HR Department",
  //   joiningDate: "2023-06-15",
  //   email: "recruiter@example.com",
  //   mobile: "+91 9876543210",
  //   profilePic: "/assets/recruiter.jpg",
  // });

  const handleRemovePic = () => {
    setRecruiter({ ...recruiter, profilePic: "" });
  };

  const handleChangePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRecruiter({ ...recruiter, profilePic: imageUrl });
    }
  };

  const [confirmId, setConfirmId] = useState(null);

  const handleMarkDone = (id) => {
    setConfirmId(id);
  };

  const archiveRequirement = (id) => {
    const req = activeRequirements.find((r) => r.id === id);
    const updatedArchived = [
      ...archivedRequirements,
      { ...req, archivedAt: new Date() },
    ];
    const updatedActive = activeRequirements.filter((r) => r.id !== id);

    setArchivedRequirements(updatedArchived);
    setActiveRequirements(updatedActive);
    localStorage.setItem(
      "archivedRequirements",
      JSON.stringify(updatedArchived)
    );
    setConfirmId(null);
  };

  // ends...

  const [showModal, setShowModal] = useState(false);

  const statuses = [
    "Shortlisted",
    "In-Process",
    "Interview Scheduled",
    "Interview On-Going",
    "Final Round",
    "HR Round",
    "Selected",
    "Screened Out",
  ];
  const rejectionReasons = [
    "Skill mismatch",
    "Lack of communication",
    "Inadequate experience",
    "Unprofessional behavior",
    "Other",
  ];

  const visibleCandidates = showAll
    ? activeCandidates
    : activeCandidates.slice(0, 10);

  const handleStatusChange = (cand, value) => {
    if (value === "Screened Out") {
      const confirmReject = window.confirm(
        `Are you sure you want to mark ${cand.name} as ${value}?`
      );
      if (confirmReject) {
        setSelectedCandidate({ ...cand, status: value });
        setShowReasonModal(true);
      }
    } else {
      console.log(`${cand.name} status changed to ${value}`);
    }
  };

  const archiveCandidate = async (candidate, reason) => {
    const payload = {
      name: candidate.name,
      email: candidate.email || "noemail@example.com",
      status: candidate.status,
      reason,
    };

    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL ||
          "https://resume-mang-backend.vercel.app"
        }/api/archived`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert(`${candidate.name} archived successfully.`);
        setActiveCandidates((prev) =>
          prev.filter((c) => c.id !== candidate.id)
        );
      } else {
        alert("Failed to archive.");
      }
    } catch (err) {
      console.error("Archive error:", err);
    }
  };

  const [activeRequirements, setActiveRequirements] = useState([
    {
      id: 1,
      position: "Full Stack Engineer",
      criticality: "Medium",
      company: "StartupXYZ",
      contactPerson: "David Wilson",
      talentAdvisor: "Lisa Wang",
    },
    {
      id: 2,
      position: "Backend Developer",
      criticality: "Low",
      company: "DataTech Solutions",
      contactPerson: "Tom Anderson",
      talentAdvisor: "Lisa Wang",
    },
    {
      id: 3,
      position: "Data Scientist",
      criticality: "High",
      company: "AI Innovations",
      contactPerson: "Robert Kim",
      talentAdvisor: "Lisa Wang",
    },
    {
      id: 4,
      position: "Quality Assurance Engineer",
      criticality: "Low",
      company: "TestPro Solutions",
      contactPerson: "Kevin Brown",
      talentAdvisor: "Lisa Wang",
    },
  ]);
  const [archivedRequirements, setArchivedRequirements] = useState([]);

  const handleSubmitReason = () => {
    if (!reason.trim()) {
      alert("Please enter a reason.");
      return;
    }

    const updatedCandidate = {
      ...selectedCandidate,
      status: selectedCandidate.status,
    };

    archiveCandidate(updatedCandidate, reason);
    setShowReasonModal(false);
    setReason("");
    setDesc("");
    setSelectedCandidate(null);
  };

  const recentActivities = [
    "Job 'Frontend Developer' posted 2 days ago",
    "Interview scheduled with John Doe",
    "Candidate Jane Smith applied for Backend Developer",
    "Offer sent to Michael Lee",
    "Profile updated successfully",
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-4">
          {/* Left: Welcome Message */}
          <div>
            <h1 className="text-3xl font-bold mb-2 text-left">
              Welcome {recruiter.name}
            </h1>
            <p className="text-gray-700 max-w-xl text-left">
              To get started, review your current jobs and candidates, or update
              your profile to better manage your recruitment process.
            </p>
          </div>

          {/* Right: Sign Out Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>

        {/* Recruiter Profile Section */}
        <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg w-full max-w-full mx-auto mt-6 mb-6 relative">
          {/* Profile Picture */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            {recruiter.profilePic && (
              <img
                src={recruiter.profilePic}
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
              {recruiter.profilePic && (
                <button
                  onClick={handleRemovePic}
                  className="text-xs text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="mb-6 pr-40">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Recruiter Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>ID:</strong> {recruiter.recruiterId}
              </p>
              <p>
                <strong>Name:</strong> {recruiter.name}
              </p>
              <p>
                <strong>Email:</strong> {recruiter.email}
              </p>
              <p>
                <strong>Mobile:</strong> {recruiter.mobile}
              </p>
              <p>
                <strong>Designation:</strong> {recruiter.designation}
              </p>
              <p>
                <strong>Reporting To:</strong> {recruiter.reportingTo}
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                {new Date(recruiter.joiningDate).toLocaleDateString("en-IN")}
              </p>
              {/* Optional: Show password change button */}
              {/* <p>
        <button className="text-blue-600 underline text-sm">
          Change Password
        </button>
      </p> */}
            </div>
          </div>
        </div>

        {/* Rec Profile Session ends */}

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* LEFT - Summary Cards */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {summaryCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => navigate(card.path)}
                className="p-6 border rounded-lg flex justify-between items-center bg-white shadow cursor-pointer hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-bold text-blue-700">
                    {card.count}
                  </p>
                  <p className="text-sm text-gray-600">{card.subtitle}</p>
                </div>
                <div>{card.icon}</div>
              </div>
            ))}
          </div>

          {/* RIGHT - Current Requirements */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Current Requirements
            </h3>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm">
                <div className="flex items-center gap-2">
                  <ClipboardList className="text-blue-600 w-4 h-4" />
                  <p className="text-sm text-gray-600">Assigned Requirements</p>
                </div>
                <h4 className="text-sm font-semibold text-gray-800">4</h4>
              </div>

              <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-red-600 w-4 h-4" />
                  <p className="text-sm text-gray-600">High Priority</p>
                </div>
                <h4 className="text-sm font-semibold text-gray-800">1</h4>
              </div>

              <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-4 h-4" />
                  <p className="text-sm text-gray-600">Active Positions</p>
                </div>
                <h4 className="text-sm font-semibold text-gray-800">4</h4>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View All Requirements
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full min-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Requirements</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-red-500 font-bold text-lg"
                >
                  X
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Read-only view of requirements assigned to you for recruitment
              </p>
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Position</th>
                    <th className="p-2 border">Criticality</th>
                    <th className="p-2 border">Company</th>
                    <th className="p-2 border">Contact Person</th>
                    <th className="p-2 border">Talent Advisor</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRequirements.map((req) => (
                    <tr key={req.id} className="border">
                      <td className="p-2 text-blue-600 font-medium">
                        {req.position}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            req.criticality === "High"
                              ? "bg-red-100 text-red-700"
                              : req.criticality === "Medium"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {req.criticality}
                        </span>
                      </td>
                      <td className="p-2">{req.company}</td>
                      <td className="p-2">{req.contactPerson}</td>
                      <td className="p-2">{req.talentAdvisor}</td>
                      <td className="p-2 border text-center">
                        <button
                          onClick={() => handleMarkDone(req.id)}
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Mark Done
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {confirmId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Do you want to mark this requirement as completed?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmId(null)}
                  className="px-3 py-1 text-gray-700 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={() => archiveRequirement(confirmId)}
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-3">
          <div>
            <button
              onClick={handleUploadClick}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mr-5"
            >
              Upload Resume
            </button>

            <button
              onClick={() => navigate("/source-resume")}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Source Resume
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
                        onClick={handleSubmitReason}
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
              <button
                className="w-full py-3 bg-green-600 text-white text-lg rounded-xl shadow hover:bg-green-700"
                onClick={() => navigate("/funnel")}
              >
                Pipeline
              </button>
              <button
                className="w-full py-3 bg-yellow-500 text-white text-lg rounded-xl shadow hover:bg-yellow-400"
                onClick={() => navigate("/archived-candidates")}
              >
                Archived
              </button>
            </div>
          </div>

          {/* Right Column Buttons for large screens */}
          <div className="hidden lg:flex lg:w-[25%] flex-col gap-4">
            <button
              className="w-full py-3 bg-green-600 text-white text-lg rounded-xl shadow hover:bg-green-700"
              onClick={() => navigate("/funnel")}
            >
              Pipeline
            </button>
            <button
              className="w-full py-3 bg-yellow-500 text-white text-lg rounded-xl shadow hover:bg-yellow-400"
              onClick={() => navigate("/archived-candidates")}
            >
              Archived
            </button>
          </div>
        </div>

        {/* Recent Activities */}

        <div className="bg-white p-6 rounded-lg shadow max-w-full mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            {/* <button className="text-blue-600 hover:underline flex items-center gap-1">
              <FaEdit /> Edit Profile
            </button> */}
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
    </div>
  );
};

export default RecruiterDashboardMain;
