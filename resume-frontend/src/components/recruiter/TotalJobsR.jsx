import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const API_BASE_URL =
      process.env.REACT_APP_API_BASE_URL ||
      "https://resume-mang-backend.vercel.app";

    axios
      .get(`${API_BASE_URL}/api/jobs`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const API_BASE_URL =
        process.env.REACT_APP_API_BASE_URL ||
        "https://resume-mang-backend.vercel.app";

      await axios.delete(`${API_BASE_URL}/api/jobs/${id}`);
      alert("Job deleted successfully!");

      // Optional: Refresh job list after delete
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job.");
    }
  };

  const handleEdit = (job) => {
    // Redirect to edit page or open a modal with job details
    // For now, just log the job details
    console.log("Edit job:", job);
    alert(`Editing job: ${job.jobTitle} at ${job.companyName}`);
    navigate("/recruiter/add-job", { state: { job } });
    console.log("Edit job:", JSON.stringify(job, null, 2));
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Jobs Posted</h2>
      <div className="grid grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <img
                  src={job.companyLogo}
                  alt="Logo"
                  className="w-12 h-12 rounded"
                />
                <div>
                  <h3 className="text-xl font-semibold">{job.companyName}</h3>
                  <p className="text-gray-600">{job.jobTitle}</p>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  {" "}
                  <strong>Priority:</strong> {job.priority}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 items-end">
              <button
                onClick={() => handleEdit(job)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil size={20} />
              </button>

              <button
                onClick={() => handleDelete(job._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>

              <button
                onClick={() => navigate(`/job-details/${job.jobId}`)}
                className="text-green-600 underline text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
