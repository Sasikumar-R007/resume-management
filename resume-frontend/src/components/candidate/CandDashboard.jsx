import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ExternalLink, UserCircle } from "lucide-react"; // for nav icons
import { ProfileContext } from "./ProfileContext";
import axios from "axios";

const CandidateDashboard = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const navigate = useNavigate();

  const navItems = ["Dashboard", "Job Board", "Resume", "Settings"];

  const { profile, setProfile } = useContext(ProfileContext);

  // Modal state
  const [formData, setFormData] = useState(profile);
  const [showEdit, setShowEdit] = useState(false);

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({ name: "", link: "" });

  const [primarySkills, setPrimarySkills] = useState("");
  const [secondarySkills, setSecondarySkills] = useState("");
  const [knowledgeOnly, setKnowledgeOnly] = useState("");

  // Change Image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      // 1. Update the local profile state with the image
      setProfile((prev) => ({ ...prev, profileImage: base64Image }));

      try {
        // 2. Update the backend with the image
        const res = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/candidates/profile-image`,
          {
            email: profile.email, // assuming email is used to identify user
            profileImage: base64Image,
          }
        );

        console.log("Profile image updated:", res.data);
        alert("Profile image updated successfully!");
      } catch (error) {
        console.error("Image update failed", error);
        alert("Failed to update profile image");
      }
    };

    reader.readAsDataURL(file); // convert image to base64
  };

  const handleRemoveImage = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/candidates/profile-image`,
        {
          email: profile.email,
          profileImage: "", // remove image
        }
      );

      if (res.status === 200) {
        setProfile((prev) => ({ ...prev, profileImage: "" }));
        alert("Profile image removed successfully.");
      }
    } catch (err) {
      console.error("Error removing profile image", err);
      alert("Failed to remove image.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited profile
  const handleSave = () => {
    setProfile({ ...formData });
    setShowEdit(false);
  };

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  // Sample applied jobs
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

  // Sample suggestions
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

  // const jobData = [
  //   {
  //     id: 1,
  //     company: "Symphonix Technologies",
  //     logo: "https://symphonix-tech.web.app/assests/sym%20profile.png",
  //     title: "Frontend Developer",
  //     type: "Internship",
  //     employees: 45,
  //     description:
  //       "We are a growing tech startup focusing on building UI-rich web apps.",
  //     skills: ["React", "Tailwind", "JavaScript"],
  //   },
  //   {
  //     id: 2,
  //     company: "NetDev Solutions",
  //     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm76XoSy0vee4MvSerm6U5U_5W6e7TT-2J-g&s",
  //     title: "Marketing Analyst",
  //     type: "Full-Time",
  //     employees: 80,
  //     description:
  //       "Digital marketing agency helping brands grow online with performance ads.",
  //     skills: ["SEO", "Google Ads", "Excel", "Communication"],
  //   },
  //   {
  //     id: 3,
  //     company: "High Tech Innovations",
  //     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSyHd2CqvAVfhrZkSRzSAoG--zQ3TYjTCTkw&s",
  //     title: "Java Developer",
  //     type: "Internship",
  //     employees: 45,
  //     description:
  //       "We are a growing tech startup focusing on building UI-rich web apps.",
  //     skills: ["React", "Tailwind", "JavaScript"],
  //   },
  //   {
  //     id: 4,
  //     company: "Globe Tech",
  //     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPY_d3dQFhCeeI8It8syLegLzIBCVq8MdzZw&s",
  //     title: "Project Manager",
  //     type: "Full-Time",
  //     employees: 80,
  //     description:
  //       "Digital marketing agency helping brands grow online with performance ads.",
  //     skills: ["SEO", "Google Ads", "Excel", "Communication"],
  //   },
  // ];

  //jobs from rec

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/jobs`
        );
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Unsupported file format.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size exceeds 5MB.");
      return;
    }
    setError("");
    setResume(file);
  };

  const handleRemove = () => {
    setResume(null);
  };

  // if (!profile || Object.keys(profile).length === 0) {
  //   return (
  //     <div className="text-center mt-20 text-gray-700 text-xl">
  //       Loading... or please fill the profile form first.
  //       <br />
  //       <div className="flex justify-center mt-4">
  //         <button
  //           onClick={() => navigate(-1)}
  //           className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
  //         >
  //           Fill Profile
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4 space-y-4 fixed h-full">
        <h2 className="text-2xl font-bold mb-4">Candidate</h2>
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
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen  md:ml-64">
        {selectedNav === "Dashboard" && (
          <div>
            {/* Profile Section */}
            <div className="border p-4 rounded shadow bg-white">
              <h2 className="text-2xl font-semibold mb-1">
                Welcome, {profile.firstName}
              </h2>
              <p className="text-gray-600 mb-4">
                Hope you're having a great day! Here's your profile overview:
              </p>
              <div className="flex justify-between items-start bg-white p-1 rounded-lg ">
                {/* Left: Profile Details */}
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex">
                    <span className="w-48 font-semibold">Name:</span>
                    <span>
                      {profile.firstName} {profile.lastName}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="w-48 font-semibold">Email:</span>
                    <span>{profile.email}</span>
                  </div>

                  <div className="flex">
                    <span className="w-48 font-semibold">Mobile:</span>
                    <span>{profile.mobile}</span>
                  </div>

                  <div className="flex">
                    <span className="w-48 font-semibold">Designation:</span>
                    <span>{profile.designation}</span>
                  </div>

                  <div className="flex">
                    <span className="w-48 font-semibold">Experience:</span>
                    <span>{profile.totalExperience}</span>
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

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => setShowSkillModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add Skill
                    </button>
                    <button
                      onClick={() => setShowProjectModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Add Project
                    </button>
                  </div>
                </div>

                {/* Right: Profile Image */}
                <div className="relative group mr-20">
                  <div className="w-52 h-52 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle className="text-gray-500 w-20 h-20" />
                    )}
                  </div>

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

              {showSkillModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
                    <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                      Add Skills
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Primary Skills (comma separated)
                        </label>
                        <input
                          type="text"
                          placeholder="React, Node"
                          value={primarySkills}
                          onChange={(e) => setPrimarySkills(e.target.value)}
                          className="border p-2 w-full rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Secondary Skills
                        </label>
                        <input
                          type="text"
                          placeholder="Tailwind, Redux"
                          value={secondarySkills}
                          onChange={(e) => setSecondarySkills(e.target.value)}
                          className="border p-2 w-full rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Knowledge Only
                        </label>
                        <input
                          type="text"
                          placeholder="Docker, GraphQL"
                          value={knowledgeOnly}
                          onChange={(e) => setKnowledgeOnly(e.target.value)}
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
                        onClick={() => {
                          const p = primarySkills
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          const s = secondarySkills
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          const k = knowledgeOnly
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setSkills([...p, ...s, ...k]);
                          setProfile((prev) => ({
                            ...prev,
                            primarySkill: p.join(", "),
                            secondarySkill: s.join(", "),
                            knowledgeOnly: k.join(", "),
                          }));
                          setPrimarySkills("");
                          setSecondarySkills("");
                          setKnowledgeOnly("");
                          setShowSkillModal(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showProjectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                    <h3 className="text-xl font-semibold mb-4">Add Project</h3>
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                      className="border p-2 w-full rounded mb-3"
                    />
                    <input
                      type="text"
                      placeholder="Live Link (optional)"
                      value={newProject.link}
                      onChange={(e) =>
                        setNewProject({ ...newProject, link: e.target.value })
                      }
                      className="border p-2 w-full rounded mb-4"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      className="border h-24 p-2 w-full rounded mb-4 required:"
                    />

                    <div className="flex justify-end gap-2">
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

              {/* Skill Section */}
              {skills.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Skills</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Section */}
              {projects.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Projects</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {projects.map((project, index) => (
                      <li key={index}>
                        {project.name}
                        {project.link && (
                          <>
                            {" "}
                            -{" "}
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Live Link
                            </a>
                          </>
                        )}
                        <p className="text-sm text-gray-500">
                          {project.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => {
                  setFormData(profile);
                  setShowEdit(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
              >
                Edit Profile
              </button>
            </div>
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

            {/* Edit Modal */}
            {showEdit && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
                  <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      className="border p-2 rounded"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Experience"
                      name="totalExperience"
                      value={formData.totalExperience}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Current Company"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="Primary Skill"
                      name="primarySkill"
                      value={formData.primarySkill}
                      onChange={handleChange}
                    />
                    <input
                      className="border p-2 rounded"
                      placeholder="LinkedIn"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setShowEdit(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                            ? "♨️ Hot"
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

        {selectedNav === "Resume" && (
          <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Resume Upload</h3>

            {resume ? (
              <div className="mb-4">
                <p>
                  <strong>Uploaded Resume:</strong> {resume.name} (
                  {(resume.size / 1024).toFixed(2)} KB)
                </p>
                <button
                  onClick={handleRemove}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="mb-4 text-gray-600">No resume uploaded yet.</p>
            )}

            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="mb-2"
            />
            {error && <p className="text-red-600 mb-2">{error}</p>}

            <p className="text-sm text-gray-500">
              Supported formats: PDF, DOC, DOCX, TXT (Max 5MB)
            </p>
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
