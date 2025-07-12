// ✅ File 2: CandidateCard.jsx
// src/components/recruiter/CandidateCard.jsx
import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaGraduationCap, FaBuilding } from 'react-icons/fa';

const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{candidate.name}</h3>
          <p className="text-blue-600">{candidate.designation}</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
            <span className="flex items-center"><FaBriefcase className="mr-2" /> {candidate.experience} yrs</span>
            <span className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {candidate.location}</span>
            <span className="flex items-center"><FaBuilding className="mr-2" /> {candidate.company}</span>
            <span className="flex items-center"><FaGraduationCap className="mr-2" /> {candidate.education}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 text-sm">
            {candidate.skills.slice(0, 6).map((skill, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded">{skill}</span>
            ))}
            {candidate.skills.length > 6 && (
              <span className="text-xs border px-2 py-1 rounded">
                +{candidate.skills.length - 6} more
              </span>
            )}
          </div>
          <p className="mt-2 text-sm">{candidate.summary}</p>
          <p className="text-xs text-gray-500 flex items-center mt-1">
            <FaClock className="mr-1" /> Last Active: {candidate.lastActive}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="px-3 py-1 border rounded text-sm">Save</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">View Resume</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
