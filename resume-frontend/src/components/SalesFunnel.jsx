import React, { useState } from "react";

const stages = [
  {
    id: 1,
    title: "Sourced",
    description: "Candidates sourced by recruiter",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Screening",
    description: "Initial screening completed",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 3,
    title: "Client Shortlist",
    description: "Shortlisted by client",
    color: "from-green-500 to-green-600",
  },
  {
    id: 4,
    title: "Intro Scheduled",
    description: "Introduction call scheduled",
    color: "from-red-500 to-red-600",
  },
  {
    id: 5,
    title: "Assignment Sch",
    description: "Assignment stage set",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 6,
    title: "L1",
    description: "Level 1 interview",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 7,
    title: "L2",
    description: "Level 2",
    color: "from-teal-500 to-teal-600",
  },
  {
    id: 8,
    title: "L3",
    description: "Final",
    color: "from-pink-500 to-pink-600",
  },
];

const sampleCandidates = {
  Sourced: ["Sasi Kumar", "Akhil Raj"],
  Screening: ["Kiran"],
  "Client Shortlist": ["Rajesh"],
  "Intro Scheduled": ["Ananya"],
  "Assignment Scheduled": ["Vimal"],
  "L1 Interview": ["Priya"],
  "L2 Interview": ["Ganesh"],
  "L3 Interview": ["Divya"],
};

const CandidateFunnel = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Candidate Pipeline
      </h2>

      <div className="relative">
        {stages.map((stage, index) => {
          const width = 100 - index * 12;
          const marginLeft = index * 6;

          return (
            <div
              key={stage.id}
              className="relative mb-2 transition-all duration-300 hover:scale-105 hover:z-10"
              style={{ width: `${width}%`, marginLeft: `${marginLeft}%` }}
              onClick={() => setSelectedStage(stage.title)}
            >
              <div
                className={`bg-gradient-to-r ${stage.color} text-white py-6 px-8 shadow-lg cursor-pointer group`}
                style={{
                  clipPath:
                    index === stages.length - 1
                      ? "polygon(0 0, 100% 0, 85% 100%, 15% 100%)"
                      : "polygon(0 0, 100% 0, 92% 100%, 8% 100%)",
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center">
                    {stage.id}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{stage.title}</h3>
                    <p className="text-sm opacity-90 mt-1 group-hover:opacity-100">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
              {index < stages.length - 1 && (
                <div className="absolute left-1/2 -bottom-1 w-px h-2 bg-gray-300 transform -translate-x-1/2 z-0" />
              )}
            </div>
          );
        })}
      </div>

      {selectedStage && (
        <div className="mt-8 bg-white shadow p-6 rounded">
          <h4 className="text-lg font-semibold mb-4">
            {selectedStage} Candidates
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            {sampleCandidates[selectedStage]?.map((name, idx) => (
              <li key={idx}>{name}</li>
            )) || <li>No candidates found.</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CandidateFunnel;
