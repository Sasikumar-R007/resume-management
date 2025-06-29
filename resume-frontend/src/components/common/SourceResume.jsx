import React, { useState } from "react";

const mockCandidates = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    location: "Mumbai",
    experience: 5,
    company: "ABC Corp",
    education: { degree: "B.Tech", college: "IIT Bombay" },
    skills: ["React", "Node.js", "AWS"],
    lastActive: "2 days ago",
    profilePicture: "https://via.placeholder.com/50",
    noticePeriod: "30 days",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Data Scientist",
    location: "Bangalore",
    experience: 7,
    company: "XYZ Ltd",
    education: { degree: "M.Tech", college: "NIT Trichy" },
    skills: ["Python", "SQL", "MongoDB"],
    lastActive: "1 week ago",
    profilePicture: "https://via.placeholder.com/50",
    noticePeriod: "15 days",
  },
  {
    id: 3,
    name: "Alex Johnson",
    designation: "UI/UX Designer",
    location: "Delhi",
    experience: 3,
    company: "Design Co.",
    education: { degree: "B.Des", college: "SRM University" },
    skills: ["Figma", "React"],
    lastActive: "3 days ago",
    profilePicture: "https://via.placeholder.com/50",
    noticePeriod: "Immediate",
  },
];

const locations = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Chennai",
  "Hyderabad",
  "Pune",
];
const skillsList = [
  "React",
  "Node.js",
  "Python",
  "AWS",
  "MongoDB",
  "Figma",
  "SQL",
];
const educationDegrees = [
  "B.Tech",
  "M.Tech",
  "B.Sc",
  "M.Sc",
  "BCA",
  "MCA",
  "B.Des",
  "MBA",
];
const colleges = [
  "IIT Bombay",
  "NIT Trichy",
  "Anna University",
  "SRM University",
];

