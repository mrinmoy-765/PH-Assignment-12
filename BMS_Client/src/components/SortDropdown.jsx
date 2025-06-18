import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GoSortDesc, GoSortAsc } from "react-icons/go";

const SortDropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sort by Rent");

  const [searchParams] = useSearchParams();

  // Sync state when URL changes
  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort === "desc") {
      setSelected("Max to Min Rent");
    } else if (sort === "asc") {
      setSelected("Min to Max Rent");
    } else {
      setSelected("Sort by Rent");
    }
  }, [searchParams]);

  const handleSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-3">
      <label className="block mb-2 work-sans text-sm font-medium text-[#5C5470]">
        Quick Find
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#5C5470] text-white py-2 px-4 rounded-md flex justify-between items-center"
      >
        {selected}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-full bg-[#DBD8E3] mt-2 rounded-md shadow z-10">
          <div
            className="px-4 py-2 text-[#5C5470] flex items-center hover:bg-[#5C5470] hover:text-white cursor-pointer"
            onClick={() => handleSelect("desc")}
          >
            <GoSortDesc className="mr-2" /> Max to Min Rent
          </div>
          <div
            className="px-4 py-2 text-[#5C5470] flex items-center hover:bg-[#5C5470] hover:text-white cursor-pointer"
            onClick={() => handleSelect("asc")}
          >
            <GoSortAsc className="mr-2" /> Min to Max Rent
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;


