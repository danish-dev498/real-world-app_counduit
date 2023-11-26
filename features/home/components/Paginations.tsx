import React from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import usePagination from '../hooks/usePagination';
import { Button } from '@/components/ui/button';

const Pagination = ({
  totalPages,
  currentPage,
  nextPage,
  prevPage,
  goToPage,
}) => {
  console.log('current page over here', totalPages);

  if (totalPages.length === 1 || totalPages.length === 0) return;

  return (
    <div className='flex flex-wrap mt-8 gap-y-1'>
      <Button
        variant='other'
        size='pg'
        className='border-l rounded-l-sm'
        onClick={prevPage}
      >
        <FiChevronLeft className='' size={18} />
      </Button>
      {totalPages.map((value, index) => (
        <Button
          variant='other'
          size='pg'
          className=''
          key={index}
          onClick={() => goToPage(value)}
        >
          {value}
        </Button>
      ))}

      <Button
        variant='other'
        size='pg'
        className='rounded-r'
        onClick={nextPage}
      >
        <FiChevronRight className='rounded-r-sm' size={18} />
      </Button>
    </div>
  );
};

export default Pagination;
