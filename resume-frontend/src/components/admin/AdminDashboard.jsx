import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  FaUserCircle,
  FaCamera,
  FaTrash,
  FaPlus,
  FaEdit,
  FaTrash as FaTrashIcon,
  FaUserCheck,
  FaArrowLeft,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("User Management");
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showRequirementsSession, setShowRequirementsSession] = useState(false);

  // Add requirements state and modal state
  const [requirements, setRequirements] = useState([
    // Dummy data for now
    {
      id: 1,
      position: "Senior Frontend Developer",
      criticality: "High",
      company: "TechCorp Inc.",
      contactPerson: "Sarah Johnson",
      talentAdvisor: "",
      teamLead: "",
      assigned: false,
    },
    {
      id: 2,
      position: "Full Stack Engineer",
      criticality: "Medium",
      company: "StartupXYZ",
      contactPerson: "David Wilson",
      talentAdvisor: "Lisa Wang",
      teamLead: "Alex Rodriguez",
      assigned: true,
    },
    {
      id: 3,
      position: "DevOps Engineer",
      criticality: "High",
      company: "CloudSolutions",
      contactPerson: "Rachel Green",
      talentAdvisor: "Michael Chen",
      teamLead: "Maria Garcia",
      assigned: true,
    },
    {
      id: 4,
      position: "UI/UX Designer",
      criticality: "Low",
      company: "Designify",
      contactPerson: "Anna Lee",
      talentAdvisor: "",
      teamLead: "",
      assigned: false,
    },
    {
      id: 5,
      position: "Backend Developer",
      criticality: "Medium",
      company: "DataWorks",
      contactPerson: "John Smith",
      talentAdvisor: "",
      teamLead: "",
      assigned: false,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTotalModal, setShowTotalModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [selectedTeamLead, setSelectedTeamLead] = useState("");
  const [editReq, setEditReq] = useState(null);
  const [form, setForm] = useState({
    position: "",
    criticality: "High",
    company: "",
    contactPerson: "",
    talentAdvisor: "",
    teamLead: "",
  });

  // Team leaders data
  const teamLeaders = [
    { id: 1, name: "Alex Rodriguez", email: "alex@scaling.com" },
    { id: 2, name: "Maria Garcia", email: "maria@scaling.com" },
    { id: 3, name: "David Chen", email: "david@scaling.com" },
    { id: 4, name: "Sarah Wilson", email: "sarah@scaling.com" },
  ];

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // Get admin info from localStorage first
        const adminProfile = localStorage.getItem("adminProfile");
        if (adminProfile) {
          setAdminInfo(JSON.parse(adminProfile));
        } else {
          // Fallback: fetch from API using admin email
          const adminEmail = localStorage.getItem("userEmail");
          if (adminEmail) {
            const res = await axios.get(
              `${process.env.REACT_APP_API_BASE_URL}/api/admins`
            );
            const admin = res.data.find((admin) => admin.email === adminEmail);
            if (admin) {
              setAdminInfo(admin);
              localStorage.setItem("adminProfile", JSON.stringify(admin));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchAdmin();
  }, []);

  const stats = [
    {
      title: "Total Users",
      count: 0,
      subtext: "0 active users",
      icon: <FaUsers size={28} className="text-gray-600" />,
    },
    {
      title: "Total Jobs",
      count: 0,
      subtext: "0 active jobs",
      icon: <FaBriefcase size={28} className="text-gray-600" />,
    },
    {
      title: "System Health",
      count: 0,
      subtext: "Healthy",
      icon: <FaHeartbeat size={28} className="text-gray-600" />,
    },
    {
      title: "System Status",
      count: 0,
      subtext: "Running",
      icon: <FaServer size={28} className="text-gray-600" />,
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

  // Stats calculation
  const totalReq = requirements.length;
  const highReq = requirements.filter((r) => r.criticality === "High").length;
  const medReq = requirements.filter((r) => r.criticality === "Medium").length;
  const lowReq = requirements.filter((r) => r.criticality === "Low").length;

  // Unassigned first
  const sortedReqs = [
    ...requirements.filter((r) => !r.assigned),
    ...requirements.filter((r) => r.assigned),
  ];

  // Handlers
  const handleAddRequirement = () => {
    setForm({
      position: "",
      criticality: "High",
      company: "",
      contactPerson: "",
      talentAdvisor: "",
      teamLead: "",
    });
    setShowAddModal(true);
  };
  const handleEditRequirement = (req) => {
    setEditReq(req);
    setForm(req);
    setShowEditModal(true);
  };
  const handleDeleteRequirement = (id) => {
    if (window.confirm("Are you sure you want to delete this requirement?")) {
      setRequirements(requirements.filter((r) => r.id !== id));
    }
  };
  const handleAssignRequirement = (req) => {
    setSelectedRequirement(req);
    setSelectedTeamLead("");
    setShowAssignModal(true);
  };
  const handleConfirmAssignment = () => {
    if (!selectedTeamLead) {
      alert("Please select a team leader");
      return;
    }
    
    const selectedTL = teamLeaders.find(tl => tl.id === parseInt(selectedTeamLead));
    
    setRequirements(
      requirements.map((r) =>
        r.id === selectedRequirement.id 
          ? { 
              ...r, 
              assigned: true, 
              teamLead: selectedTL.name,
              talentAdvisor: selectedTL.name // For now, using team lead as talent advisor
            } 
          : r
      )
    );
    setShowAssignModal(false);
    setSelectedRequirement(null);
    setSelectedTeamLead("");
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (showAddModal) {
      setRequirements([
        ...requirements,
        {
          ...form,
          id: Date.now(),
          assigned: !!form.teamLead,
        },
      ]);
      setShowAddModal(false);
    } else if (showEditModal) {
      setRequirements(
        requirements.map((r) =>
          r.id === editReq.id
            ? { ...form, id: editReq.id, assigned: !!form.teamLead }
            : r
        )
      );
      setShowEditModal(false);
    }
  };

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

  // Profile picture functions
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleSaveProfile = async () => {
    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append("name", adminInfo.name);
      formData.append("email", adminInfo.email);
      formData.append("mobile", adminInfo.mobile);
      formData.append("designation", adminInfo.designation);
      formData.append("department", adminInfo.department);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // Update admin profile
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/admins/${adminInfo.adminId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update local state
      setAdminInfo(res.data);
      localStorage.setItem("adminProfile", JSON.stringify(res.data));
      setEditMode(false);
      setProfileImage(null);
      setImagePreview(null);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "User Management":
        return (
          <>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex items-center border rounded px-3 py-2 w-full md:w-auto">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search user..."
                  className="outline-none w-full"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/admin/add-team-leader")}
                  className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700"
                >
                  <FaUserPlus /> Add Team Leader
                </button>
                <button
                  onClick={() => navigate("/admin/add-recruiter")}
                  className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700"
                >
                  <FaUserPlus /> Add Recruiter
                </button>
              </div>
            </div>

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
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {adminInfo?.name || "Admin"}
          </h1>
          <p className="text-gray-600 text-sm">System Administration Panel</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => setShowProfileModal(true)}
          >
            <FaUserCircle className="text-white" size={22} />
            Profile
          </button>

          <button
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Dashboard UI (only show if not in requirements session) */}
      {!showRequirementsSession && (
        <>
          {/* 4 Dashboard Stat Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 border border-gray-200"
              onClick={() => setShowRequirementsSession(true)}
            >
              <FaCogs size={28} className="text-gray-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                Requirements
              </div>
              <div className="text-gray-600 text-sm text-center">
                Manage all requirements and assignments
              </div>
            </div>
            <div
              className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 border border-gray-200"
              onClick={() => navigate("/all-resumes")}
            >
              <FaDatabase size={28} className="text-gray-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">Database</div>
              <div className="text-gray-600 text-sm text-center">
                Manage Database
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center border border-gray-200">
              <FaHeartbeat size={28} className="text-gray-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                System Health
              </div>
              <div className="text-gray-600 text-sm text-center">Healthy</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center border border-gray-200">
              <FaServer size={28} className="text-gray-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                System Status
              </div>
              <div className="text-gray-600 text-sm text-center">Running</div>
            </div>
          </div>
        </>
      )}

      {/* Requirements Session (only show if in requirements session) */}
      {showRequirementsSession && (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <button
            className="flex items-center gap-2 text-gray-600 hover:underline mb-4"
            onClick={() => setShowRequirementsSession(false)}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          {/* Stats Boxes */}
          <div className="flex gap-4 mb-6">
            <div
              className="flex-1 bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-gray-50 border border-gray-200"
              onClick={() => setShowTotalModal(true)}
            >
              <div className="text-2xl font-bold text-gray-800">{totalReq}</div>
              <div className="text-gray-700 font-semibold">
                Total Requirements
              </div>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="text-2xl font-bold text-red-600">{highReq}</div>
              <div className="text-gray-700 font-semibold">High Priority</div>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">{medReq}</div>
              <div className="text-gray-700 font-semibold">Medium Priority</div>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="text-2xl font-bold text-green-600">{lowReq}</div>
              <div className="text-gray-700 font-semibold">Low Priority</div>
            </div>
            <button
              className="ml-4 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-700"
              onClick={handleAddRequirement}
            >
              <FaPlus /> Add Requirement
            </button>
          </div>

          {/* Requirements Table */}
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaDatabase className="text-gray-600" /> Current Requirements
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-sm">
                  <th className="p-2">Position</th>
                  <th className="p-2">Criticality</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Contact Person</th>
                  <th className="p-2">Talent Advisor</th>
                  <th className="p-2">Team Lead</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedReqs.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b text-sm hover:bg-gray-50"
                  >
                    <td className="p-2 font-medium text-gray-800 cursor-pointer underline">
                      {req.position}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          req.criticality === "High"
                            ? "bg-red-100 text-red-600"
                            : req.criticality === "Medium"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {req.criticality}
                      </span>
                    </td>
                    <td className="p-2">{req.company}</td>
                    <td className="p-2">{req.contactPerson}</td>
                    <td className="p-2">
                      {req.talentAdvisor || (
                        <span className="italic text-gray-400">Unassigned</span>
                      )}
                    </td>
                    <td className="p-2">
                      {req.teamLead || (
                        <span className="italic text-gray-400">Unassigned</span>
                      )}
                    </td>
                    <td className="p-2 flex gap-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEditRequirement(req)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDeleteRequirement(req.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      {!req.assigned && (
                        <button
                          className="text-green-600 hover:underline"
                          onClick={() => handleAssignRequirement(req)}
                          title="Assign"
                        >
                          <FaUserCheck />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add/Edit Requirement Modal */}
          {(showAddModal || showEditModal) && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <button
                  className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">
                  {showAddModal ? "Add Requirement" : "Edit Requirement"}
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 font-medium">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      className="w-full px-3 py-2 border rounded"
                      value={form.position}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">
                      Criticality
                    </label>
                    <select
                      name="criticality"
                      className="w-full px-3 py-2 border rounded"
                      value={form.criticality}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="w-full px-3 py-2 border rounded"
                      value={form.company}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      className="w-full px-3 py-2 border rounded"
                      value={form.contactPerson}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">
                      Talent Advisor
                    </label>
                    <input
                      type="text"
                      name="talentAdvisor"
                      className="w-full px-3 py-2 border rounded"
                      value={form.talentAdvisor}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">
                      Team Lead
                    </label>
                    <input
                      type="text"
                      name="teamLead"
                      className="w-full px-3 py-2 border rounded"
                      value={form.teamLead}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                      {showAddModal ? "Add" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Assignment Modal */}
          {showAssignModal && selectedRequirement && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <button
                  className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl"
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedRequirement(null);
                    setSelectedTeamLead("");
                  }}
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Assign Requirement</h2>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Requirement Details:</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><strong>Position:</strong> {selectedRequirement.position}</p>
                    <p><strong>Company:</strong> {selectedRequirement.company}</p>
                    <p><strong>Criticality:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs font-bold ${
                        selectedRequirement.criticality === "High"
                          ? "bg-red-100 text-red-600"
                          : selectedRequirement.criticality === "Medium"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {selectedRequirement.criticality}
                      </span>
                    </p>
                    <p><strong>Contact Person:</strong> {selectedRequirement.contactPerson}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1 font-medium">
                    Assign to Team Leader:
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    value={selectedTeamLead}
                    onChange={(e) => setSelectedTeamLead(e.target.value)}
                    required
                  >
                    <option value="">Select a Team Leader</option>
                    {teamLeaders.map((tl) => (
                      <option key={tl.id} value={tl.id}>
                        {tl.name} ({tl.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => {
                      setShowAssignModal(false);
                      setSelectedRequirement(null);
                      setSelectedTeamLead("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    onClick={handleConfirmAssignment}
                  >
                    Confirm Assignment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Total Requirements Modal */}
          {showTotalModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
                <button
                  className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl"
                  onClick={() => setShowTotalModal(false)}
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">All Requirements</h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="p-2">Position</th>
                      <th className="p-2">Criticality</th>
                      <th className="p-2">Company</th>
                      <th className="p-2">Contact Person</th>
                      <th className="p-2">Talent Advisor</th>
                      <th className="p-2">Team Lead</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((req) => (
                      <tr
                        key={req.id}
                        className="border-b text-sm hover:bg-gray-50"
                      >
                        <td className="p-2 font-medium text-gray-800 cursor-pointer underline">
                          {req.position}
                        </td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              req.criticality === "High"
                                ? "bg-red-100 text-red-600"
                                : req.criticality === "Medium"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {req.criticality}
                          </span>
                        </td>
                        <td className="p-2">{req.company}</td>
                        <td className="p-2">{req.contactPerson}</td>
                        <td className="p-2">
                          {req.talentAdvisor || (
                            <span className="italic text-gray-400">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="p-2">
                          {req.teamLead || (
                            <span className="italic text-gray-400">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="p-2 flex gap-2">
                          {!req.assigned && (
                            <button
                              className="text-green-600 hover:underline"
                              onClick={() => handleAssignRequirement(req)}
                              title="Assign"
                            >
                              <FaUserCheck />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Bottom Section — Sidebar and Sections */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[200px]">
          {["User Management", "System Settings", "Activity Logs"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`px-4 py-2 rounded w-full text-left transition-all duration-200 ${
                  activeSection === item
                    ? "bg-gray-800 text-white font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          {renderSection()}
        </div>
      </div>
      {/* Admin Profile Modal */}
      {showProfileModal && adminInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => {
                setEditMode(false);
                setShowProfileModal(false);
              }}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Admin Profile</h2>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                {imagePreview || adminInfo.profileImage ? (
                  <img
                    src={imagePreview || adminInfo.profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-500"
                  />
                ) : (
                  <FaUserCircle className="text-gray-500" size={60} />
                )}

                {editMode && (
                  <div className="absolute -bottom-1 -right-1 flex gap-1">
                    <label className="bg-gray-800 text-white p-1 rounded-full cursor-pointer hover:bg-gray-700">
                      <FaCamera size={12} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {(imagePreview || adminInfo.profileImage) && (
                      <button
                        onClick={handleRemoveImage}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{adminInfo.name}</h3>
                <p className="text-sm text-gray-600">{adminInfo.designation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                {editMode ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={adminInfo.name}
                    onChange={(e) =>
                      setAdminInfo({ ...adminInfo, name: e.target.value })
                    }
                  />
                ) : (
                  <p>{adminInfo.name}</p>
                )}
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                {editMode ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={adminInfo.email}
                    onChange={(e) =>
                      setAdminInfo({ ...adminInfo, email: e.target.value })
                    }
                  />
                ) : (
                  <p>{adminInfo.email}</p>
                )}
              </div>
              <div>
                <p className="text-gray-500">Mobile</p>
                {editMode ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={adminInfo.mobile}
                    onChange={(e) =>
                      setAdminInfo({ ...adminInfo, mobile: e.target.value })
                    }
                  />
                ) : (
                  <p>{adminInfo.mobile}</p>
                )}
              </div>
              <div>
                <p className="text-gray-500">Designation</p>
                {editMode ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={adminInfo.designation}
                    onChange={(e) =>
                      setAdminInfo({
                        ...adminInfo,
                        designation: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{adminInfo.designation}</p>
                )}
              </div>
              <div>
                <p className="text-gray-500">Department</p>
                {editMode ? (
                  <select
                    className="border px-2 py-1 rounded w-full"
                    value={adminInfo.department}
                    onChange={(e) =>
                      setAdminInfo({ ...adminInfo, department: e.target.value })
                    }
                  >
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Admin">Admin</option>
                    <option value="Management">Management</option>
                  </select>
                ) : (
                  <p>{adminInfo.department}</p>
                )}
              </div>
              <div>
                <p className="text-gray-500">Permissions</p>
                <p className="text-xs">{adminInfo.permissions.join(", ")}</p>
              </div>
            </div>

            {/* Edit button */}
            <div className="mt-6 flex justify-between">
              <button
                className="text-gray-600 hover:underline"
                onClick={() => {
                  setEditMode((prev) => !prev);
                  if (editMode) {
                    // Reset to original data when canceling
                    const originalProfile =
                      localStorage.getItem("adminProfile");
                    if (originalProfile) {
                      setAdminInfo(JSON.parse(originalProfile));
                    }
                    setProfileImage(null);
                    setImagePreview(null);
                  }
                }}
              >
                {editMode ? "Cancel Edit" : "Edit Info"}
              </button>

              {editMode && (
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
