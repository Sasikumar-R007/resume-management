import React, { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaUserCheck,
  FaCalendarCheck,
  FaHandshake,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const RecruiterDashboardMain = () => {
  const navigate = useNavigate();
  const handleUploadClick = () => {
    // navigate("/upload-resume");
    navigate("/candidate-form");
  };

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
  const [showTrackerModal, setShowTrackerModal] = useState(false);

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

  // Interview Tracker Modal States
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    candidateName: "",
    position: "",
    client: "",
    interviewDate: "",
    interviewTime: "",
    interviewType: "",
    interviewRound: "",
    interviewFeedback: "",
    finalStatus: "",
  });

  const handleInterviewChange = (e) => {
    const { name, value } = e.target;
    setInterviewForm({ ...interviewForm, [name]: value });
  };

  // Add state for interviews and modal
  const [allInterviews, setAllInterviews] = useState([]);
  const [showTodayInterviewsModal, setShowTodayInterviewsModal] =
    useState(false);

  // Backend API base URL
  const API_BASE =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Helper to get today's date string
  const todayStr = getToday();

  // Filter today's interviews from allInterviews
  const todaysInterviews = allInterviews.filter(
    (i) => i.interviewDate === todayStr
  );

  // Add interview (update backend and re-fetch)
  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    const payload = { recruiterId: recruiter.recruiterId, ...interviewForm };
    try {
      const res = await fetch(`${API_BASE}/api/interviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setInterviewForm({
          candidateName: "",
          position: "",
          client: "",
          interviewDate: "",
          interviewTime: "",
          interviewType: "",
          interviewRound: "",
          interviewFeedback: "",
          finalStatus: "",
        });
        setShowInterviewModal(false);
        fetchAllInterviews();
      }
    } catch {}
  };

  // Update interview (PUT and re-fetch)
  const handleEditInterview = async (updated) => {
    try {
      const res = await fetch(`${API_BASE}/api/interviews/${updated._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setEditInterview(null);
        fetchAllInterviews();
      }
    } catch {}
  };

  // Remove interview by index
  const removeInterview = (idx) => {
    // This function is no longer needed as interviews are managed by allInterviews
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
        `${process.env.REACT_APP_API_BASE_URL}/api/archived`,
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
      contactPersonEmail: "david@example.com",
      talentAdvisor: "Lisa Wang",
    },
    {
      id: 2,
      position: "Backend Developer",
      criticality: "Low",
      company: "DataTech Solutions",
      contactPerson: "Tom Anderson",
      contactPersonEmail: "tom@example.com",
      talentAdvisor: "Lisa Wang",
    },
    {
      id: 3,
      position: "Data Scientist",
      criticality: "High",
      company: "AI Innovations",
      contactPerson: "Robert Kim",
      contactPersonEmail: "robert@example.com",
      talentAdvisor: "Lisa Wang",
    },
    {
      id: 4,
      position: "Quality Assurance Engineer",
      criticality: "Low",
      company: "TestPro Solutions",
      contactPerson: "Kevin Brown",
      contactPersonEmail: "kevin@example.com",
      talentAdvisor: "Lisa Wang",
    },
  ]);
  const [archivedRequirements, setArchivedRequirements] = useState([]);
  const [requirementCounts, setRequirementCounts] = useState({}); // { [reqId]: { [date]: count } }
  const [openCalendarId, setOpenCalendarId] = useState(null); // reqId of open calendar
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [inputCount, setInputCount] = useState("");
  const [calendarStep, setCalendarStep] = useState("calendar"); // 'calendar' or 'input'

  // Helper to get count for a requirement/date
  const getCountForReq = (reqId, date) => {
    return requirementCounts[reqId]?.[date] || "-";
  };

  // Helper to get the most recent date with a count for a requirement
  const getMostRecentDateForReq = (reqId) => {
    const counts = requirementCounts[reqId];
    if (!counts) return null;
    const dates = Object.keys(counts);
    if (dates.length === 0) return null;
    // Sort dates descending (latest first)
    dates.sort((a, b) => b.localeCompare(a));
    return dates[0];
  };

  // Simple calendar for current month
  const Calendar = ({ onDateClick, selected }) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const weeks = [];
    let day = 1 - startDay;
    for (let w = 0; w < 6; w++) {
      const week = [];
      for (let d = 0; d < 7; d++, day++) {
        if (day < 1 || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
        }
      }
      weeks.push(week);
    }
    return (
      <div className="bg-white dark:bg-gray-800 border rounded shadow p-4">
        <div className="text-center font-semibold mb-2 dark:text-gray-200">
          {today.toLocaleString("default", { month: "long" })} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="text-center font-bold dark:text-gray-200">
              {d}
            </div>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div key={i} className="grid grid-cols-7 gap-1">
            {week.map((d, j) => {
              if (!d) return <div key={j}></div>;
              const dateStr = `${year}-${String(month + 1).padStart(
                2,
                "0"
              )}-${String(d).padStart(2, "0")}`;
              const isSelected = selected === dateStr;
              return (
                <button
                  key={j}
                  className={`w-7 h-7 rounded-full text-center ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-gray-200"
                  } ${dateStr === getToday() ? "border border-blue-400" : ""}`}
                  onClick={() => onDateClick(dateStr)}
                >
                  {d}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

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

  const handleOpenAddInterview = () => {
    setInterviewForm((form) => ({
      ...form,
      interviewDate: getToday(),
    }));
    setShowInterviewModal(true);
  };

  const [editInterview, setEditInterview] = useState(null);

  // Fetch all interviews for recruiter
  const fetchAllInterviews = () => {
    if (recruiter.recruiterId) {
      fetch(`${API_BASE}/api/interviews?recruiterId=${recruiter.recruiterId}`)
        .then((res) => res.json())
        .then((data) => setAllInterviews(data))
        .catch(() => setAllInterviews([]));
    }
  };

  useEffect(() => {
    fetchAllInterviews();
    // eslint-disable-next-line
  }, [recruiter.recruiterId]);

  // Helper to count pending cases
  const pendingCasesCount = allInterviews.filter(
    (i) => i.finalStatus !== "Joined/Closure" && i.finalStatus !== "Rejected"
  ).length;

  const [showContributionModal, setShowContributionModal] = useState(false);
  const [contributionLevel, setContributionLevel] = useState("85%"); // placeholder
  const [teamLeaderMsg, setTeamLeaderMsg] = useState(
    "Great job on your recent closures!"
  ); // placeholder
  const [adminMsg, setAdminMsg] = useState("Keep up the good work."); // placeholder
  const [closures, setClosures] = useState([
    { name: "Adhitya – Tracx", date: "2024-06-01" },
    { name: "Ravi Kumar – CodeLabs", date: "2024-05-15" },
    { name: "Priya M – WebFusion", date: "2024-04-20" },
  ]);

  const lastClosure = closures.length > 0 ? closures[0] : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6 dark:bg-gray-900">
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-4">
          {/* Left: Welcome Message */}
          <div>
            <h1 className="text-3xl font-bold mb-2 text-left text-gray-800 dark:text-white">
              Welcome {recruiter.name}
            </h1>
            <p className="text-gray-700 max-w-xl text-left dark:text-gray-300">
              To get started, review your current jobs and candidates, or update
              your profile to better manage your recruitment process.
            </p>
          </div>

          {/* Right: Sign Out Button */}
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

        {/* Recruiter Profile Section */}
        <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg w-full max-w-full mx-auto mt-6 mb-6 relative">
          {/* Profile Picture */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            {recruiter.profilePic && (
              <img
                src={recruiter.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border dark:border-gray-700"
              />
            )}
            <div className="flex gap-2 mt-2">
              <label className="text-xs text-blue-500 cursor-pointer dark:text-blue-400">
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
                  className="text-xs text-red-500 dark:text-red-400"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="mb-6 pr-40">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Recruiter Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm text-gray-700 dark:text-gray-200">
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

        {/* Recruiter Dashboard Layout Fixed */}

        <div className="flex flex-col gap-6 mb-6">
          {/* Top Row - 3 Summary Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active Jobs */}
            <div
              className="p-6 border rounded-2xl bg-white shadow cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700"
              onClick={() => navigate(summaryCards[0]?.path)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {summaryCards[0]?.title}
                </h3>
                <p className="text-3xl font-bold text-blue-700">
                  {summaryCards[0]?.count}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {summaryCards[0]?.subtitle}
                </p>
              </div>
              <div className="mt-2">{summaryCards[0]?.icon}</div>
            </div>

            {/* Second Summary Card */}
            <div
              className="p-6 border rounded-2xl bg-white shadow cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700"
              onClick={() => navigate(summaryCards[1]?.path)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {summaryCards[1]?.title}
                </h3>
                <p className="text-3xl font-bold text-blue-700">
                  {summaryCards[1]?.count}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {summaryCards[1]?.subtitle}
                </p>
              </div>
              <div className="mt-2">{summaryCards[1]?.icon}</div>
            </div>

            {/* Interview Tracker */}
            <div className="p-6 h-full border rounded-2xl bg-white shadow hover:shadow-xl transition flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-3 dark:text-gray-200">
                Interview Tracker
              </h3>
              <div className="flex justify-between items-start text-center pb-1">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 underline dark:text-gray-400">
                    Today's Schedule
                  </p>
                  <button
                    className="text-4xl font-bold text-blue-700 mt-1 focus:outline-none hover:underline"
                    onClick={() => setShowTodayInterviewsModal(true)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {todaysInterviews.length}
                  </button>
                  <button
                    className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleOpenAddInterview}
                  >
                    Add Interview
                  </button>
                </div>
                <div className="border-l h-16 mx-4"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 underline dark:text-gray-400">
                    Pending Cases
                  </p>
                  <p className="text-4xl font-bold text-blue-700 mt-1">
                    {pendingCasesCount}
                  </p>
                  <button
                    className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={() => setShowTrackerModal(true)}
                  >
                    View Tracker
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showInterviewModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">
                  Add Interview
                </h2>
                <form
                  onSubmit={handleInterviewSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    name="candidateName"
                    value={interviewForm.candidateName}
                    onChange={handleInterviewChange}
                    placeholder="Candidate Name"
                    className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    required
                  />
                  <input
                    name="position"
                    value={interviewForm.position}
                    onChange={handleInterviewChange}
                    placeholder="Position"
                    className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    required
                  />
                  <input
                    name="client"
                    value={interviewForm.client}
                    onChange={handleInterviewChange}
                    placeholder="Client"
                    className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    required
                  />
                  <div className="flex gap-2">
                    <input
                      type="date"
                      name="interviewDate"
                      value={interviewForm.interviewDate}
                      onChange={handleInterviewChange}
                      className="border p-2 rounded w-1/2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      required
                    />
                    <input
                      type="time"
                      name="interviewTime"
                      value={interviewForm.interviewTime}
                      onChange={handleInterviewChange}
                      className="border p-2 rounded w-1/2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      required
                    />
                  </div>

                  <select
                    name="interviewType"
                    value={interviewForm.interviewType}
                    onChange={handleInterviewChange}
                    className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    required
                  >
                    <option value="">Interview Type</option>
                    <option>Telephonic</option>
                    <option>Face 2 Face</option>
                    <option>Video Conference</option>
                    <option>Assignment</option>
                  </select>

                  <select
                    name="interviewRound"
                    value={interviewForm.interviewRound}
                    onChange={handleInterviewChange}
                    className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    required
                  >
                    <option value="">Interview Round</option>
                    <option>Intro</option>
                    <option>Assignment</option>
                    <option>L1</option>
                    <option>L2</option>
                    <option>L3</option>
                    <option>L4</option>
                    <option>L5</option>
                    <option>L6</option>
                    <option>L7</option>
                    <option>HR Round</option>
                    <option>Final Round</option>
                    <option>Offer Discussion</option>
                    <option>Additional Discussion</option>
                  </select>

                  <select
                    name="interviewFeedback"
                    value={interviewForm.interviewFeedback}
                    onChange={handleInterviewChange}
                    className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    required
                  >
                    <option value="">Interview Feedback</option>
                    <option>Intro Scheduled</option>
                    <option>Intro Reject</option>
                    <option>Assignment Scheduled</option>
                    <option>Assignment Reject</option>
                    <option>L1 Scheduled</option>
                    <option>L1 Reject</option>
                    <option>L2 Scheduled</option>
                    <option>L2 Reject</option>
                    <option>L3 Scheduled</option>
                    <option>L3 Reject</option>
                    <option>L4 Scheduled</option>
                    <option>L4 Reject</option>
                    <option>L5 Scheduled</option>
                    <option>L5 Reject</option>
                    <option>L6 Scheduled</option>
                    <option>L6 Reject</option>
                    <option>L7 Scheduled</option>
                    <option>L7 Reject</option>
                    <option>HR Round Scheduled</option>
                    <option>HR Round Reject</option>
                    <option>Final Round Scheduled</option>
                    <option>Final Round Reject</option>
                    <option>Offer Discussion Scheduled</option>
                    <option>Offer Discussion Reject</option>
                    <option>Additional Discussion Scheduled</option>
                    <option>Additional Discussion Reject</option>
                    <option>Next Round Schedule Pending</option>
                  </select>

                  <select
                    name="finalStatus"
                    value={interviewForm.finalStatus}
                    onChange={handleInterviewChange}
                    className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    required
                  >
                    <option value="">Final Status</option>
                    <option>Rejected</option>
                    <option>Position On-Hold</option>
                    <option>Schedule Pending</option>
                    <option>Offer Roll Out</option>
                    <option>Offer Signing Pending</option>
                    <option>Offer & Joining Pending</option>
                    <option>Joined/Closure</option>
                  </select>

                  <div className="col-span-2 flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowInterviewModal(false)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Bottom Row - Requirements + Contributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Requirements */}
            <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Current Requirements
              </h3>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="text-blue-600 w-4 h-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Assigned Requirements
                    </p>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800">4</h4>
                </div>

                <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-red-600 w-4 h-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      High Priority
                    </p>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800">1</h4>
                </div>

                <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600 w-4 h-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Active Positions
                    </p>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800">4</h4>
                </div>

                {/* wate space */}
                <div className="flex justify-between items-center bg-white px-4 pb-12 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700 dark:text-gray-200">
                  <div className="flex items-center"></div>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                View All Requirements
              </button>
            </div>

            {/* Overall Contributions with shaded blocks */}
            <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Overall Contribution
              </h3>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tenure
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    4 Quarters
                  </p>
                </div>

                <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Closures
                  </p>
                  <p className="text-sm font-semibold text-gray-800">3</p>
                </div>

                <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recent Closure
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    Adhitya – Tracx
                  </p>
                </div>

                <div className="flex justify-between items-center bg-gray-100 px-4 py-4 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last Closure
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    1M 15 Days
                  </p>
                </div>
              </div>

              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => setShowContributionModal(true)}
              >
                View Contribution
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full min-h-[80vh] overflow-y-auto dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold dark:text-gray-200">
                  Your Requirements
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-red-500 font-bold text-lg dark:text-red-500"
                >
                  X
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">
                Read-only view of requirements assigned to you for recruitment
              </p>
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                  <tr>
                    <th className="p-2 border dark:text-gray-200">Position</th>
                    <th className="p-2 border dark:text-gray-200">
                      Criticality
                    </th>
                    <th className="p-2 border dark:text-gray-200">Company</th>
                    <th className="p-2 border dark:text-gray-200">SPOC</th>
                    <th className="p-2 border dark:text-gray-200">
                      SPOC Email
                    </th>
                    <th className="p-2 border dark:text-gray-200">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRequirements.map((req) => (
                    <tr key={req.id} className="border dark:border-gray-600">
                      <td className="p-2 text-blue-600 font-medium dark:text-blue-400">
                        {req.position}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs dark:text-gray-200 ${
                            req.criticality === "High"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
                              : req.criticality === "Medium"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {req.criticality}
                        </span>
                      </td>
                      <td className="p-2 dark:text-gray-200">{req.company}</td>
                      <td className="p-2 dark:text-gray-200">
                        {req.contactPerson}
                      </td>
                      <td className="p-2 dark:text-gray-200">
                        {req.contactPersonEmail}
                      </td>
                      <td className="p-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                          onClick={() => {
                            setOpenCalendarId(req.id);
                            const mostRecentDate = getMostRecentDateForReq(
                              req.id
                            );
                            setSelectedDate(mostRecentDate || getToday());
                            setInputCount(
                              requirementCounts[req.id]?.[mostRecentDate] || ""
                            );
                            setCalendarStep("calendar");
                          }}
                        >
                          {getCountForReq(
                            req.id,
                            getMostRecentDateForReq(req.id)
                          ) === "-"
                            ? "Set"
                            : `${getCountForReq(
                                req.id,
                                getMostRecentDateForReq(req.id)
                              )} (${getMostRecentDateForReq(req.id)})`}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {openCalendarId && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-2xl p-8 relative w-full max-w-md flex flex-col items-center">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 focus:outline-none"
                onClick={() => {
                  setOpenCalendarId(null);
                  setCalendarStep("calendar");
                }}
                aria-label="Close"
              >
                ×
              </button>
              <div className="w-full flex flex-col items-center">
                <div className="mb-6 text-xl font-bold text-center dark:text-gray-100">
                  Select a Date for Count
                </div>
                {calendarStep === "calendar" ? (
                  <>
                    <div className="mb-4 w-full flex justify-center">
                      <Calendar
                        selected={selectedDate}
                        onDateClick={(dateStr) => {
                          setSelectedDate(dateStr);
                          setInputCount(
                            requirementCounts[openCalendarId]?.[dateStr] || ""
                          );
                          setCalendarStep("input");
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4 text-lg font-semibold dark:text-gray-200">
                      Set Count for {selectedDate}
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="border px-3 py-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 mb-4"
                      value={inputCount}
                      onChange={(e) => setInputCount(e.target.value)}
                      placeholder="Count"
                      autoFocus
                    />
                    <div className="flex gap-4 mt-2 w-full justify-center">
                      <button
                        className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 text-sm font-semibold"
                        onClick={() => setCalendarStep("calendar")}
                      >
                        Back
                      </button>
                      <button
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 text-sm font-semibold"
                        onClick={() => {
                          setRequirementCounts((prev) => ({
                            ...prev,
                            [openCalendarId]: {
                              ...(prev[openCalendarId] || {}),
                              [selectedDate]: inputCount,
                            },
                          }));
                          setOpenCalendarId(null);
                          setCalendarStep("calendar");
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* {confirmId && (
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
        )} */}

        <div className="flex justify-between items-center mb-3 dark:text-gray-200">
          <div>
            <button
              onClick={handleUploadClick}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mr-5 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Upload Resume
            </button>

            <button
              onClick={() => navigate("/source-resume")}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition dark:bg-blue-600 dark:hover:bg-blue-700  "
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
            className="bg-blue-600 text-white ml-4 px-4 py-2 rounded-lg hover:bg-blue-700 transition dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Job
          </button>
        </div>

        {/* Candidate Status */}

        <div className="flex flex-col lg:flex-row gap-4 my-5 w-full">
          {/* Left Column */}
          <div className="lg:w-[75%] w-full bg-white rounded-2xl shadow p-4 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">
              Candidate Status
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                    <th className="p-2 dark:text-gray-200">S.No.</th>
                    <th className="p-2 dark:text-gray-200">Name</th>
                    <th className="p-2 dark:text-gray-200">Job Title</th>
                    <th className="p-2 dark:text-gray-200">Company</th>
                    <th className="p-2 dark:text-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCandidates.map((cand, index) => (
                    <tr
                      key={cand.id}
                      className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <td className="p-2 dark:text-gray-200">{index + 1}</td>
                      <td
                        className="p-2 text-blue-600 cursor-pointer hover:underline dark:text-blue-400"
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
                      <td className="p-2 dark:text-gray-200">{cand.company}</td>
                      <td className="p-2">
                        <select
                          className="border px-2 py-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
                  <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-center dark:text-gray-200">
                      Reason for Screening Out
                    </h3>

                    <div className="mb-4">
                      <label className="block mb-1 font-medium">
                        Select Reason
                      </label>
                      <select
                        className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
                        className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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

        <div className="bg-white p-6 rounded-lg shadow max-w-full mx-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold dark:text-gray-200">
              Recent Activity
            </h2>
            {/* <button className="text-blue-600 hover:underline flex items-center gap-1">
              <FaEdit /> Edit Profile
            </button> */}
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            {recentActivities.map((item, idx) => (
              <li key={idx} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {showTodayInterviewsModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 focus:outline-none"
                onClick={() => setShowTodayInterviewsModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-6 text-xl font-bold text-center dark:text-gray-100">
                Today's Interviews
              </div>
              {todaysInterviews.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-300">
                  No interviews scheduled for today.
                </div>
              ) : (
                <table className="min-w-full text-sm text-left border mb-4">
                  <thead className="bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                    <tr>
                      <th className="p-2 border dark:text-gray-200">
                        Candidate
                      </th>
                      <th className="p-2 border dark:text-gray-200">
                        Position
                      </th>
                      <th className="p-2 border dark:text-gray-200">Client</th>
                      <th className="p-2 border dark:text-gray-200">Time</th>
                      <th className="p-2 border dark:text-gray-200">Type</th>
                      <th className="p-2 border dark:text-gray-200">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysInterviews.map((i, idx) => (
                      <tr key={idx} className="border dark:border-gray-600">
                        <td className="p-2">{i.candidateName}</td>
                        <td className="p-2">{i.position}</td>
                        <td className="p-2">{i.client}</td>
                        <td className="p-2">{i.interviewTime}</td>
                        <td className="p-2">{i.interviewType}</td>
                        <td className="p-2">
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() =>
                              removeInterview(
                                allInterviews.findIndex((intv) => intv === i)
                              )
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="flex justify-end">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setShowTodayInterviewsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showTrackerModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-2xl p-8 w-full max-w-3xl relative">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 focus:outline-none"
                onClick={() => setShowTrackerModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-6 text-xl font-bold text-center dark:text-gray-100">
                All Interviews (Pending Cases)
              </div>
              {allInterviews.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-300">
                  No interviews found.
                </div>
              ) : (
                <table className="min-w-full text-sm text-left border mb-4">
                  <thead className="bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-600">
                    <tr>
                      <th className="p-2 border dark:text-gray-200">
                        Candidate
                      </th>
                      <th className="p-2 border dark:text-gray-200">
                        Position
                      </th>
                      <th className="p-2 border dark:text-gray-200">Client</th>
                      <th className="p-2 border dark:text-gray-200">Date</th>
                      <th className="p-2 border dark:text-gray-200">Time</th>
                      <th className="p-2 border dark:text-gray-200">Status</th>
                      <th className="p-2 border dark:text-gray-200">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInterviews.map((i) => (
                      <tr key={i._id} className="border dark:border-gray-600">
                        <td className="p-2">{i.candidateName}</td>
                        <td className="p-2">{i.position}</td>
                        <td className="p-2">{i.client}</td>
                        <td className="p-2">{i.interviewDate}</td>
                        <td className="p-2">{i.interviewTime}</td>
                        <td className="p-2">{i.finalStatus}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => setEditInterview(i)}
                          >
                            Change Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="flex justify-end">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setShowTrackerModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Interview Modal */}
        {editInterview && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 focus:outline-none"
                onClick={() => setEditInterview(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-6 text-xl font-bold text-center dark:text-gray-100">
                Edit Interview
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditInterview(editInterview);
                }}
                className="space-y-4"
              >
                <input
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.candidateName}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      candidateName: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.position}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      position: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.client}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      client: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="date"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.interviewDate}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      interviewDate: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="time"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.interviewTime}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      interviewTime: e.target.value,
                    })
                  }
                  required
                />
                <select
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.interviewType}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      interviewType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Interview Type</option>
                  <option>Telephonic</option>
                  <option>Face 2 Face</option>
                  <option>Video Conference</option>
                  <option>Assignment</option>
                </select>
                <select
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.interviewRound}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      interviewRound: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Interview Round</option>
                  <option>Intro</option>
                  <option>Assignment</option>
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
                  <option>L4</option>
                  <option>L5</option>
                  <option>L6</option>
                  <option>L7</option>
                  <option>HR Round</option>
                  <option>Final Round</option>
                  <option>Offer Discussion</option>
                  <option>Additional Discussion</option>
                </select>
                <select
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.interviewFeedback}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      interviewFeedback: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Interview Feedback</option>
                  <option>Intro Scheduled</option>
                  <option>Intro Reject</option>
                  <option>Assignment Scheduled</option>
                  <option>Assignment Reject</option>
                  <option>L1 Scheduled</option>
                  <option>L1 Reject</option>
                  <option>L2 Scheduled</option>
                  <option>L2 Reject</option>
                  <option>L3 Scheduled</option>
                  <option>L3 Reject</option>
                  <option>L4 Scheduled</option>
                  <option>L4 Reject</option>
                  <option>L5 Scheduled</option>
                  <option>L5 Reject</option>
                  <option>L6 Scheduled</option>
                  <option>L6 Reject</option>
                  <option>L7 Scheduled</option>
                  <option>L7 Reject</option>
                  <option>HR Round Scheduled</option>
                  <option>HR Round Reject</option>
                  <option>Final Round Scheduled</option>
                  <option>Final Round Reject</option>
                  <option>Offer Discussion Scheduled</option>
                  <option>Offer Discussion Reject</option>
                  <option>Additional Discussion Scheduled</option>
                  <option>Additional Discussion Reject</option>
                  <option>Next Round Schedule Pending</option>
                </select>
                <select
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  value={editInterview.finalStatus}
                  onChange={(e) =>
                    setEditInterview({
                      ...editInterview,
                      finalStatus: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Final Status</option>
                  <option>Rejected</option>
                  <option>Position On-Hold</option>
                  <option>Schedule Pending</option>
                  <option>Offer Roll Out</option>
                  <option>Offer Signing Pending</option>
                  <option>Offer & Joining Pending</option>
                  <option>Joined/Closure</option>
                </select>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setEditInterview(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {showContributionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 focus:outline-none"
              onClick={() => setShowContributionModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-6 text-xl font-bold text-center dark:text-gray-100">
              Contribution Details
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2 dark:text-gray-200">
                Closures
              </div>
              {closures.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-300">
                  No closures yet.
                </div>
              ) : (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 mb-2">
                  {closures.map((c, idx) => (
                    <li key={idx}>
                      {c.name}{" "}
                      <span className="text-xs text-gray-500 ml-2">
                        ({c.date})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4">
              <div className="font-semibold dark:text-gray-200">
                Last Closure Date
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                {lastClosure ? lastClosure.date : "N/A"}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold dark:text-gray-200 mb-1">
                Contribution Level
              </div>
              <div className="border rounded p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                {contributionLevel}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold dark:text-gray-200 mb-1">
                Message from Team Leader
              </div>
              <div className="border rounded p-2 bg-blue-50 dark:bg-blue-900 dark:text-gray-200">
                {teamLeaderMsg}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold dark:text-gray-200 mb-1">
                Message from Admin
              </div>
              <div className="border rounded p-2 bg-green-50 dark:bg-green-900 dark:text-gray-200">
                {adminMsg}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowContributionModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboardMain;
