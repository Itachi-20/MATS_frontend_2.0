import React from "react";
import { useRouter } from "next/navigation";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ ...Props}:PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (page:Number) => {
    router.push(`?page=${page}`);
  };

  const pageNumbers = Array.from({ length: Props.totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => Props.currentPage > 1 && handlePageChange(Props.currentPage - 1 )}
        className={`px-8 py-2 text-sm border rounded-md ${
          Props.currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100"
        }`}
        disabled={Props.currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 text-sm border rounded-md ${
            Props.currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() =>
          Props.currentPage < Props.totalPages && handlePageChange(Props.currentPage + 1)
        }
        className={`px-8 py-2 text-sm border rounded-md ${
          Props.currentPage === Props.totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-100"
        }`}
        disabled={Props.currentPage === Props.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
