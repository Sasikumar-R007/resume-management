//

// === Frontend (React) ===
// ArchivedCandidates.jsx
import React, { useEffect, useState } from "react";
import { MdRestore } from "react-icons/md";

const ArchivedCandidates = () => {
  const [archived, setArchived] = useState([]);

  const fetchArchived = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/archived");
      const data = await res.json();
      setArchived(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchArchived();
  }, []);

  // Restore candidate function old

  // const handleRestore = async (id) => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.REACT_APP_API_BASE_URL}/api/candidates/${id}/restore`,
  //       {
  //         method: "PATCH",
  //       }
  //     );
  //     const data = await res.json();

  //     if (res.ok) {
  //       alert("Candidate restored successfully.");
  //       setArchived((prev) => prev.filter((c) => c._id !== id));
  //     } else {
  //       alert("Restore failed: " + data.error);
  //     }
  //   } catch (err) {
  //     console.error("Restore error:", err);
  //     alert("An error occurred during restore.");
  //   }
  // };

  // Restore candidate function just console log for now
  const handleRestore = (cand) => {
    const confirmRestore = window.confirm(
      `Restore ${cand.name} to active list?`
    );
    if (confirmRestore) {
      console.log(`🔁 Restore triggered for: ${cand.name} (ID: ${cand._id})`);
      // TODO: Replace this with actual fetch PATCH call when backend is ready
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Archived Candidates
      </h2>

      {archived.length === 0 ? (
        <p className="text-gray-600">No archived candidates.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Reason</th>
              <th className="border px-2 py-1">Archived On</th>
            </tr>
          </thead>
          <tbody>
            {archived.map((cand, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{cand.name}</td>
                <td className="border px-2 py-1">{cand.email}</td>
                <td className="border px-2 py-1 text-red-600">{cand.status}</td>
                <td className="border px-2 py-1">{cand.reason}</td>
                <td className="border px-2 py-1">
                  {new Date(cand.archivedAt).toLocaleDateString()}
                </td>
                <td className="border px-2 py-1 text-center hover:bg-gray-100">
                  <button
                    onClick={() => handleRestore(cand._id)}
                    title="Restore"
                  >
                    <MdRestore className="text-blue-600 hover:text-blue-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ArchivedCandidates;
