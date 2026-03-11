"use client";

import { useState } from 'react';

const AdvancedFilters = ({ 
  onFiltersChange, 
  categories, 
  priceRange, 
  onPriceRangeChange,
  sortBy,
  onSortChange,
  minRating,
  onRatingChange,
  isOpen,
  onToggle 
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handlePriceChange = (type, value) => {
    const newRange = { ...localPriceRange, [type]: parseInt(value) };
    setLocalPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg transition-all duration-300 ${
      isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
    }`}>
      <div className="p-6 space-y-6">
        {/* Sort Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Range</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Min Price</label>
                <input
                  type="number"
                  value={localPriceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="$0"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Max Price</label>
                <input
                  type="number"
                  value={localPriceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="$1000"
                />
              </div>
            </div>
            
            {/* Price Range Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1000"
                value={localPriceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Minimum Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={minRating === rating}
                  onChange={(e) => onRatingChange(parseInt(e.target.value))}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Price Filters */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Filters</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Under $50', range: { min: 0, max: 50 } },
              { label: '$50 - $100', range: { min: 50, max: 100 } },
              { label: '$100 - $200', range: { min: 100, max: 200 } },
              { label: 'Over $200', range: { min: 200, max: 1000 } }
            ].map((filter) => (
              <button
                key={filter.label}
                onClick={() => {
                  setLocalPriceRange(filter.range);
                  onPriceRangeChange(filter.range);
                }}
                className="px-4 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="pt-4 border-t dark:border-slate-600">
          <button
            onClick={() => {
              setLocalPriceRange({ min: 0, max: 1000 });
              onPriceRangeChange({ min: 0, max: 1000 });
              onRatingChange(0);
              onSortChange('featured');
            }}
            className="w-full py-3 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;