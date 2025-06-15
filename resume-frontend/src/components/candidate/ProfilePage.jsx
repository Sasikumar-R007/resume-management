import React, { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  const [formData, setFormData] = useState(profile);
  const [showEdit, setShowEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfile({ ...formData }); // ⬅️ Updates main profile
    setShowEdit(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Profile Dashboard</h2>
      <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      <button
        onClick={() => {
          setFormData(profile); // Load latest profile into form
          setShowEdit(true);
        }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Edit Profile
      </button>

      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 mb-2 w-full rounded"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 mb-2 w-full rounded"
              placeholder="Last Name"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded"
              placeholder="Email"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
