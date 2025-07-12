// components/RequirementTable.jsx
import React from "react";

const RequirementTable = ({ data, isAdmin = false, showRecruiter = false }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-orange-200">
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Criticality</th>
            <th className="border px-4 py-2">Company</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Advisor</th>
            {isAdmin && <th className="border px-4 py-2">TL</th>}
            {showRecruiter && <th className="border px-4 py-2">Recruiter</th>}
            {isAdmin && <th className="border px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id} className={idx % 2 === 0 ? "bg-cyan-100" : "bg-white"}>
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{item.position}</td>
              <td className="border px-4 py-2">{item.criticality}</td>
              <td className="border px-4 py-2">{item.company}</td>
              <td className="border px-4 py-2">{item.contact}</td>
              <td className="border px-4 py-2">{item.advisor}</td>
              {isAdmin && <td className="border px-4 py-2">{item.tl}</td>}
              {showRecruiter && <td className="border px-4 py-2">{item.recruiter}</td>}
              {isAdmin && (
                <td className="border px-4 py-2">
                  <button className="text-blue-500 px-2">✏️</button>
                  <button className="text-red-500 px-2">🗑️</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequirementTable;
