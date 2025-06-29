import React from "react";

const locationOptions = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Chennai",
  "Hyderabad",
];
const skillOptions = ["React", "Node.js", "Python", "AWS", "MongoDB"];
const educationOptions = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "BCA", "MCA"];
const collegeOptions = ["IIT Bombay", "NIT Trichy", "SRM University"];

const FilterPanel = ({ filters, onFilterChange, onSearch, onClearAll }) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border">
      <div>
        <h2 className="text-lg font-bold mb-2">Filter Candidates</h2>
        <input
          type="text"
          placeholder="Search by name, skills, keywords, or company..."
          value={filters.searchText}
          onChange={(e) => onFilterChange("searchText", e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>

      <div>
        <label className="font-medium">Location</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {locationOptions.map((loc) => (
            <label key={loc} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.locations.includes(loc)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filters.locations, loc]
                    : filters.locations.filter((l) => l !== loc);
                  onFilterChange("locations", updated);
                }}
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="font-medium">Min Experience</label>
          <input
            type="number"
            value={filters.minExperience}
            onChange={(e) => onFilterChange("minExperience", e.target.value)}
            className="w-full px-3 py-2 border rounded-md mt-1"
          />
        </div>
        <div className="w-1/2">
          <label className="font-medium">Max Experience</label>
          <input
            type="number"
            value={filters.maxExperience}
            onChange={(e) => onFilterChange("maxExperience", e.target.value)}
            className="w-full px-3 py-2 border rounded-md mt-1"
          />
        </div>
      </div>

      <div>
        <label className="font-medium">Skills</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {skillOptions.map((skill) => (
            <label key={skill} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.skills.includes(skill)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filters.skills, skill]
                    : filters.skills.filter((s) => s !== skill);
                  onFilterChange("skills", updated);
                }}
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="font-medium">Education</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {educationOptions.map((edu) => (
            <label key={edu} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.education.includes(edu)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filters.education, edu]
                    : filters.education.filter((e1) => e1 !== edu);
                  onFilterChange("education", updated);
                }}
              />
              <span>{edu}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="font-medium">Colleges</label>
        <input
          type="text"
          placeholder="Type college name..."
          onChange={(e) => {
            const val = e.target.value;
            if (
              val &&
              collegeOptions.some((c) =>
                c.toLowerCase().includes(val.toLowerCase())
              ) &&
              !filters.colleges.includes(val)
            ) {
              onFilterChange("colleges", [...filters.colleges, val]);
            }
          }}
          className="w-full px-3 py-2 border rounded-md mt-2"
        />
        <div className="flex flex-wrap mt-2 gap-2">
          {filters.colleges.map((college) => (
            <span
              key={college}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
            >
              {college}
              <button
                className="ml-1 text-red-500"
                onClick={() =>
                  onFilterChange(
                    "colleges",
                    filters.colleges.filter((c) => c !== college)
                  )
                }
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="font-medium">Company</label>
        <input
          type="text"
          value={filters.company}
          onChange={(e) => onFilterChange("company", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="font-medium">Designation</label>
        <input
          type="text"
          value={filters.designation}
          onChange={(e) => onFilterChange("designation", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="font-medium">Notice Period</label>
        <select
          value={filters.noticePeriod}
          onChange={(e) => onFilterChange("noticePeriod", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Any</option>
          <option value="Immediate">Immediate</option>
          <option value="15 days">15 days</option>
          <option value="30 days">30 days</option>
          <option value="60 days">60 days</option>
          <option value="90 days">90 days</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔍 Search
        </button>
        <button
          onClick={onClearAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          ❌ Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
