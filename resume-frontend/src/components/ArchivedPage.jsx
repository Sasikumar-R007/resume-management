// ArchivedPage.jsx
import React, { useEffect, useState } from "react";
import { MdRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ArchivedPage = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const [archivedCandidates, setArchivedCandidates] = useState([]);
  const [archivedRequirements, setArchivedRequirements] = useState([]);
  const [archivedJobs, setArchivedJobs] = useState([]);

  // Fetch archived candidates from backend
  const fetchArchivedCandidates = async () => {
    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL ||
          "https://resume-mang-backend.vercel.app"
        }/api/archived`
      );
      const data = await res.json();
      setArchivedCandidates(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const navigate = useNavigate();

  // Fetch archived requirements from localStorage
  const fetchArchivedRequirements = () => {
    const stored = localStorage.getItem("archivedRequirements");
    if (stored) {
      setArchivedRequirements(JSON.parse(stored));
    }
  };

  // You can update this later if jobs archiving is implemented
  const fetchArchivedJobs = () => {
    const dummy = [
      {
        id: "job1",
        title: "Senior QA",
        postedBy: "Company ABC",
        archivedAt: new Date().toISOString(),
      },
    ];
    setArchivedJobs(dummy);
  };

  useEffect(() => {
    fetchArchivedCandidates();
    fetchArchivedRequirements();
    fetchArchivedJobs();
  }, []);

  const handleRestore = (id, type) => {
    const confirmRestore = window.confirm(
      `Restore this ${type} to active list?`
    );
    if (!confirmRestore) return;

    if (type === "requirement") {
      const updated = archivedRequirements.filter((item) => item.id !== id);
      setArchivedRequirements(updated);
      localStorage.setItem("archivedRequirements", JSON.stringify(updated));
    }

    if (type === "candidate") {
      // TODO: Add API call to restore candidate
      console.log("Restore candidate logic pending");
    }

    if (type === "job") {
      const updated = archivedJobs.filter((item) => item.id !== id);
      setArchivedJobs(updated);
      // TODO: Save to localStorage if needed
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Archived Records
        </h2>
        <div className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-800 p-2 rounded-md">
          <p
            onClick={() => navigate(-1)}
            className="text-gray-600 cursor-pointer transition flex items-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
            Back to Dashboard
          </p>
        </div>
      </div>
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        {["candidates", "requirements", "jobs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Candidates Table */}
      {activeTab === "candidates" && (
        <>
          {archivedCandidates.length === 0 ? (
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
                  <th className="border px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {archivedCandidates.map((cand, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{cand.name}</td>
                    <td className="border px-2 py-1">{cand.email}</td>
                    <td className="border px-2 py-1 text-red-600">
                      {cand.status}
                    </td>
                    <td className="border px-2 py-1">{cand.reason}</td>
                    <td className="border px-2 py-1">
                      {new Date(cand.archivedAt).toLocaleDateString()}
                    </td>
                    <td className="border px-2 py-1 text-center hover:bg-gray-100">
                      <button
                        onClick={() => handleRestore(cand._id, "candidate")}
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
        </>
      )}

      {/* Requirements Table */}
      {activeTab === "requirements" && (
        <>
          {archivedRequirements.length === 0 ? (
            <p className="text-gray-600">No archived requirements.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">Position</th>
                  <th className="border px-2 py-1">Company</th>
                  <th className="border px-2 py-1">Criticality</th>
                  <th className="border px-2 py-1">Contact</th>
                  <th className="border px-2 py-1">Archived On</th>
                  <th className="border px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {archivedRequirements.map((req) => (
                  <tr key={req.id}>
                    <td className="border px-2 py-1">{req.position}</td>
                    <td className="border px-2 py-1">{req.company}</td>
                    <td className="border px-2 py-1">
                      {req.criticality || "—"}
                    </td>
                    <td className="border px-2 py-1">
                      {req.contactPerson || "—"}
                    </td>
                    <td className="border px-2 py-1">
                      {new Date(req.archivedAt).toLocaleDateString()}
                    </td>
                    <td className="border px-2 py-1 text-center hover:bg-gray-100">
                      <button
                        onClick={() => handleRestore(req.id, "requirement")}
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
        </>
      )}

      {/* Jobs Table */}
      {activeTab === "jobs" && (
        <>
          {archivedJobs.length === 0 ? (
            <p className="text-gray-600">No archived jobs.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">Title</th>
                  <th className="border px-2 py-1">Posted By</th>
                  <th className="border px-2 py-1">Archived On</th>
                  <th className="border px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {archivedJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="border px-2 py-1">{job.title}</td>
                    <td className="border px-2 py-1">{job.postedBy}</td>
                    <td className="border px-2 py-1">
                      {new Date(job.archivedAt).toLocaleDateString()}
                    </td>
                    <td className="border px-2 py-1 text-center hover:bg-gray-100">
                      <button
                        onClick={() => handleRestore(job.id, "job")}
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
        </>
      )}
    </div>
  );
};

export default ArchivedPage;
