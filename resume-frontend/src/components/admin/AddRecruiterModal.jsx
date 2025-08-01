import React, { useState, useEffect } from "react";

const AddRecruiterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    joiningDate: "",
    linkedin: "",
    reportingTo: "", // Will hold TL ID
  });

  const [teamLeaders, setTeamLeaders] = useState([]);

  // Fetch TL list for dropdown
  useEffect(() => {
    const fetchTeamLeaders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/team-leaders");
        const data = await res.json();
        setTeamLeaders(data);
      } catch (err) {
        console.error("❌ Failed to fetch team leaders:", err);
      }
    };

    fetchTeamLeaders();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecruiter = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      joiningDate: formData.joiningDate,
      linkedin: formData.linkedin,
      reportingTo: formData.reportingTo,
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
        const errMsg = await response.json();
        console.error("❌ Failed to add Recruiter", errMsg);
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Joining Date
            </label>
            <input
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              LinkedIn Profile
            </label>
            <input
              name="linkedin"
              type="text"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="LinkedIn URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Reporting To (Team Leader)
            </label>
            <select
              name="reportingTo"
              value={formData.reportingTo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
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
