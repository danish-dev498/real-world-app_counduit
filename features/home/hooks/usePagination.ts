import React, { useState } from 'react';

const usePagination = (articlePerPage, articleCount) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil(articleCount / articlePerPage);
  console.log(totalPage);

  const totalPages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const nextPage = () => {
    if (currentPage < totalPage) {
      console.log('how');
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  return {
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    goToPage,
  };
};

export default usePagination;