function SourceResume() {
  const [isSearched, setIsSearched] = useState(false);
  const [filters, setFilters] = useState({
    searchText: "",
    booleanSearch: false,
    locations: [],
    minExperience: "",
    maxExperience: "",
    skills: [],
    education: [],
    colleges: [],
    company: "",
    designation: "",
    noticePeriod: "",
  });
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = mockCandidates.filter((candidate) => {
      const {
        searchText,
        locations,
        minExperience,
        maxExperience,
        skills,
        education,
        colleges,
        company,
        designation,
        noticePeriod,
      } = filters;

      const textMatch =
        candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchText.toLowerCase())
        ) ||
        candidate.company.toLowerCase().includes(searchText.toLowerCase());

      const locationMatch =
        locations.length === 0 || locations.includes(candidate.location);
      const experienceMatch =
        (minExperience === "" ||
          candidate.experience >= parseInt(minExperience)) &&
        (maxExperience === "" ||
          candidate.experience <= parseInt(maxExperience));
      const skillsMatch =
        skills.length === 0 ||
        skills.some((skill) => candidate.skills.includes(skill));
      const educationMatch =
        education.length === 0 ||
        education.includes(candidate.education.degree);
      const collegeMatch =
        colleges.length === 0 || colleges.includes(candidate.education.college);
      const companyMatch =
        company === "" ||
        candidate.company.toLowerCase().includes(company.toLowerCase());
      const designationMatch =
        designation === "" ||
        candidate.designation.toLowerCase().includes(designation.toLowerCase());
      const noticePeriodMatch =
        noticePeriod === "" || candidate.noticePeriod === noticePeriod;

      return (
        textMatch &&
        locationMatch &&
        experienceMatch &&
        skillsMatch &&
        educationMatch &&
        collegeMatch &&
        companyMatch &&
        designationMatch &&
        noticePeriodMatch
      );
    });

    setFilteredCandidates(filtered);
    setIsSearched(true);
  };

  const handleClearAll = () => {
    setFilters({
      searchText: "",
      booleanSearch: false,
      locations: [],
      minExperience: "",
      maxExperience: "",
      skills: [],
      education: [],
      colleges: [],
      company: "",
      designation: "",
      noticePeriod: "",
    });
    setFilteredCandidates([]);
    setIsSearched(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      {isSearched ? (
        <div className="flex">
          <div className="w-1/4 bg-white shadow-lg p-6 max-h-screen overflow-y-auto">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onClearAll={handleClearAll}
            />
          </div>

          <div className="w-3/4 p-6">
            <h2 className="text-2xl font-bold mb-4">
              Candidates Found: {filteredCandidates.length}
            </h2>
            {currentCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
            <div className="mt-6 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClearAll={handleClearAll}
          />
        </div>
      )}
    </div>
  );
}

const FilterPanel = ({ filters, onFilterChange, onSearch, onClearAll }) => (
  <div className="bg-white shadow-md rounded p-4">
    <h2 className="text-xl font-bold mb-4">Source Resume</h2>

    <input
      type="text"
      value={filters.searchText}
      onChange={(e) => onFilterChange("searchText", e.target.value)}
      placeholder="Search by name, skill, or company"
      className="w-full mb-4 p-2 border border-gray-300 rounded"
    />

    {/* Locations */}
    <div className="mb-4">
      <label className="font-medium">Location:</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {locations.map((loc) => (
          <label key={loc} className="text-sm">
            <input
              type="checkbox"
              className="mr-1"
              checked={filters.locations.includes(loc)}
              onChange={(e) =>
                onFilterChange(
                  "locations",
                  e.target.checked
                    ? [...filters.locations, loc]
                    : filters.locations.filter((l) => l !== loc)
                )
              }
            />
            {loc}
          </label>
        ))}
      </div>
    </div>

    {/* Experience */}
    <div className="flex space-x-4 mb-4">
      <input
        type="number"
        value={filters.minExperience}
        onChange={(e) => onFilterChange("minExperience", e.target.value)}
        placeholder="Min Exp"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        value={filters.maxExperience}
        onChange={(e) => onFilterChange("maxExperience", e.target.value)}
        placeholder="Max Exp"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    {/* Skills */}
    <input
      type="text"
      placeholder="Add Skill"
      onChange={(e) => {
        const input = e.target.value.toLowerCase();
        const match = skillsList.find((s) => s.toLowerCase().includes(input));
        if (match && !filters.skills.includes(match)) {
          onFilterChange("skills", [...filters.skills, match]);
        }
      }}
      className="w-full mb-2 p-2 border border-gray-300 rounded"
    />
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.skills.map((skill) => (
        <span key={skill} className="bg-blue-100 px-2 py-1 rounded text-sm">
          {skill}
          <button
            className="ml-1 text-red-500"
            onClick={() =>
              onFilterChange(
                "skills",
                filters.skills.filter((s) => s !== skill)
              )
            }
          >
            x
          </button>
        </span>
      ))}
    </div>

    {/* Company */}
    <input
      type="text"
      value={filters.company}
      onChange={(e) => onFilterChange("company", e.target.value)}
      placeholder="Company"
      className="w-full mb-4 p-2 border border-gray-300 rounded"
    />

    {/* Notice Period */}
    <select
      value={filters.noticePeriod}
      onChange={(e) => onFilterChange("noticePeriod", e.target.value)}
      className="w-full mb-4 p-2 border border-gray-300 rounded"
    >
      <option value="">Notice Period</option>
      <option value="Immediate">Immediate</option>
      <option value="15 days">15 days</option>
      <option value="30 days">30 days</option>
    </select>

    <div className="flex space-x-2 mt-4">
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        🔍 Search
      </button>
      <button
        onClick={onClearAll}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        ❌ Clear
      </button>
    </div>
  </div>
);

const CandidateCard = ({ candidate }) => (
  <div className="bg-white shadow-md rounded p-4 mb-4 flex">
    <img
      src={candidate.profilePicture}
      alt="Profile"
      className="w-12 h-12 rounded-full mr-4"
    />
    <div className="flex-1">
      <h3 className="text-xl font-semibold">{candidate.name}</h3>
      <p className="text-gray-600">{candidate.designation}</p>
      <p className="text-sm text-gray-500 mt-1">
        📍 {candidate.location} | 🕒 {candidate.experience} yrs exp
      </p>
      <p className="mt-1">🏢 {candidate.company}</p>
      <p className="mt-1">
        🎓 {candidate.education.degree} - {candidate.education.college}
      </p>
      <p className="mt-1">
        🛠️ Skills:
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="inline-block bg-gray-200 text-xs px-2 py-1 rounded ml-2"
          >
            {skill}
          </span>
        ))}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        🕑 Last Active: {candidate.lastActive}
      </p>
      <div className="mt-2 flex space-x-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
          Save
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
          View Resume
        </button>
      </div>
    </div>
  </div>
);

