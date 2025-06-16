import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];

  // Always show first 2 pages
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1, 2);

    if (currentPage > 4) {
      pageNumbers.push("...");
    }

    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pageNumbers.includes(i)) pageNumbers.push(i);
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages - 1, totalPages);
  }

  return (
    <div className="flex justify-center lg:justify-end md:justify-end lg:mr-12 md:mr-12 mt-8 mb-4 gap-1">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border text-sm rounded border-[#5C5470] hover:bg-[#5C5470] hover:text-white disabled:opacity-50"
      >
        « Prev
      </button>

      {pageNumbers.map((num, index) =>
        num === "..." ? (
          <span key={index} className="px-3 py-1 text-sm text-[#5C5470]">
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

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border text-sm rounded border-[#5C5470] hover:bg-[#5C5470] hover:text-white disabled:opacity-50"
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
