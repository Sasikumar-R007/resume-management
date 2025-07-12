import { Search } from "lucide-react";

export function SearchBar({ searchQuery, setSearchQuery, onSearch, className = "" }) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-base placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        onClick={onSearch}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
      >
        Search
      </button>
    </div>
  );
}
