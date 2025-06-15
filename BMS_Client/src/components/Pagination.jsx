import React from "react";

const MAX_PAGE_LINKS = 5;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  let pageNumbers = [];

  if (totalPages <= MAX_PAGE_LINKS) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const minPage = Math.max(1, currentPage - 2);
    const maxPage = Math.min(totalPages, minPage + MAX_PAGE_LINKS - 1);
    pageNumbers = Array.from(
      { length: maxPage - minPage + 1 },
      (_, i) => minPage + i
    );
  }

  return (
    <div className="join flex justify-center mt-8">
      <button
        className="join-item btn btn-sm btn-outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        « Prev
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`join-item btn btn-sm btn-outline ${num === currentPage ? "btn-active bg-primary text-white" : ""}`}
          aria-current={num === currentPage ? "page" : undefined}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="join-item btn btn-sm btn-outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
