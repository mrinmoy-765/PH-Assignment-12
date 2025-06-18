import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // If there's only one page, don't render the pagination
  if (totalPages <= 1) {
    return null;
  }

  // A function to create the pagination array with ellipses
  const createPageNumbers = () => {
    const pageNumbers = [];
    const sidePages = 1; // how many pages to show on each side of currentPage
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const left = Math.max(2, currentPage - sidePages);
      const right = Math.min(totalPages - 1, currentPage + sidePages);

      pageNumbers.push(1);

      if (left > 2) {
        pageNumbers.push("...");
      }

      for (let i = left; i <= right; i++) {
        pageNumbers.push(i);
      }

      if (right < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = createPageNumbers();

  return (
    <div className="flex justify-center lg:justify-end md:justify-end lg:mr-12 md:mr-12 mt-8 mb-4 gap-1">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border text-sm rounded border-[#5C5470] hover:bg-[#5C5470] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        « Prev
      </button>

      {/* Page Number Buttons */}
      {pageNumbers.map((num, index) =>
        num === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-sm text-[#5C5470]"
          >
            ...
          </span>
        ) : (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 border text-sm rounded border-[#5C5470] ${
              num === currentPage
                ? "bg-[#352F44] text-white"
                : "hover:bg-[#5C5470] hover:text-white"
            }`}
          >
            {num}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border text-sm rounded border-[#5C5470] hover:bg-[#5C5470] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
