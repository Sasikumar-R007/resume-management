import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const AddJob = () => {
  const [form, setForm] = useState({
    companyLogo: "",
    companyName: "",
    jobTitle: "",
    jobType: "Internship",
    companyOverview: "",
    roleOverview: "",
    keyResponsibilities: "",
    mustHave: "",
    niceToHave: "",
    compensation: "",
    location: "",
    workSetup: "Remote",
    priority: "🕓 Ongoing",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...form,
      keyResponsibilities: form.keyResponsibilities
        .split(",")
        .map((s) => s.trim()),
      mustHave: form.mustHave.split(",").map((s) => s.trim()),
      niceToHave: form.niceToHave.split(",").map((s) => s.trim()),
    };

    try {
      const API_BASE_URL =
        process.env.REACT_APP_API_BASE_URL ||
        "https://resume-mang-backend.vercel.app";

      const res = await axios.post(`${API_BASE_URL}/api/jobs`, jobData);
      alert("Job added successfully!");
      console.log(res.data);

      // reset form
      setForm({
        companyLogo: "",
        companyName: "",
        jobTitle: "",
        jobType: "Internship",
        companyOverview: "",
        roleOverview: "",
        keyResponsibilities: "",
        mustHave: "",
        niceToHave: "",
        compensation: "",
        location: "",
        workSetup: "Remote",
        priority: "🕓 Ongoing",
      });
    } catch (err) {
      console.error("Error adding job", err);
      alert("Failed to add job.");
    }
  };

  const location = useLocation();
  const editJob = location.state?.job || null;

  useEffect(() => {
    if (editJob) {
      setForm({
        companyLogo: editJob.companyLogo || "",
        companyName: editJob.companyName || "",
        jobTitle: editJob.jobTitle || "",
        jobType: editJob.jobType || "Internship",
        companyOverview: editJob.companyOverview || "",
        roleOverview: editJob.roleOverview || "",
        keyResponsibilities: (editJob.keyResponsibilities || []).join(", "),
        mustHave: (editJob.mustHave || []).join(", "),
        niceToHave: (editJob.niceToHave || []).join(", "),
        compensation: editJob.compensation || "",
        location: editJob.location || "",
        workSetup: editJob.workSetup || "Remote",
        priority: editJob.priority || "🕓 Ongoing",
      });
    }
  }, [editJob]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center w-full">
          Post a New Job
        </h2>
        <button
          onClick={() => navigate(-1)}
          aria-label="Close"
          className="text-gray-600 hover:text-black text-3xl font-bold absolute right-10"
        >
          <IoClose />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="companyLogo"
          placeholder="Company Logo URL"
          value={form.companyLogo}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="Internship">Internship</option>
          <option value="Full Time">Full Time</option>
        </select>

        <textarea
          type="text"
          name="companyOverview"
          placeholder="Company Overview (2–3 lines)"
          value={form.companyOverview}
          onChange={handleChange}
          className="border p-2"
          rows={2}
          required
        />
        <textarea
          name="roleOverview"
          placeholder="Role Overview (3–5 lines)"
          value={form.roleOverview}
          onChange={handleChange}
          className="border p-2"
          rows={3}
          required
        />

        <input
          type="text"
          name="keyResponsibilities"
          placeholder="Key Responsibilities (comma separated)"
          value={form.keyResponsibilities}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="text"
          name="mustHave"
          placeholder="Must-Have Qualifications (comma separated)"
          value={form.mustHave}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="text"
          name="niceToHave"
          placeholder="Nice-To-Have Qualifications (comma separated)"
          value={form.niceToHave}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="compensation"
          placeholder="Compensation & Incentives"
          value={form.compensation}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Chennai, Bangalore)"
          value={form.location}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <select
          name="workSetup"
          value={form.workSetup}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="Remote">Remote</option>
          <option value="In-Office">In-Office</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="Burning">Burning</option>
          <option value="Hot">Hot</option>
          <option value="Ongoing">Ongoing</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
