'use client';


import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showInfo?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  showInfo = true,
}: PaginationProps) {

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {

      pages.push(1);

      if (currentPage <= 3) {

        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {

        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {

        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = totalItems ? (currentPage - 1) * (itemsPerPage || 10) + 1 : 0;
  const endItem = totalItems
    ? Math.min(currentPage * (itemsPerPage || 10), totalItems)
    : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-800">
      {showInfo && totalItems && itemsPerPage && (
        <div className="text-sm text-gray-400">
          Menampilkan <span className="font-bold text-white">{startItem}</span> -{' '}
          <span className="font-bold text-white">{endItem}</span> dari{' '}
          <span className="font-bold text-white">{totalItems}</span> data
        </div>
      )}


      <div className="flex items-center gap-2">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === 1
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-[#1C252E] border border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600'
            }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>


        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-500 text-sm"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                  ? 'bg-[#137FEC] text-white shadow-lg shadow-blue-500/20'
                  : 'bg-[#1C252E] border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white'
                  }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === totalPages
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-[#1C252E] border border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600'
            }`}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

