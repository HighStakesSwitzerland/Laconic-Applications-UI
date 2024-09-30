import React, { Dispatch, SetStateAction } from 'react';

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: Dispatch<SetStateAction<number>> }> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 5) {
      return [...Array(total).keys()].map(n => n + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, '...', total];
    }
    if (current >= total - 2) {
      return [1, '...', total - 3, total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 mx-1 bg-white text-blue-500 rounded-md"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 mx-1 ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          } rounded-md ${typeof page !== 'number' ? 'cursor-default' : ''}`}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 bg-white text-blue-500 rounded-md"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;