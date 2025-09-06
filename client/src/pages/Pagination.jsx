import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="mt-10 flex gap-4 items-center">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className={`${
          page === 1 ? "bg-gray-400" : "bg-red-500"
        } text-white px-4 py-2 rounded-md cursor-pointer`}
      >
        Prev
      </button>

      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className={`${
          page === totalPages ? "bg-gray-400" : "bg-red-500"
        } text-white px-4 py-2 rounded-md cursor-pointer`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
