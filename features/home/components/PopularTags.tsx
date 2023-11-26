import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/navigation';
import React from 'react';

const PopularTags = ({ tag, handleBadge }) => {
  console.log('============check the render =========');
  return (
    <Badge
      className='text-white cursor-pointer dark:text-custom-gray dark:bg-zinc-100 bg-zinc-400'
      onClick={() => handleBadge(tag)}
    >
      {tag}
    </Badge>
  );
};

export default React.memo(PopularTags);
