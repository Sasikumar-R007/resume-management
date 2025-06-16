// // ✅ 2. CandidateForm.jsx - Full working form saving to context
// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ProfileContext } from "./ProfileContext";

// export default function CandidateForm() {
//   const navigate = useNavigate();
//   const { setProfile } = useContext(ProfileContext);
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/candidates", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, appliedBy: "candidate" }),
//       });

//       if (res.ok) {
//         alert("Profile submitted successfully!");
//         navigate("/candidate-dashboard");
//       } else {
//         alert("Failed to submit profile");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
//           Candidate Profile Form
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         >
//           <Input label="First Name" name="firstName" onChange={handleChange} />
//           <Input label="Last Name" name="lastName" onChange={handleChange} />
//           <Input label="Mobile Number" name="mobile" onChange={handleChange} />
//           <Input
//             label="Alternate Mobile Number"
//             name="altMobile"
//             onChange={handleChange}
//           />
//           <Input
//             label="Primary Email"
//             name="primaryEmail"
//             onChange={handleChange}
//           />
//           <Input
//             label="Secondary Email"
//             name="secondaryEmail"
//             onChange={handleChange}
//           />
//           <Input
//             label="LinkedIn Link"
//             name="linkedin"
//             onChange={handleChange}
//           />
//           <Input
//             label="Portfolio Link"
//             name="portfolio"
//             onChange={handleChange}
//           />
//           <Input label="Website Link" name="website" onChange={handleChange} />
//           <Input label="WhatsApp No" name="whatsapp" onChange={handleChange} />
//           <Input
//             label="Date of Birth"
//             name="dob"
//             type="date"
//             onChange={handleChange}
//           />

//           <Input
//             label="Current Company"
//             name="currentCompany"
//             onChange={handleChange}
//           />
//           <Select
//             label="Company Sector"
//             name="companySector"
//             onChange={handleChange}
//             options={["IT", "Finance", "Healthcare", "Education", "Other"]}
//           />
//           <Select
//             label="Company Level"
//             name="companyLevel"
//             onChange={handleChange}
//             options={["Startup", "SME", "MNC"]}
//           />
//           <Select
//             label="Product/Services"
//             name="productService"
//             onChange={handleChange}
//             options={["Product-Based", "Service-Based", "Both"]}
//           />
//           <Select
//             label="Product Domain"
//             name="productDomain"
//             onChange={handleChange}
//             options={["HR Tech", "EdTech", "FinTech", "HealthTech", "Other"]}
//           />
//           <Select
//             label="Product Category"
//             name="productCategory"
//             onChange={handleChange}
//             options={["B2B", "B2C", "Marketplace", "Other"]}
//           />
//           <Input
//             label="Current Role"
//             name="currentRole"
//             onChange={handleChange}
//           />
//           <Select
//             label="Total Experience"
//             name="totalExperience"
//             onChange={handleChange}
//             options={["Fresher", "1-2 years", "3-5 years", "5+ years"]}
//           />
//           <Input
//             label="Relevant Experience"
//             name="relevantExperience"
//             onChange={handleChange}
//           />
//           <Select
//             label="Pedigree Level"
//             name="pedigree"
//             onChange={handleChange}
//             options={["Tier 1", "Tier 2", "Tier 3", "Other"]}
//           />
//           <Input
//             label="Primary Skill"
//             name="primarySkill"
//             onChange={handleChange}
//           />

//           <button
//             type="submit"
//             className="col-span-2 px-8 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition"
//           >
//             Submit Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Reusable Input
// const Input = ({ label, name, onChange, type = "text" }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       onChange={onChange}
//       className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// );

// // Reusable Select
// const Select = ({ label, name, onChange, options = [] }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
//       {label}
//     </label>
//     <select
//       name={name}
//       onChange={onChange}
//       className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       <option value="">Select {label}</option>
//       {options.map((opt, i) => (
//         <option key={i} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   </div>
// );

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";

export default function CandidateForm() {
  const navigate = useNavigate();
  const { setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resumeLink = "";

    if (resumeFile) {
      const resumeData = new FormData();
      resumeData.append("resume", resumeFile);

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/candidates/upload`,
        {
          method: "POST",
          body: resumeData,
        }
      );

      const result = await res.json();
      resumeLink = result.fileUrl; // 👈 fileUrl must be returned from backend
    }

    const finalData = { ...formData, resumeLink };
    setProfile(finalData);

    // 🔁 Post to backend to store in DB
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/candidates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    navigate("/candidate-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Candidate Profile Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input label="First Name" name="firstName" onChange={handleChange} />
          <Input label="Last Name" name="lastName" onChange={handleChange} />
          <Input label="Mobile Number" name="mobile" onChange={handleChange} />
          <Input
            label="Alternate Mobile Number"
            name="altMobile"
            onChange={handleChange}
          />
          <Input
            label="Primary Email"
            name="primaryEmail"
            onChange={handleChange}
          />
          <Input
            label="Secondary Email"
            name="secondaryEmail"
            onChange={handleChange}
          />
          <Input
            label="LinkedIn Link"
            name="linkedin"
            onChange={handleChange}
          />
          <Input
            label="Portfolio Link"
            name="portfolio"
            onChange={handleChange}
          />
          <Input label="Website Link" name="website" onChange={handleChange} />
          <Input label="WhatsApp No" name="whatsapp" onChange={handleChange} />
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            onChange={handleChange}
          />
          <Input
            label="Current Company"
            name="currentCompany"
            onChange={handleChange}
          />
          <Select
            label="Company Sector"
            name="companySector"
            onChange={handleChange}
            options={["IT", "Finance", "Healthcare", "Education", "Other"]}
          />
          <Select
            label="Company Level"
            name="companyLevel"
            onChange={handleChange}
            options={["Startup", "SME", "MNC"]}
          />
          <Select
            label="Product/Services"
            name="productService"
            onChange={handleChange}
            options={["Product-Based", "Service-Based", "Both"]}
          />
          <Select
            label="Product Domain"
            name="productDomain"
            onChange={handleChange}
            options={["HR Tech", "EdTech", "FinTech", "HealthTech", "Other"]}
          />
          <Select
            label="Product Category"
            name="productCategory"
            onChange={handleChange}
            options={["B2B", "B2C", "Marketplace", "Other"]}
          />
          <Input
            label="Current Role"
            name="currentRole"
            onChange={handleChange}
          />
          <Select
            label="Total Experience"
            name="totalExperience"
            onChange={handleChange}
            options={["Fresher", "1-2 years", "3-5 years", "5+ years"]}
          />
          <Input
            label="Relevant Experience"
            name="relevantExperience"
            onChange={handleChange}
          />
          <Select
            label="Pedigree Level"
            name="pedigree"
            onChange={handleChange}
            options={["Tier 1", "Tier 2", "Tier 3", "Other"]}
          />
          <Input
            label="Primary Skill"
            name="primarySkill"
            onChange={handleChange}
          />

          {/* ✅ Resume Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Upload Resume
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleResumeChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 px-8 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Component
const Input = ({ label, name, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2"
    />
  </div>
);

// Reusable Select Component
const Select = ({ label, name, onChange, options = [] }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <select
      name={name}
      onChange={onChange}
      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2"
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
