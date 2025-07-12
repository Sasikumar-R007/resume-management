import { useState } from "react";
import { X } from "lucide-react";

const LOCATION_OPTIONS = [
  "New York, NY",
  "San Francisco, CA", 
  "Los Angeles, CA",
  "Chicago, IL",
  "Boston, MA",
  "Seattle, WA",
  "Austin, TX",
  "Denver, CO",
  "Remote",
];

const SKILL_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "PHP", "Ruby", "Go", "Rust", "AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST API",
];

const EDUCATION_OPTIONS = [
  "High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD", "Bootcamp", "Self-taught",
];

export function FilterPanel({ filters, setFilters }) {
  const handleLocationChange = (location, checked) => {
    const newLocations = checked
      ? [...filters.location, location]
      : filters.location.filter((l) => l !== location);

    setFilters({
      ...filters,
      location: newLocations,
    });
  };

  const handleExperienceChange = (value, index) => {
    const newExperience = [...filters.experience];
    newExperience[index] = parseInt(value);
    setFilters({
      ...filters,
      experience: newExperience,
    });
  };

  const handleSkillAdd = (skill) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters({
        ...filters,
        skills: [...filters.skills, skill],
      });
    }
  };

  const handleSkillRemove = (skill) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((s) => s !== skill),
    });
  };

  const clearAllFilters = () => {
    setFilters({
      location: [],
      experience: [0, 15],
      skills: [],
      education: "",
      company: "",
    });
  };

  return (
    <div className="p-4">
      <button onClick={clearAllFilters} className="mb-4 rounded-md bg-purple-500 px-4 py-2 text-white">
        Clear All
      </button>
      {/* Location Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        {LOCATION_OPTIONS.map((location) => (
          <div key={location} className="flex items-center">
            <input
              type="checkbox"
              checked={filters.location.includes(location)}
              onChange={(e) => handleLocationChange(location, e.target.checked)}
              className="h-4 w-4 rounded border-purple-500 text-purple-500 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-600">{location}</span>
          </div>
        ))}
      </div>
      {/* Experience Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Experience: {filters.experience[0]} - {filters.experience[1]} years
        </label>
        <input
          type="range"
          min="0"
          max="15"
          value={filters.experience[0]}
          onChange={(e) => handleExperienceChange(e.target.value, 0)}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <input
          type="range"
          min="0"
          max="15"
          value={filters.experience[1]}
          onChange={(e) => handleExperienceChange(e.target.value, 1)}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      {/* Skills Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          placeholder="Add a skill..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.target.value) {
                handleSkillAdd(e.target.value);
                e.target.value = "";
              }
            }
          }}
          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        />
        <div className="mt-2">
          {filters.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-sm text-purple-800">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="ml-1 rounded-full bg-purple-200 px-1 text-xs text-purple-800 hover:bg-purple-300"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Education Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Education</label>
        <select
          value={filters.education}
          onChange={(e) => setFilters({ ...filters, education: e.target.value })}
          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <option value="">Select education level...</option>
          {EDUCATION_OPTIONS.map((education) => (
            <option key={education} value={education}>
              {education}
            </option>
          ))}
        </select>
      </div>
      {/* Current Company Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Current Company</label>
        <input
          type="text"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}
