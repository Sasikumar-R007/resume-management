import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";

const CandidateResults = ({
  candidates = [], // ✅ default to empty array
  currentPage = 1,
  totalPages = 1,
  setCurrentPage = () => {},
  totalResults = 0,
}) => {
  const safeCandidates = Array.isArray(candidates) ? candidates : [];

  const handleViewResume = (candidateId) => {
    console.log("View resume for candidate:", candidateId);
  };

  const handleSaveCandidate = (candidateId) => {
    console.log("Save candidate:", candidateId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Search Results ({totalResults})
          </h3>
          <p className="text-sm text-gray-600">
            Showing {safeCandidates.length > 0 ? (currentPage - 1) * 4 + 1 : 0}{" "}
            - {Math.min(currentPage * 4, totalResults)} of {totalResults}{" "}
            candidates
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {safeCandidates.length === 0 ? (
          <div className="p-8 bg-white text-center rounded shadow">
            <p className="text-gray-500">
              No candidates found matching your criteria.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        ) : (
          safeCandidates.map((candidate) => (
            <div
              key={candidate?.id || Math.random()}
              className="bg-white rounded shadow hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {candidate?.name || "Unknown"}
                        </h4>
                        <p className="text-blue-600 font-medium mb-2">
                          {candidate?.title || candidate?.designation || "N/A"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveCandidate(candidate?.id)}
                          className="text-sm px-3 py-1 border rounded border-gray-300 hover:bg-gray-100"
                        >
                          Save Candidate
                        </button>
                        <button
                          onClick={() => handleViewResume(candidate?.id)}
                          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          View Resume
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaBriefcase className="mr-2 text-gray-400" />
                        {candidate?.experience || 0} years experience
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        {candidate?.location || "N/A"}
                      </div>
                      <div className="flex items-center">
                        <FaBuilding className="mr-2 text-gray-400" />
                        {candidate?.currentCompany ||
                          candidate?.company ||
                          "N/A"}
                      </div>
                      <div className="flex items-center">
                        <FaGraduationCap className="mr-2 text-gray-400" />
                        {candidate?.education || "N/A"}
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {(candidate?.skills || [])
                        .slice(0, 6)
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-200 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      {(candidate?.skills?.length || 0) > 6 && (
                        <span className="text-xs border px-2 py-1 rounded">
                          +{candidate.skills.length - 6} more
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-4">
                      {candidate?.summary || "No summary available."}
                    </p>

                    <div className="flex items-center text-xs text-gray-500">
                      <FaClock className="mr-1" />
                      Last active: {candidate?.lastActive || "Unknown"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateResults;
