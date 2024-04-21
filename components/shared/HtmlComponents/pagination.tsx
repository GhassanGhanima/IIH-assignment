import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage:number
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <li key={1}>
          <button onClick={() => handleClick(1)}>1</button>
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <li key="ellipsis1">
            <span>...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <button onClick={() => handleClick(i)}>{i}</button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li key="ellipsis2">
            <span>...</span>
          </li>
        );
      }
      pageNumbers.push(
        <li key={totalPages}>
          <button onClick={() => handleClick(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul id="pagination">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

export default Pagination;
