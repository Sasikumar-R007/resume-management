import React from "react";
import { useNavigate } from "react-router-dom";

const shortlistedProfiles = [
  {
    id: "RMS123456",
    name: "John Doe",
    role: "Frontend Developer – React, Tailwind",
  },
  {
    id: "RMS234567",
    name: "Jane Smith",
    role: "Backend Developer – Node.js, MongoDB",
  },
  {
    id: "RMS345678",
    name: "Michael Lee",
    role: "Full Stack – MERN Stack",
  },
];

const AIShortlist = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/resume/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Shortlisted Resumes</h1>

        <div className="grid gap-4">
          {shortlistedProfiles.map((profile) => (
            <div key={profile.id} className="border rounded-xl p-4 flex justify-between items-center hover:shadow transition">
              <div>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-gray-600">{profile.role}</p>
                <p className="text-sm text-gray-500 mt-1">ID: {profile.id}</p>
              </div>
              <button
                onClick={() => handleView(profile.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIShortlist;
