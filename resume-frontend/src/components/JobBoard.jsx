import React, { useEffect, useState } from "react";
import axios from "axios";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    axios
      .get(`${API_BASE_URL}/api/jobs`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded shadow">
            <img
              src={job.companyLogo}
              alt="Logo"
              className="w-20 h-20 object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">
              {job.jobTitle} - {job.companyName}
            </h3>
            <p>Type: {job.jobType}</p>
            <p>Employees: {job.noOfEmployees}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
