// src/components/SortSelector.tsx

import React, { useState, useEffect } from 'react';
import type { Community } from '~/types/types'

interface SortSelectorProps {
  communities: Community[] | undefined;
  setSortedCommunities: (communities: Community[]) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ communities, setSortedCommunities }) => {
  const [sortOption, setSortOption] = useState<'name' | 'averageRating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (!communities) return;

    const sorted = [...communities].sort((a, b) => {
      const sortValA = sortOption === 'averageRating' ? parseFloat(a.averageRating as string) ?? 0 : a.name ?? '';
      const sortValB = sortOption === 'averageRating' ? parseFloat(b.averageRating as string) ?? 0 : b.name ?? '';
      return sortOrder === 'asc' ? (sortValA < sortValB ? -1 : 1) : (sortValA > sortValB ? -1 : 1);
    });

    setSortedCommunities(sorted);
  }, [sortOption, sortOrder, communities]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split(':');
    setSortOption(field as 'name' | 'averageRating');
    setSortOrder(order as 'asc' | 'desc');
  };

  return (
    <select onChange={handleChange}
            className="w-[14rem] text-gray-700 pl-2 pb-[0.15rem] bg-gray-300 border-2 border-gray-400 text-center rounded-full">
      <option value="name:asc">Name Ascending</option>
      <option value="name:desc">Name Descending</option>
      <option value="averageRating:asc">Rating Ascending</option>
      <option value="averageRating:desc">Rating Descending</option>
    </select>
  );
};

export default SortSelector;
