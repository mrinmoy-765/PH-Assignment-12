import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("truggered");
    onSearch(search.trim());
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-md mx-auto flex gap-2 items-center"
    >
      <input
        type="text"
        placeholder="Search by block, apartment #, or floor"
        className="input input-bordered w-full border-[#5C5470]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search apartments"
      />
      <button
        type="submit"
        className="btn bg-[#5C5470] flex gap-1 text-white work-sans"
        aria-label="Search"
      >
        <Search size={18} />
        <span className="hidden sm:inline ">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
