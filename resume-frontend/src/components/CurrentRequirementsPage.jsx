// CurrentRequirementsPage.jsx
import React from 'react';

const requirementsData = [
  {
    team: "Arun's Team",
    data: [
      {
        position: "Golang Engineer",
        criticality: "VERY HIGH",
        company: "ManifestIT",
        contact: "Sudheer",
        advisor: "Nirai"
      },
      {
        position: "GRC Implementation Consultant",
        criticality: "VERY HIGH",
        company: "Corporater",
        contact: "Jude/Mahesh",
        advisor: "Raagavi"
      },
      // ... Add rest of Arun's team data here
    ]
  },
  {
    team: "Anusha's Team",
    data: [
      {
        position: "Tech Lead QA",
        criticality: "VERY HIGH",
        company: "Velsera",
        contact: "Kashmira",
        advisor: "Divya"
      },
      {
        position: "Devops Engineer",
        criticality: "VERY HIGH",
        company: "ManifestIT",
        contact: "Soumya",
        advisor: "Divya"
      },
      // ... Add rest of Anusha's team data here
    ]
  }
];

const CurrentRequirementsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-purple-800">REQUIREMENT TRACKER</h1>
      {requirementsData.map((section, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-xl font-semibold mb-2 bg-blue-200 px-2 py-1">{section.team}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300">
              <thead className="bg-orange-200">
                <tr>
                  <th className="border px-4 py-2">S.No</th>
                  <th className="border px-4 py-2">Position</th>
                  <th className="border px-4 py-2">Criticality</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">Contact Person</th>
                  <th className="border px-4 py-2">Talent Advisor</th>
                </tr>
              </thead>
              <tbody>
                {section.data.map((item, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-cyan-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td className="border px-4 py-2">{item.position}</td>
                    <td className="border px-4 py-2">{item.criticality}</td>
                    <td className="border px-4 py-2">{item.company}</td>
                    <td className="border px-4 py-2">{item.contact}</td>
                    <td className="border px-4 py-2">{item.advisor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentRequirementsPage;
