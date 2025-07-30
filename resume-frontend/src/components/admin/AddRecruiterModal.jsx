import React, { useEffect, useState } from "react";

const AddRecruiterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    reportingToId: "",
    reportingToName: "",
  });

  const [teamLeaders, setTeamLeaders] = useState([]);

  useEffect(() => {
    const fetchTeamLeaders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/team-leaders");
        const data = await res.json();
        setTeamLeaders(data);
      } catch (err) {
        console.error("Error fetching TLs:", err);
      }
    };

    fetchTeamLeaders();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTLChange = (e) => {
    const [id, name] = e.target.value.split("|");
    setFormData({ ...formData, reportingToId: id, reportingToName: name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecruiter = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      reportingTo: formData.reportingToId, // ✅ FIXED
    };

    try {
      const response = await fetch("http://localhost:5000/api/recruiters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecruiter),
      });

      if (response.ok) {
        console.log("✅ Recruiter added successfully");
        onClose();
      } else {
        console.error("❌ Failed to add Recruiter");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Recruiter</h2>
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="First name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter email"
              autoComplete="new-email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter password"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Assign Team Leader
            </label>
            <select
              name="reportingToId"
              value={formData.reportingToId}
              onChange={(e) => {
                const selectedTL = teamLeaders.find(
                  (tl) => tl.teamLeadId === e.target.value
                );
                setFormData({
                  ...formData,
                  reportingToId: selectedTL?.teamLeadId || "",
                  reportingToName: selectedTL?.name || "",
                });
              }}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Team Leader</option>
              {teamLeaders.map((tl) => (
                <option key={tl.teamLeadId} value={tl.teamLeadId}>
                  {tl.name} ({tl.teamLeadId})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecruiterModal;
