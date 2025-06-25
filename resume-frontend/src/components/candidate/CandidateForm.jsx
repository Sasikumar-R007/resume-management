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

  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resumeLink = profile.resumeLink || ""; // use existing link if editing

    // ✅ Conditionally skip upload on Vercel (temporary)
    const isUploadAllowed = process.env.REACT_APP_UPLOAD_ENABLED === "true";

    if (resumeFile && isUploadAllowed) {
      const resumeData = new FormData();
      resumeData.append("resume", resumeFile);

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/candidates/upload`,
          {
            method: "POST",
            body: resumeData,
          }
        );

        const result = await res.json();
        resumeLink = result.fileUrl;
      } catch (err) {
        console.error("Resume upload failed:", err);
      }
    }

    const finalData = { ...formData, resumeLink };

    try {
      if (onSave) {
        setProfile(finalData);
        onSave(finalData);
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/candidates`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          }
        );

        if (response.ok) {
          setProfile(finalData);
          navigate("/candidate-dashboard");
        } else {
          console.error("Failed to submit candidate data");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    console.log("Submitting:", finalData);
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
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <Input
            label="Alternate Mobile Number"
            name="altMobile"
            value={formData.altMobile}
            onChange={handleChange}
          />
          <Input
            label="Primary Email"
            name="primaryEmail"
            value={formData.primaryEmail}
            onChange={handleChange}
          />
          <Input
            label="Secondary Email"
            name="secondaryEmail"
            value={formData.secondaryEmail}
            onChange={handleChange}
          />
          <Input
            label="LinkedIn Link"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
          <Input
            label="Portfolio Link"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
          />
          <Input
            label="Website Link"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
          <Input
            label="WhatsApp No"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          <Input
            label="Current Company"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleChange}
          />

          <Select
            label="Company Sector"
            name="companySector"
            value={formData.companySector}
            onChange={handleChange}
            options={[
              "Aerospace & Defense",
              "Healthcare",
              "Oil and Gas",
              "Agriculture",
              "High Technology",
              "Private Equity",
              "Automotive",
              "Industrial Manufacturing",
              "Professional Services",
              "Chemical Manufacturing",
              "Information Services & Publishing",
              "Public Sector",
              "Communication Services",
              "Insurance",
              "Retail",
              "Consumer Packaged Goods",
              "Life Sciences",
              "Semiconductor",
              "Education",
              "Logistics & Distribution",
              "Travel and Hospitality",
              "Engineering Procurement & Construction",
              "Media and Entertainment",
              "Utilities",
              "Financial Services",
              "Mining",
              "Waste Management",
              "Other",
            ]}
          />
          <Select
            label="Company Level"
            name="companyLevel"
            value={formData.companyLevel}
            onChange={handleChange}
            options={[
              "Startup - Bootstrapped",
              "Startup - Funded",
              "Medium Enterprise - PAN India",
              "Medium Enterprise - MNC",
              "Large Enterprise - PAN India",
              "Large Enterprise - MNC",
            ]}
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
            options={["B2B", "B2C"]}
          />
          <Input
            label="Current Role"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleChange}
          />
          <Input
            label="Total Experience"
            name="totalExperience"
            value={formData.totalExperience}
            onChange={handleChange}
          />
          <Input
            label="Relevant Experience"
            name="relevantExperience"
            value={formData.relevantExperience}
            onChange={handleChange}
          />
          <Select
            label="Pedigree Level"
            name="pedigree"
            value={formData.pedigree}
            onChange={handleChange}
            options={["Tier 1", "Tier 2", "Tier 3", "Other"]}
          />
          <Input
            label="Primary Skill"
            name="primarySkill"
            value={formData.primarySkill}
            onChange={handleChange}
          />
          <Input
            label="Secondary Skill"
            name="secondarySkill"
            value={formData.secondarySkill}
            onChange={handleChange}
          />
          <Input
            label="Knowledge Only"
            name="knowledgeOnly"
            value={formData.knowledgeOnly}
            onChange={handleChange}
          />
          <Input
            label="Current Location"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleChange}
          />
          <Input
            label="Preferred Location"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
          />
          <Select
            label="Notice Period"
            name="noticePeriod"
            value={formData.noticePeriod}
            onChange={handleChange}
            options={[
              "15 Days",
              "30 Days",
              "45 Days",
              "60 Days",
              "90 Days / Above",
              "Currently Serving Notice",
            ]}
          />

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Upload Resume (PDF or Image)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setResumeFile(e.target.files[0])}
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
