// Ensuring that the sort selector cleanly manages its own presentation
import React from 'react';

interface SortSelectorProps {
  setSortOption: (option: 'name' | 'averageRating') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ setSortOption, setSortOrder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split(':');
    setSortOption(field as 'name' | 'averageRating');
    setSortOrder(order as 'asc' | 'desc');
  };

  return (
    <select onChange={handleChange}
            className="w-[14rem] text-gray-700 pl-2 pb-[0.15rem] bg-gray-300 border-2 border-gray-400 text-center rounded-full">
      
      <option value="name:asc">Name Descending</option>
      <option value="name:desc">Name Ascending</option>
      <option value="averageRating:asc">Rating Descending</option>
      <option value="averageRating:desc">Rating Ascending</option>
    </select>
  );
};

export default SortSelector;
