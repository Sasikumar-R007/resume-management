// src/components/recruiter/PipelinePage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const pipelineStages = [
  { title: "Sourced", count: 12 },
  { title: "Screening", count: 8 },
  { title: "Client Shortlist", count: 6 },
  { title: "Intro Scheduled", count: 5 },
  { title: "Assignment Scheduled", count: 4 },
  { title: "L1 Interview", count: 3 },
  { title: "L2 Interview", count: 2 },
  { title: "L3 Interview", count: 1 },
];

const PipelinePage = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  const handleClick = (stage) => {
    setSelectedStage(stage);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Candidate Pipeline</h2>

      <div className="flex flex-col gap-3">
        {pipelineStages.map((stage, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(stage)}
            whileHover={{ scale: 1.02 }}
            className={`w-[calc(100%-${index * 5}%)] bg-white shadow px-6 py-3 rounded-xl cursor-pointer border-l-8 border-blue-500`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{stage.title}</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {stage.count} candidates
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedStage && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">
            Candidates in {selectedStage.title}
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            {Array.from({ length: selectedStage.count }).map((_, i) => (
              <li key={i}>Candidate {i + 1}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PipelinePage;
