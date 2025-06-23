import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";

export default function CandidateForm({ initialData = {}, onSave }) {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState(profile || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = { ...formData };

    if (onSave) {
      // 👉 Edit mode
      setProfile(finalData);
      onSave(finalData);
    } else {
      // 👉 New submission
      setProfile(finalData);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/candidates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      navigate("/candidate-dashboard");
    }
  };

  useEffect(() => {
    if (profile) {
      setFormData(profile); // ✅ preload
    }
  }, [profile]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Candidate Profile Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <Input label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
          <Input label="Alternate Mobile Number" name="altMobile" value={formData.altMobile} onChange={handleChange} />
          <Input label="Primary Email" name="primaryEmail" value={formData.primaryEmail} onChange={handleChange} />
          <Input label="Secondary Email" name="secondaryEmail" value={formData.secondaryEmail} onChange={handleChange} />
          <Input label="LinkedIn Link" name="linkedin" value={formData.linkedin} onChange={handleChange} />
          <Input label="Portfolio Link" name="portfolio" value={formData.portfolio} onChange={handleChange} />
          <Input label="Website Link" name="website" value={formData.website} onChange={handleChange} />
          <Input label="WhatsApp No" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
          <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
          <Input label="Current Company" name="currentCompany" value={formData.currentCompany} onChange={handleChange} />

          <Select
            label="Company Sector"
            name="companySector"
            value={formData.companySector}
            onChange={handleChange}
            options={["IT", "Finance", "Healthcare", "Education", "Other"]}
          />
          <Select
            label="Company Level"
            name="companyLevel"
            value={formData.companyLevel}
            onChange={handleChange}
            options={["Startup", "SME", "MNC"]}
          />
          <Select
            label="Product/Services"
            name="productService"
            value={formData.productService}
            onChange={handleChange}
            options={["Product-Based", "Service-Based", "Both"]}
          />
          <Select
            label="Product Domain"
            name="productDomain"
            value={formData.productDomain}
            onChange={handleChange}
            options={["HR Tech", "EdTech", "FinTech", "HealthTech", "Other"]}
          />
          <Select
            label="Product Category"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            options={["B2B", "B2C", "Marketplace", "Other"]}
          />
          <Input label="Current Role" name="currentRole" value={formData.currentRole} onChange={handleChange} />
          <Select
            label="Total Experience"
            name="totalExperience"
            value={formData.totalExperience}
            onChange={handleChange}
            options={["Fresher", "1-2 years", "3-5 years", "5+ years"]}
          />
          <Input label="Relevant Experience" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
          <Select
            label="Pedigree Level"
            name="pedigree"
            value={formData.pedigree}
            onChange={handleChange}
            options={["Tier 1", "Tier 2", "Tier 3", "Other"]}
          />
          <Input label="Primary Skill" name="primarySkill" value={formData.primarySkill} onChange={handleChange} />
          <Input label="Secondary Skill" name="secondarySkill" value={formData.secondarySkill} onChange={handleChange} />
          <Input label="Knowledge Only" name="knowledgeOnly" value={formData.knowledgeOnly} onChange={handleChange} />
          <Input label="Current Location" name="currentLocation" value={formData.currentLocation} onChange={handleChange} />
          <Input label="Preferred Location" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} />

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

// ✅ Reusable Input with value support
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2"
    />
  </div>
);

// ✅ Reusable Select with value support
const Select = ({ label, name, value, onChange, options = [] }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <select
      name={name}
      value={value || ""}
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
