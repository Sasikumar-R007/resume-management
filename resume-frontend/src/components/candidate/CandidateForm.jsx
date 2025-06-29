// ✅ Multi-step Candidate Form (Stepper-based)
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";
import { Check } from "lucide-react";

export default function MultiStepCandidateForm({ initialData = {}, onSave }) {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState(profile || {});
  const [resumeFile, setResumeFile] = useState(null);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const steps = ["Personal", "Skills", "Experience", "Additional Info"];

  const handleResumeUpload = async () => {
    if (!resumeFile) return profile.resumeLink || "";
    const resumeData = new FormData();
    resumeData.append("resume", resumeFile);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/candidates/upload`,
        { method: "POST", body: resumeData }
      );
      const result = await res.json();
      return result.fileUrl;
    } catch (err) {
      console.error("Resume upload failed:", err);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resumeLink = await handleResumeUpload();
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
          setStep(steps.length + 1);
          setTimeout(() => navigate("/candidate-dashboard"), 2000);
        } else console.error("Failed to submit candidate data");
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const Stepper = () => (
    <div className="mb-8">
      <div className="relative h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / steps.length) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        {[...steps, "Done"].map((s, i) => (
          <div
            key={i}
            className={`flex flex-col items-center w-full ${
              i + 1 <= step ? "text-green-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-xs font-semibold
              ${
                i + 1 === step
                  ? "bg-blue-600 text-white"
                  : i + 1 < step
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {i + 1 < step ? <Check size={14} /> : i + 1}
            </div>
            {s}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              label="Alternate Mobile"
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
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Select
              label="Pedigree Level"
              name="pedigree"
              value={formData.pedigree}
              onChange={handleChange}
              options={[
                "Tier 1 Institution",
                "Tier 2 Institution",
                "Tier 3 Institution",
                "Other",
              ]}
            />
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              options={[
                "AI & ML Platforms",
                "AgriTech SaaS",
                "Analytics & Business Intelligence",
                "Billing, Payments & Subscription Management",
                "Clean Energy & Sustainability SaaS",
                "Creator SaaS",
                "Customer Support & Experience",
                "DevTools, Testing & API Management",
                "Digital Adoption & Learning Platforms",
                "eCommerce",
                "EdTech SaaS",
                "FinTech SaaS",
                "GovTech SaaS",
                "HealthTech SaaS",
                "HRTech & Talent Management",
                "LegalTech & Compliance",
                "Logistics & Supply Chain SaaS",
                "Marketing & Customer Engagement",
                "Productivity, Collaboration & Project Management",
                "PropTech & Real Estate SaaS",
                "Remote Work SaaS",
                "Sales Enablement & RevOps",
                "Security & Compliance Automation",
                "Video SaaS",
                "Other",
              ]}
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
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
            <Input
              label="Portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
            />
            <Input
              label="Website"
              name="website"
              value={formData.website}
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
              <label className="block text-sm font-medium text-gray-700">
                Upload Resume (PDF/Image)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                  className="px-6 py-2 rounded bg-gray-300 text-gray-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-green-600 text-white"
                >
                  Submit Profile
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              🎉 Profile Submitted!
            </h3>
            <p className="text-gray-700">You’ll be redirected shortly...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Candidate Profile
        </h2>
        <Stepper />
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          {step < steps.length && (
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                disabled={step === 1}
                className="px-6 py-2 rounded bg-gray-300 text-gray-800 disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="px-6 py-2 rounded bg-blue-600 text-white"
              >
                Next
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options = [] }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
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
