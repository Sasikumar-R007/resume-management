import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ExternalLink, UserCircle } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ProfileContext } from "./ProfileContext";
import CandidateForm from "./CandidateForm";
import axios from "axios";

const CandidateDashboard = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const navigate = useNavigate();

  const API_BASE =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const navItems = ["Dashboard", "Job Board", "Settings"];

  const { profile, setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const [projects, setProjects] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [skills, setSkills] = useState({
    primary: "",
    secondary: "",
    knowledge: "",
  });
  const [newProject, setNewProject] = useState({ name: "", link: "" });

  const handleChangeBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("bannerImage", file);
    try {
      const res = await fetch(`${API_BASE}/upload-banner`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setProfile((prev) => ({
        ...prev,
        bannerUrl: data.bannerUrl || URL.createObjectURL(file),
      }));
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  const handleRemoveBanner = () => {
    setProfile((prev) => ({ ...prev, bannerUrl: "" }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch(`${API_BASE}/upload-profile-image`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // ✅ Step 1: Debug log
      console.log("📦 Upload response:", data);

      // ✅ Step 2: Check if data and candidate object exist
      if (!data || typeof data !== "object" || !data.candidate) {
        console.error("❌ Invalid data structure from API:", data);
        return;
      }

      // ✅ Step 3: Check if candidate object is valid
      const candidate = data.candidate;
      if (
        typeof candidate !== "object" ||
        !candidate.firstName ||
        !candidate.primaryEmail
      ) {
        console.error("❌ Invalid candidate data structure:", candidate);
        return;
      }

      // ✅ Step 4: Safely update profile context
      setProfile((prev) => ({
        ...prev,
        ...candidate,
      }));
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const handleRemoveImage = () => {
    setProfile((prev) => ({ ...prev, profileImage: "" }));
  };

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const [resumeFile, setResumeFile] = useState(null);

  const [appliedJobs] = useState([
    {
      id: "job001",
      title: "Frontend Developer",
      company: "TechCorp",
      type: "Full-Time",
      status: "Shortlisted",
    },
    {
      id: "job002",
      title: "UI/UX Designer",
      company: "Designify",
      type: "Internship",
      status: "Interview",
    },
    {
      id: "job003",
      title: "Backend Developer",
      company: "CodeLabs",
      type: "Full-Time",
      status: "Rejected",
    },
    {
      id: "job004",
      title: "QA Tester",
      company: "BugCatchers",
      type: "Internship",
      status: "Shortlisted",
    },
    {
      id: "job005",
      title: "Mobile App Dev",
      company: "AppLogic",
      type: "Full-Time",
      status: "Interview",
    },
    {
      id: "job006",
      title: "Product Designer",
      company: "PixelMint",
      type: "Full-Time",
      status: "Shortlisted",
    },
  ]);

  const [suggestedJobs] = useState([
    { title: "Data Analyst", company: "InsightSoft", type: "Full-Time" },
    { title: "DevOps Engineer", company: "CloudBase", type: "Internship" },
    { title: "Software Tester", company: "BugWorld", type: "Full-Time" },
    { title: "React Developer", company: "WebFusion", type: "Internship" },
    { title: "Business Analyst", company: "AgileWorks", type: "Full-Time" },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "text-green-600";
      case "Interview":
        return "text-blue-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get(`${API_BASE_URL}/api/jobs`);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/candidate-auth";
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4 space-y-4 fixed h-full pt-20">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedNav(item)}
            className={`text-left hover:bg-gray-700 px-3 py-2 rounded ${
              selectedNav === item ? "bg-gray-700" : ""
            }`}
          >
            {item}
          </button>
        ))}

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut} // Define this function
          className="text-left hover:bg-red-600 hover:text-white text-red-500 px-3 py-2 rounded mt-4"
        >
          Sign Out
        </button>
      </div>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50 ">
        <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? <X size={28} color="white" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileNavOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-40">
          <h2 className="text-2xl font-bold mb-4 mt-10">Candidate</h2>
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedNav(item);
                setIsMobileNavOpen(false);
              }}
              className={`text-left hover:bg-gray-700 px-3 py-2 rounded w-full ${
                selectedNav === item ? "bg-gray-700" : ""
              }`}
            >
              {item}
            </button>
          ))}

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut} // Define this function
            className="text-left w-full hover:bg-red-600 hover:text-white text-red-500 px-3 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen  md:ml-64">
        {/* Top Banner Section */}
        {/* Banner Section */}
        <div className="relative w-full">
          {/* Banner Image */}
          <div className="relative group">
            <img
              src={
                profile?.bannerUrl
                  ? `${API_BASE}${profile.bannerUrl}`
                  : "/default-banner.jpg"
              }
              alt="Banner"
              className="w-full h-48 object-cover"
            />
            {/* Hover options for banner */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <label className="bg-white text-sm px-3 py-1 rounded cursor-pointer mr-2">
                Change
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChangeBanner} // Keep same function logic as recruiter
                />
              </label>
              {profile.bannerUrl && (
                <button
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                  onClick={handleRemoveBanner}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-70px] group">
            <img
              src={
                profile?.profileImage
                  ? `${API_BASE}${profile.profileImage}`
                  : "/default-profile.jpg"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
            {/* Hover options for profile */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition">
              <label className="bg-white text-xs px-2 py-1 rounded cursor-pointer mr-1">
                Change
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {profile.profileImage && (
                <button
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                  onClick={handleRemoveImage}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Row: Contribution, LinkedIn, Edit */}
        <div className="flex justify-between items-center mt-5 px-6">
          <p className="font-semibold text-gray-700">
            Total Contribution <br />
            <span className="text-xl">₹{profile.totalContribution || "0"}</span>
          </p>

          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-700"
            >
              <FaLinkedin className="w-5 h-5 text-white" />
            </a>

            <button
              onClick={() => setShowEdit(true)} // Keep same edit logic
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Candidate Info */}
        <div className="text-center mt-3">
          <h2 className="text-xl font-bold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-600 font-bold">
            {profile.currentRole}{" "}
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              {profile.candidateId}
            </span>
          </p>
          <p className="text-gray-500 text-sm mt-1">
            📞 {profile.mobile} &nbsp; ✉️ {profile.primaryEmail}
          </p>
          <p className="text-gray-400 text-sm">
            Current Company: {profile.currentCompany || "N/A"}
          </p>
          <p className="text-gray-400 text-sm">
            Experience: {profile.experience || "0"} years
          </p>
        </div>

        {/* before ui */}
        {selectedNav === "Dashboard" && (
          <div>
            {/* Profile Section */}
            <div className="border p-4 rounded shadow bg-white">
              {/* Welcome Line */}
              <h2 className="text-2xl font-semibold mb-1">
                Welcome, {profile.firstName}
              </h2>
              <p className="text-gray-600 mb-4">
                Hope you're having a great day! Here's your profile overview:
              </p>

              {/* Top Grid: Profile Info + Image */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Profile Details */}
                <div className="md:w-2/3 space-y-2 text-sm">
                  <div className="flex">
                    <span className="w-48 font-semibold">Candidate ID:</span>
                    <span>{profile.candidateId}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Name:</span>
                    <span>
                      {profile.firstName} {profile.lastName}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Email:</span>
                    <span>{profile.primaryEmail}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Mobile:</span>
                    <span>{profile.mobile}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Designation:</span>
                    <span>{profile.currentRole}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Experience:</span>
                    <span>{profile.experience} years</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Current Company:</span>
                    <span>
                      {profile.currentCompany} | {profile.companySector} |{" "}
                      {profile.companyLevel}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Primary Skill:</span>
                    <span>{profile.primarySkill}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Secondary Skill:</span>
                    <span>{profile.secondarySkill}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Knowledge Only:</span>
                    <span>{profile.knowledgeOnly}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">
                      Current Location:
                    </span>
                    <span>{profile.currentLocation}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">
                      Preferred Location:
                    </span>
                    <span>{profile.preferredLocation}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">LinkedIn:</span>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {profile.linkedin}
                    </a>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-semibold">Portfolio:</span>
                    <a
                      href={profile.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {profile.portfolio}
                    </a>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => setShowEdit(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                </div>

                {/* Right: Profile Image */}
                <div className="md:w-1/3 flex justify-center items-start">
                  {" "}
                  <div className="relative group w-48 h-48 rounded-full flex items-center justify-center overflow-hidden bg-gray-200">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle className="text-gray-500 w-20 h-20 m-auto" />
                    )}

                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white text-xs space-y-1 text-center">
                        <label className="cursor-pointer block">
                          <span className="underline text-xl hover:text-gray-300">
                            Change
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={handleRemoveImage}
                          className="underline text-xl hover:text-gray-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              {/* <hr className="my-6" />  */}
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full md:w-1/2 space-y-6 bg-white p-4 rounded shadow">
                {/* Skill Section */}
                <div className="mt-6 bg-gray-100 p-2 rounded">
                  <h4 className="text-lg font-semibold mb-2 flex justify-between items-center">
                    Skills
                    <button
                      onClick={() => setShowSkillModal(true)}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                  </h4>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    {skills.primary && (
                      <li>
                        <strong>Primary Skills:</strong> {skills.primary}
                      </li>
                    )}
                    {skills.secondary && (
                      <li>
                        <strong>Secondary Skills:</strong> {skills.secondary}
                      </li>
                    )}
                    {skills.knowledge && (
                      <li>
                        <strong>Knowledge Only:</strong> {skills.knowledge}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Projects Section */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2 flex justify-between items-center">
                    Projects
                    <button
                      onClick={() => setShowProjectModal(true)}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 mr-2 rounded"
                    >
                      Add
                    </button>
                  </h4>

                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 relative"
                      >
                        {/* Project Title + Actions */}
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold text-base text-gray-800 dark:text-white">
                            {project.name}
                          </h5>

                          <div className="flex gap-3 items-center">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                                title="Open Project"
                              >
                                <FiExternalLink size={18} />
                              </a>
                            )}
                            <button
                              onClick={() => {
                                const updatedProjects = [...projects];
                                updatedProjects.splice(index, 1);
                                setProjects(updatedProjects);
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Delete Project"
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* <div className="mt-4">
                      <button
                        onClick={() => navigate("/candidate-details")}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                      >
                        View Candidate
                      </button>
                    </div> */}
                </div>

                {/* Skill Section */}
                {showSkillModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                      <h3 className="text-xl font-semibold mb-4">
                        Edit Skills
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Primary Skills
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Python, SQL"
                            value={skills.primary}
                            onChange={(e) =>
                              setSkills({ ...skills, primary: e.target.value })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Secondary Skills
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Java, MongoDB"
                            value={skills.secondary}
                            onChange={(e) =>
                              setSkills({
                                ...skills,
                                secondary: e.target.value,
                              })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Knowledge Only
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., C++, HTML"
                            value={skills.knowledge}
                            onChange={(e) =>
                              setSkills({
                                ...skills,
                                knowledge: e.target.value,
                              })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-6">
                        <button
                          onClick={() => setShowSkillModal(false)}
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setShowSkillModal(false)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Section */}
                {showProjectModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                      <h3 className="text-xl font-semibold mb-4">
                        Add Project
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Project Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Resume Builder App"
                            value={newProject.name}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                name: e.target.value,
                              })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Live Link (optional)
                          </label>
                          <input
                            type="text"
                            placeholder="https://example.com"
                            value={newProject.link}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                link: e.target.value,
                              })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Project Description
                          </label>
                          <textarea
                            placeholder="Describe your project briefly"
                            value={newProject.description}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                description: e.target.value,
                              })
                            }
                            className="border h-24 p-2 w-full rounded"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-6">
                        <button
                          onClick={() => setShowProjectModal(false)}
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (newProject.name.trim()) {
                              setProjects([...projects, newProject]);
                              setNewProject({
                                name: "",
                                link: "",
                                description: "",
                              });
                              setShowProjectModal(false);
                            }
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resume Section */}
              <div className="w-full md:w-1/2 bg-white p-4 rounded shadow space-y-4">
                <h4 className="text-lg font-semibold mb-2">Resume</h4>
                {resumeFile || profile.resumeLink ? (
                  <div className="space-y-3">
                    {(() => {
                      const file = resumeFile
                        ? URL.createObjectURL(resumeFile)
                        : profile.resumeLink;

                      const isImage = file && file.match(/\.(jpg|jpeg|png)$/i);

                      return file ? (
                        isImage ? (
                          <img
                            src={file}
                            alt="Resume Preview"
                            className="w-full h-auto max-h-[400px] rounded border"
                          />
                        ) : (
                          <iframe
                            src={file}
                            title="Resume"
                            className="w-full h-96 rounded border"
                          />
                        )
                      ) : (
                        <p className="text-gray-500">No resume uploaded</p>
                      );
                    })()}

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setResumeFile(null);
                          setProfile({ ...profile, resumeLink: "" }); // clear from UI
                          // You can optionally send a PATCH request here to remove it from DB
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>

                      <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
                        Change
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setResumeFile(e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="block border border-dashed border-gray-400 p-6 text-center cursor-pointer rounded hover:bg-gray-50">
                    <p className="text-gray-600 mb-2">
                      Click to upload resume (PDF or Image)
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Edit Modal */}
            {showEdit && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto">
                <div className="bg-gray-100 mx-4 p-6 rounded-lg w-full max-w-6xl shadow-xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl mx-6 font-semibold">
                      Edit Your Profile
                    </h3>
                    <button
                      onClick={() => setShowEdit(false)}
                      className="text-gray-500 mx-6 hover:text-gray-700 text-2xl"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Your form component */}
                  <CandidateForm
                    initialData={profile}
                    onSave={(updatedData) => {
                      setProfile(updatedData);
                      setShowEdit(false);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Applied Jobs and Suggestions Section */}
            <div className="mt-3">
              <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto mt-8">
                <div className="w-full lg:w-2/3 bg-white dark:bg-gray-900 p-6 rounded shadow">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Applied Jobs
                  </h2>
                  <table className="w-full border-collapse border text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border px-2 py-1">S.No</th>
                        <th className="border px-2 py-1">Job Title</th>
                        <th className="border px-2 py-1">Company</th>
                        <th className="border px-2 py-1">Type</th>
                        <th className="border px-2 py-1">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appliedJobs.slice(0, 5).map((job, i) => (
                        <tr
                          key={job.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate(`/job/${job.id}`)}
                        >
                          <td className="border px-2 py-1">{i + 1}</td>
                          <td className="border px-2 py-1">{job.title}</td>
                          <td className="border px-2 py-1">{job.company}</td>
                          <td className="border px-2 py-1">{job.type}</td>
                          <td
                            className={`border px-2 py-1 font-medium ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {job.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {appliedJobs.length > 5 && (
                    <p
                      className="text-right text-blue-600 cursor-pointer mt-2"
                      onClick={() => alert("See more coming soon")}
                    >
                      See more...
                    </p>
                  )}
                </div>

                {/* Suggested Jobs */}
                <div className="w-full lg:w-1/3 bg-white dark:bg-gray-900 p-6 rounded shadow">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Job Suggestions
                  </h2>
                  <ul className="space-y-3">
                    {suggestedJobs.map((job, i) => (
                      <li
                        key={i}
                        className="p-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {job.title}
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-300">
                          {job.company} • {job.type}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedNav === "Job Board" && (
          <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Job Board</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by job title, company, or skill..."
                className="w-full sm:w-96 px-4 py-2 border rounded shadow-sm"
              />
              <div className="flex gap-4">
                <select className="px-3 py-2 border rounded cursor-pointer">
                  <option value="">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="internship">Internship</option>
                </select>

                <select className="px-3 py-2 border rounded cursor-pointer">
                  <option value="">Experience</option>
                  <option value="0-1">0-1 Years</option>
                  <option value="2-3">2-3 Years</option>
                  <option value="4+">4+ Years</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {/* <div>
                  {jobData.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
                    >

                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <img
                            src={job.logo}
                            alt="logo"
                            className="w-12 h-12 rounded"
                          />
                          <div>
                            <h3 className="text-xl font-semibold">
                              {job.company}
                            </h3>
                            <p className="text-gray-600">{job.title}</p>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-700 space-y-1">
                          <p>
                            <strong>Type:</strong> {job.type}
                          </p>
                          <p>
                            <strong>Employees:</strong> {job.employees}+
                          </p>
                          <p>
                            <strong>About:</strong> {job.description}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="ml-4 mt-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded flex items-center gap-2">
                          Apply
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div> */}

              {/* jobs from rec */}

              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={job.companyLogo}
                        alt="Logo"
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {job.companyName}
                        </h3>
                        <p className="text-gray-500">{job.jobTitle}</p>
                      </div>
                    </div>
                    <span className="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700">
                      {job.jobType}
                    </span>
                  </div>

                  {/* Company Overview */}
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-700">
                      Company Overview
                    </h4>
                    <p className="text-sm text-gray-600">
                      {job.companyOverview}
                    </p>
                  </div>

                  {/* Role Overview */}
                  <div>
                    <h4 className="font-medium text-gray-700">Role Overview</h4>
                    <p className="text-sm text-gray-600">{job.roleOverview}</p>
                  </div>

                  {/* Responsibilities Box */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-1">
                      Key Responsibilities
                    </h4>
                    <ul>
                      {job.keyResponsibilities?.map((res, i) => (
                        <li key={i}>{res}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Qualifications Section */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                      <h4 className="font-medium text-green-800 mb-1">
                        Must-Have Qualifications
                      </h4>
                      <ul>
                        {job.mustHaveQualifications?.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                      <h4 className="font-medium text-yellow-800 mb-1">
                        Nice-to-Have Qualifications
                      </h4>
                      <ul>
                        {job.niceToHaveQualifications?.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Salary:</strong> {job.compensation}
                      </p>
                      <p>
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p>
                        <strong>Priority: </strong>
                        <span
                          className={`inline-block px-2 py-1 text-white text-xs rounded-full ${
                            job.priority === "Burning"
                              ? "bg-red-500"
                              : job.priority === "Hot"
                              ? "bg-orange-500"
                              : "bg-green-600"
                          }`}
                        >
                          {job.priority === "Burning"
                            ? "🔥 Burning"
                            : job.priority === "Hot"
                            ? "♨️ x Hot"
                            : "🕓 Ongoing"}
                        </span>
                      </p>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm flex items-center gap-2">
                      Apply <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedNav === "Settings" && (
          <div className="bg-white p-6 rounded shadow-md max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p>Settings content will be available here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