export default SourceResume;


// import React, { useState } from 'react';
// import { FaMapMarkerAlt, FaBriefcase, FaClock, FaGraduationCap, FaBuilding } from 'react-icons/fa';

// const mockCandidates = [
//   {
//     id: 1,
//     name: 'John Doe',
//     designation: 'Software Engineer',
//     location: 'Mumbai',
//     experience: 5,
//     company: 'ABC Corp',
//     education: 'B.Tech from IIT Bombay',
//     skills: ['React', 'Node.js', 'AWS', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
//     lastActive: '2 days ago',
//     summary: 'Experienced full-stack developer with cloud skills.',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     designation: 'Data Scientist',
//     location: 'Bangalore',
//     experience: 7,
//     company: 'XYZ Ltd',
//     education: 'M.Tech from NIT Trichy',
//     skills: ['Python', 'SQL', 'Pandas', 'Numpy'],
//     lastActive: '1 week ago',
//     summary: 'Passionate data scientist focused on big data and ML.',
//   },
// ];

// const SourceResume = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [isSearched, setIsSearched] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   const handleSearch = () => {
//     const filtered = mockCandidates.filter((c) =>
//       c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       c.company.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredCandidates(filtered);
//     setIsSearched(true);
//     setCurrentPage(1);
//   };

//   const displayedCandidates = filteredCandidates.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-bold mb-4">Source Resume</h2>
//         <div className="flex space-x-4 mb-4">
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Search by name, skills, or company..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button
//             onClick={handleSearch}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Search
//           </button>
//         </div>

//         {isSearched && (
//           <div className="space-y-4">
//             <div className="text-sm text-gray-600">
//               Showing {displayedCandidates.length} of {filteredCandidates.length} results
//             </div>
//             {displayedCandidates.length === 0 ? (
//               <div className="text-gray-500">No candidates found.</div>
//             ) : (
//               displayedCandidates.map((candidate) => (
//                 <div key={candidate.id} className="bg-gray-50 p-4 rounded border">
//                   <div className="flex justify-between">
//                     <div>
//                       <h3 className="text-lg font-semibold">{candidate.name}</h3>
//                       <p className="text-blue-600">{candidate.designation}</p>
//                       <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
//                         <span className="flex items-center"><FaBriefcase className="mr-2" /> {candidate.experience} yrs</span>
//                         <span className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {candidate.location}</span>
//                         <span className="flex items-center"><FaBuilding className="mr-2" /> {candidate.company}</span>
//                         <span className="flex items-center"><FaGraduationCap className="mr-2" /> {candidate.education}</span>
//                       </div>
//                       <div className="flex flex-wrap gap-2 mt-2 text-sm">
//                         {candidate.skills.slice(0, 6).map((skill, i) => (
//                           <span key={i} className="bg-gray-200 px-2 py-1 rounded">{skill}</span>
//                         ))}
//                         {candidate.skills.length > 6 && (
//                           <span className="text-xs border px-2 py-1 rounded">
//                             +{candidate.skills.length - 6} more
//                           </span>
//                         )}
//                       </div>
//                       <p className="mt-2 text-sm">{candidate.summary}</p>
//                       <p className="text-xs text-gray-500 flex items-center mt-1">
//                         <FaClock className="mr-1" /> Last Active: {candidate.lastActive}
//                       </p>
//                     </div>
//                     <div className="flex flex-col space-y-2">
//                       <button className="px-3 py-1 border rounded text-sm">Save</button>
//                       <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">View Resume</button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}

//             {filteredCandidates.length > itemsPerPage && (
//               <div className="flex justify-center pt-4 space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   className="px-3 py-1 text-sm border rounded disabled:opacity-50"
//                   disabled={currentPage === 1}
//                 >
//                   Prev
//                 </button>
//                 {Array.from({ length: Math.ceil(filteredCandidates.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-3 py-1 text-sm border rounded ${currentPage === page ? 'bg-blue-600 text-white' : ''}`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setCurrentPage(Math.min(Math.ceil(filteredCandidates.length / itemsPerPage), currentPage + 1))}
//                   className="px-3 py-1 text-sm border rounded disabled:opacity-50"
//                   disabled={currentPage === Math.ceil(filteredCandidates.length / itemsPerPage)}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SourceResume;
