import { useState, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { FilterPanel } from "./FilterPanel";
import { CandidateResults } from "./CandidateResults";

// Mock candidate data
const MOCK_CANDIDATES = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Senior Frontend Developer",
    experience: 5,
    location: "San Francisco, CA",
    education: "Bachelor's Degree",
    currentCompany: "Tech Corp",
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL", "MongoDB"],
    summary:
      "Passionate frontend developer with expertise in React ecosystem and modern web technologies. Led multiple high-impact projects with focus on user experience and performance optimization.",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "David Lee",
    title: "Backend Engineer",
    experience: 4,
    location: "Seattle, WA",
    education: "Master's Degree",
    currentCompany: "CloudNet",
    skills: ["Node.js", "Express", "MongoDB", "Docker", "AWS"],
    summary:
      "Strong backend developer with experience in scalable microservices, cloud deployment and API integration.",
    lastActive: "1 day ago",
  },
  // Add more candidates if needed
];

export function SourceResume() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const [filters, setFilters] = useState({
    location: [],
    experience: [0, 15],
    skills: [],
    education: "",
    company: "",
  });

  const CANDIDATES_PER_PAGE = 4;

  const handleSearch = () => {
    setCurrentPage(1);
    setShowResults(true);
  };

  // Filter logic
  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter((candidate) => {
      const query = searchQuery.toLowerCase();
      const searchableText = `${candidate.name} ${candidate.title} ${candidate.currentCompany} ${candidate.skills.join(" ")}`.toLowerCase();
      if (query && !searchableText.includes(query)) return false;

      if (
        candidate.experience < filters.experience[0] ||
        candidate.experience > filters.experience[1]
      ) return false;

      if (filters.location.length > 0 && !filters.location.includes(candidate.location)) return false;

      if (
        filters.skills.length > 0 &&
        !filters.skills.every((skill) => candidate.skills.includes(skill))
      ) return false;

      if (filters.education && candidate.education !== filters.education) return false;

      if (
        filters.company &&
        !candidate.currentCompany.toLowerCase().includes(filters.company.toLowerCase())
      ) return false;

      return true;
    });
  }, [searchQuery, filters]);

  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * CANDIDATES_PER_PAGE;
    return filteredCandidates.slice(start, start + CANDIDATES_PER_PAGE);
  }, [filteredCandidates, currentPage]);

  const totalPages = Math.ceil(filteredCandidates.length / CANDIDATES_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Source Resume</h1>
      <p className="text-gray-600 mb-6">Find and connect with top talent across technologies and industries.</p>

      <div className="flex gap-4">
        {/* Left Sidebar - Filters */}
        <div className="w-1/4 bg-white shadow p-4 rounded">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        {/* Right Side - Search & Results */}
        <div className="w-3/4 flex flex-col gap-6">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />

          {showResults && (
            <CandidateResults
              candidates={paginatedCandidates}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalResults={filteredCandidates.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}
