"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function Topbar({
  onSearch,
}: {
  onSearch: (symbol: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim().toUpperCase());
    setQuery("");
  };

  return (
    <div className="w-full flex items-center justify-between mb-6">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3 w-full max-w-xl"
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />

          <Input
            type="text"
            placeholder="Search stock (e.g. TCS, RELIANCE)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9 text-sm bg-white dark:bg-[#111418] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Button type="submit" className="gap-2 px-4">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </form>
    </div>
  );
}
