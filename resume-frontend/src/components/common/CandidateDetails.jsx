import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CandidateDetails() {
  const { candidateId } = useParams(); // Get candidateId from URL
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/candidates/${candidateId}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching candidate:", err));
  }, [candidateId]);

  if (!data) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading candidate details...
      </div>
    );
  }

  const Section = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-blue-600 mb-3">{title}</h3>
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Candidate Details
        </h2>

        {/* 🔽 Use all fields as you posted earlier */}
        <Section title="1) Personal Information">
          <Field label="First Name" value={data.firstName} />
          <Field label="Last Name" value={data.lastName} />
          <Field label="Mobile Number" value={data.mobile} />
          <Field label="Alternate Mobile" value={data.altMobile} />
          <Field label="Primary Email" value={data.primaryEmail} />
          <Field label="Secondary Email" value={data.secondaryEmail} />
          <Field label="WhatsApp No" value={data.whatsapp} />
          <Field label="Date of Birth" value={data.dob} />
        </Section>

        <Section title="2) Skills">
          <Field label="Primary Skill" value={data.primarySkill} />
          <Field label="Secondary Skill" value={data.secondarySkill} />
          <Field label="Knowledge Only" value={data.knowledgeOnly} />
          <Field label="Pedigree Level" value={data.pedigree} />
        </Section>

        <Section title="3) Experience">
          <Field label="Current Company" value={data.currentCompany} />
          <Field label="Company Sector" value={data.companySector} />
          <Field label="Company Level" value={data.companyLevel} />
          <Field label="Product/Services" value={data.productService} />
          <Field label="Current Role" value={data.currentRole} />
          <Field label="Total Experience" value={data.totalExperience} />
          <Field label="Relevant Experience" value={data.relevantExperience} />
        </Section>

        <Section title="4) Additional Info">
          <Field label="LinkedIn" value={data.linkedin} />
          <Field label="Portfolio" value={data.portfolio} />
          <Field label="Website" value={data.website} />
          <Field label="Current Location" value={data.currentLocation} />
          <Field label="Preferred Location" value={data.preferredLocation} />
          <Field label="Notice Period" value={data.noticePeriod} />
        </Section>

        {data.resumeLink && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Resume Preview
            </h3>
            <iframe
              src={data.resumeLink}
              title="Resume"
              className="w-1/2 h-96 border rounded"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
