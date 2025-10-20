import React from 'react';

const Pagination = ({ current, total, onPageChange }) => {
  if (total <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (current > 1) {
      onPageChange(current - 1);
    }
  };

  const handleNext = () => {
    if (current < total) {
      onPageChange(current + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];
    const start = Math.max(1, current - delta);
    const end = Math.min(total, current + delta);

    // Always show first page
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Show pages around current
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Always show last page
    if (end < total) {
      if (end < total - 1) {
        pages.push('...');
      }
      pages.push(total);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={current <= 1}
      >
        ← Previous
      </button>

      <div className="pagination-pages">
        {visiblePages.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-page ${page === current ? 'active' : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={current >= total}
      >
        Next →
      </button>

      <div className="pagination-info">
        Page {current} of {total}
      </div>
    </div>
  );
};

export default Pagination;