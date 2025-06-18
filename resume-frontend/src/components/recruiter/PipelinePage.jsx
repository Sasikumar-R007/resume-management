import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

const pipelineStages = [
  { title: "Sourced", count: 12 },
  { title: "Screening", count: 9 },
  { title: "Client Shortlist", count: 7 },
  { title: "Intro Scheduled", count: 5 },
  { title: "Assignment Scheduled", count: 3 },
  { title: "L1 Interview", count: 3 },
  { title: "L2 Interview", count: 2 },
  { title: "L3 Interview", count: 1 },
  { title: "Offer", count: 1 },
];

export default function PipelinePage() {
  const [selectedStage, setSelectedStage] = useState(null);

  const handleClick = (stage) => {
    setSelectedStage(stage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Candidate Pipeline</h2>

      <div className="flex flex-col items-center space-y-2">
        {pipelineStages.map((stage, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(stage)}
            whileHover={{ scale: 1.02 }}
            className={`w-[calc(100%-${index * 5}%)] bg-white shadow-md px-6 py-3 rounded-xl cursor-pointer border-l-8 border-blue-500`}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{selectedStage.title} Candidates</h3>
            <ul className="space-y-2">
              {Array(selectedStage.count)
                .fill(null)
                .map((_, i) => (
                  <li
                    key={i}
                    className="p-2 bg-gray-100 rounded shadow text-sm text-gray-700"
                  >
                    Candidate {i + 1} - [Sample Data]
                  </li>
                ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setSelectedStage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
