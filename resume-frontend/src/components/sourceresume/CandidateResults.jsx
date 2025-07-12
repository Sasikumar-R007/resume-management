import React from 'react';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Building,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function CandidateResults({
  candidates,
  currentPage,
  totalPages,
  setCurrentPage,
  totalResults,
}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return (
      <div className="bg-white p-6 rounded-md shadow text-center">
        <p className="text-gray-600 text-lg font-medium">No candidates found</p>
        <p className="text-sm text-gray-500 mt-2">
          Try adjusting your search criteria or filters to find more candidates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Showing {(currentPage - 1) * 4 + 1}-
          {Math.min(currentPage * 4, totalResults)} of {totalResults} candidates
        </h2>
      </div>

      {/* Candidate List */}
      {candidates.map((candidate) =>
        candidate && candidate.experience !== undefined ? (
          <div
            key={candidate.id}
            className="bg-white shadow-sm rounded-lg p-6 space-y-3 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-blue-600 font-medium">{candidate.title}</p>
              </div>

              <div className="flex gap-2">
                <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Resume
                </button>
                <button className="text-sm px-4 py-2 border rounded hover:bg-gray-100">
                  Save
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                {candidate.experience} years experience
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                {candidate.education}
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400" />
                Current: {candidate.currentCompany}
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Last active: {candidate.lastActive}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {candidate.skills?.slice(0, 6).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
              {candidate.skills?.length > 6 && (
                <span className="text-xs border px-2 py-1 rounded">
                  +{candidate.skills.length - 6} more
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">{candidate.summary}</p>
          </div>
        ) : null
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded disabled:opacity-50 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded border ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded disabled:opacity-50 flex items-center gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
