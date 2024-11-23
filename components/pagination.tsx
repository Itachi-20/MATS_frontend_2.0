import React from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 7; // Max visible pages excluding first and last
    const start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-4 py-2 text-sm border rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* First Page */}
      <button
        onClick={() => handlePageChange(1)}
        className={`px-3 py-2 text-sm border rounded-md ${
          currentPage === 1
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 hover:bg-blue-100"
        }`}
      >
        1
      </button>

      {/* Dots before visible pages */}
      {visiblePages[0] > 2 && <span className="px-3 py-2 text-sm">...</span>}

      {/* Visible Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 text-sm border rounded-md ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Dots after visible pages */}
      {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
        <span className="px-3 py-2 text-sm">...</span>
      )}

      {/* Last Page */}
      {totalPages > 1 && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-2 text-sm border rounded-md ${
            currentPage === totalPages
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-4 py-2 text-sm border rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
