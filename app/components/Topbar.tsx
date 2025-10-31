"use client";
import { useState } from "react";
export default function Topbar({
  onSearch,
}: {
  onSearch: (symbol: string) => void;
}) {
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim().toUpperCase) return;
    onSearch(query.trim().toUpperCase());
    setQuery("");
  };
  return (
    <div className=" flex items-center justify-beween mb-6">
      <form
        id="getStock"
        className="flex items-center gap-3 "
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search Stock (e.g - TCS, RELIANCE)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border border-gray-700 rounded px-3 py-2 text-sm text-white foucs:outline-none foucs:border-gray-500 w-4xl"
        />
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
}
