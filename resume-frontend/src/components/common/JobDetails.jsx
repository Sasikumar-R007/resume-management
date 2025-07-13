// src/components/job/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error("Error fetching job:", err));
  }, [jobId]);

  if (!job) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading job details...
      </div>
    );
  }

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );

  const Field = ({ label, value }) => (
    <div>
      <label className="block text-sm font-medium text-gray-500">{label}</label>
      <div className="mt-1 px-4 py-2 bg-gray-100 rounded text-gray-800">
        {value || "—"}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Job Details</h2>

        <Section title="Basic Information">
          <Field label="Job Title" value={job.title} />
          <Field label="Job ID" value={job.jobId} />
          <Field label="Location" value={job.location} />
          <Field label="Experience Required" value={job.experience} />
        </Section>

        <Section title="Responsibilities">
          <Field
            label="Key Responsibilities"
            value={job.keyResponsibilities?.join(", ")}
          />
        </Section>

        <Section title="Qualifications">
          <Field
            label="Must Have"
            value={job.mustHaveQualifications?.join(", ")}
          />
          <Field
            label="Nice to Have"
            value={job.niceToHaveQualifications?.join(", ")}
          />
        </Section>

        <Section title="Other Info">
          <Field label="Posted By" value={job.postedBy} />
          <Field label="Department" value={job.department} />
          <Field label="Salary" value={job.salary} />
        </Section>
      </div>
    </div>
  );
}
