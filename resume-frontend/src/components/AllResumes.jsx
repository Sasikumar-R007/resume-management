import React, { useEffect, useState } from "react";

const AllResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [archivedCount, setArchivedCount] = useState(0); // placeholder

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/all-resumes`)
      .then((res) => res.json())
      .then((data) => {
        setResumes(data);
        // later: setArchivedCount() from another API
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Uploaded Resumes</h2>

      {/* Stats Boxes */}
      <div className="flex justify-around mb-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow-md w-1/3 text-center cursor-pointer hover:bg-blue-200 transition">
          <h3 className="text-lg font-semibold">Total Resumes</h3>
          <p className="text-2xl">{resumes.length}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow-md w-1/3 text-center cursor-pointer hover:bg-yellow-200 transition">
          <h3 className="text-lg font-semibold">Archived Resumes</h3>
          <p className="text-2xl">{archivedCount}</p>
        </div>
      </div>

      {/* Resume Table */}
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">S.No</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Resume</th>
            <th className="border px-3 py-2">ID</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((res, idx) => (
            <tr key={res.id}>
              <td className="border px-3 py-2 text-center">{idx + 1}</td>
              <td className="border px-3 py-2">{res.name}</td>
              <td className="border px-3 py-2">
                {new Date(res.timestamp).toLocaleString()}
              </td>
              <td className="border px-3 py-2 text-center">
                {res.files && res.files.length > 0 ? (
                  <a
                    href={`${process.env.REACT_APP_API_BASE_URL}/api/uploads/${res.files[0]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td className="border px-3 py-2 text-xs">{res.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllResumes;
