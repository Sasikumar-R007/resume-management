import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "./ProfileContext"; // Ensure this path is correct
import { Check } from "lucide-react"; // Ensure lucide-react is installed

export default function MultiStepCandidateForm({ initialData = {}, onSave }) {
  const navigate = useNavigate();
  // Ensure ProfileContext provides an initial empty object if profile is null
  const { profile, setProfile } = useContext(ProfileContext);
  // Initialize formData with profile if it exists, otherwise an empty object
  const [formData, setFormData] = useState(profile || {});
  const [resumeFile, setResumeFile] = useState(null);
  const [step, setStep] = useState(1); // Start at Step 1, "About You"

  // Adjust steps based on the image: "About You", "Your Strengths", "Your Journey", "Online presence", "Final Step"
  const steps = [
    "About You",
    "Your Strengths",
    "Your Journey",
    "Online presence",
    "Final Step",
  ];

  // Effect to update formData when profile changes (e.g., loaded from context)
  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      // Safely access profile.resumeLink. If profile is null or resumeLink is undefined, default to empty string.
      return profile?.resumeLink || "";
    }
    const resumeData = new FormData();
    resumeData.append("resume", resumeFile);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/candidates/upload`,
        { method: "POST", body: resumeData }
      );
      const result = await res.json();
      return result.fileUrl || "";
    } catch (err) {
      console.error("Resume upload failed:", err);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1 validation
    if (
      step === 1 &&
      (!formData.primaryEmail || formData.primaryEmail.trim() === "")
    ) {
      alert("Please fill in your Primary Email address");
      return;
    }

    if (step === 4) {
      try {
        const resumeLink = await handleResumeUpload();
        const finalData = { ...formData, resumeLink };

        console.log("Sending candidate data:", finalData);

        if (onSave) {
          setProfile(finalData);
          onSave(finalData);
        } else {
          const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/candidates`, // ✅ Fixed env variable name
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(finalData),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error submitting data:", errorData);
            alert(
              `Error: ${
                errorData.message ||
                errorData.error ||
                "Failed to submit candidate data"
              }`
            );
            return;
          }

          setProfile(finalData); // update context
          setStep(5); // move to final success screen (optional)
          navigate("/candidate-dashboard"); // ✅ navigate immediately
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred during submission.");
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const Stepper = () => (
    <div className="mb-8 relative pt-4">
      {/* Horizontal line connecting steps */}
      <div className="absolute top-[35px] left-0 right-0 h-0.5 bg-gray-200 z-0 mx-auto w-[calc(100%-80px)]">
        <div
          className="absolute h-full bg-blue-500 transition-all duration-300" // Changed to blue-500 for the progress line as in image
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 relative z-10">
        {steps.map((s, i) => (
          <div
            key={i}
            // Use 'flex-grow' and 'mx-1' for equal distribution and slight spacing
            className={`flex flex-col items-center flex-grow mx-1`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 text-lg font-semibold border-2
                ${
                  i + 1 < step
                    ? "bg-blue-500 border-blue-500 text-white" // Completed: Blue background, white checkmark
                    : i + 1 === step
                    ? "bg-white border-blue-500 text-blue-500" // Current: White background, blue border, blue text
                    : "bg-white border-gray-300 text-gray-400" // Pending: White background, gray border, gray text
                }`}
            >
              {i + 1 < step ? (
                <Check size={20} className="text-white" />
              ) : (
                i + 1
              )}
            </div>
            {/* Step Name */}
            <div
              className={`text-center whitespace-nowrap text-sm mt-1 ${
                i + 1 < step
                  ? "text-blue-600 font-semibold" // Completed: Stronger blue
                  : i + 1 === step
                  ? "text-blue-600 font-bold" // Current: Bold blue
                  : "text-gray-700" // Pending: Darker gray
              }`}
            >
              {s}
            </div>
            {/* Status text below step name */}
            <div
              className={`text-xs mt-1 ${
                i + 1 < step
                  ? "text-green-500" // Completed text: Green
                  : i + 1 === step
                  ? "text-blue-500" // In Progress text: Blue
                  : "text-gray-400" // Pending text: Gray
              }`}
            >
              {i + 1 < step
                ? "Completed"
                : i + 1 === step
                ? "In Progress"
                : "Pending"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1: // About You
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              About You
            </h3>
            <p className="text-gray-600 mb-6">
              Let’s start with the basics – just you being you
            </p>{" "}
            {/* Added descriptive text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {" "}
              {/* Increased gaps for lines */}
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isLineInput={true} // New prop for line style
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Alternate Mobile"
                name="altMobile"
                value={formData.altMobile}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Primary Email"
                name="primaryEmail"
                value={formData.primaryEmail}
                onChange={handleChange}
                required
                isLineInput={true}
              />
              <Input
                label="Secondary Email"
                name="secondaryEmail"
                value={formData.secondaryEmail}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="WhatsApp No"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                isLineInput={true}
              />
            </div>
          </>
        );
      case 2: // Your Strengths
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Your Strengths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <Input
                label="Primary Skill"
                name="primarySkill"
                value={formData.primarySkill}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Secondary Skill"
                name="secondarySkill"
                value={formData.secondarySkill}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Knowledge Only"
                name="knowledgeOnly"
                value={formData.knowledgeOnly}
                onChange={handleChange}
                isLineInput={true}
              />
              <Select
                label="Pedigree Level"
                name="pedigree"
                value={formData.pedigree}
                onChange={handleChange}
                isLineInput={true} // Apply to Select as well
                options={[
                  "Tier 1 Institution",
                  "Tier 2 Institution",
                  "Tier 3 Institution",
                  "Other",
                ]}
              />
            </div>
          </>
        );
      case 3: // Your Journey - Matches the image for "Your Journey" section
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your Journey
            </h3>
            <p className="text-gray-600 mb-6">
              Tell us where you've been and what you've done so far.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <Input
                label="Current Company"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                isLineInput={true}
              />
              <Select
                label="Company Sector"
                name="companySector"
                value={formData.companySector}
                onChange={handleChange}
                isLineInput={true}
                options={[
                  "Aerospace & Defense",
                  "Agriculture",
                  "Automotive",
                  "Chemical Manufacturing",
                  "Communication Services",
                  "Consumer Packaged Goods",
                  "Education",
                  "Engineering Procurement & Construction",
                  "Financial Services",
                  "Healthcare",
                  "High Technology",
                  "Industrial Manufacturing",
                  "Information Services & Publishing",
                  "Insurance",
                  "Life Sciences",
                  "Logistics & Distribution",
                  "Media and Entertainment",
                  "Mining",
                  "Oil and Gas",
                  "Private Equity",
                  "Professional Services",
                  "Public Sector",
                  "Retail",
                  "Semiconductor",
                  "Travel and Hospitality",
                  "Utilities",
                  "Waste Management",
                  "Other",
                ]}
              />
              <Input
                label="Current Role"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                isLineInput={true}
              />
              <Select
                label="Product / Service"
                name="productService"
                value={formData.productService}
                onChange={handleChange}
                isLineInput={true}
                options={["Product-Based", "Service-Based", "Both"]}
              />
              <Select
                label="Company Level"
                name="companyLevel"
                value={formData.companyLevel}
                onChange={handleChange}
                isLineInput={true}
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
                label="Product Category"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                isLineInput={true}
                options={["B2B", "B2C"]}
              />
              <Input
                label="Product Domain"
                name="productDomain"
                value={formData.productDomain}
                onChange={handleChange}
                isLineInput={true}
              />
            </div>
          </>
        );
      case 4: // Online Presence
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Online presence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <Input
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Current Location"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                isLineInput={true}
              />
              <Input
                label="Preferred Location"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                isLineInput={true}
              />
              <Select
                label="Notice Period"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                isLineInput={true}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Resume (PDF/Image)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-blue-500" // Line style
                />
              </div>
            </div>
          </>
        );
      case 5: // Final Step - Submission success/confirmation
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
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/cand-fbg.jpg')" }}
    >
      {/* Top-left yellow box */}
      {/* <div className="absolute top-0 left-0 w-36 h-36 bg-yellow-400 rounded-md shadow-md z-20" /> */}

      {/* Centered form container */}
      <div className="bg-white bg-opacity-90 backdrop-blur-sm w-full max-w-3xl p-8 rounded-xl shadow-lg border mx-4 z-30">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Candidate Profile
        </h2>
        <Stepper />
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          <div className="flex justify-between pt-6">
            {step > 1 && step < steps.length && (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                className="px-6 py-2 rounded bg-gray-300 text-gray-800"
              >
                Back
              </button>
            )}

            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="px-6 py-2 rounded bg-blue-600 text-white"
              >
                Next
              </button>
            )}

            {step === steps.length - 1 && (
              <button
                type="submit"
                className="ml-auto px-6 py-2 rounded bg-green-600 text-white"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Input component updated for line style
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  isLineInput = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      // Conditional styling for line input vs. box input
      className={`w-full py-2 text-gray-900 focus:outline-none focus:border-blue-500 sm:text-sm ${
        isLineInput
          ? "border-b border-gray-300 bg-transparent"
          : "border border-gray-300 rounded-md shadow-sm"
      }`}
    />
  </div>
);

// Select component updated for line style
const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  isLineInput = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      // Conditional styling for line input vs. box input
      className={`block w-full pl-3 pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
        isLineInput
          ? "border-b border-gray-300 bg-transparent"
          : "border border-gray-300 rounded-md shadow-sm"
      }`}
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
