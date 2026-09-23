import React from 'react';
import { Search, X, Sliders } from 'lucide-react';
import { ProductCategory } from '../types';

interface ProductFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  totalCount: number;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Essentials' },
  { id: 'edible-oils', label: 'Cold-Pressed Oils' },
  { id: 'pooja-oils', label: 'Ritual Pooja Oils' },
  { id: 'grains-millets', label: 'Organic Millets & Grains' },
  { id: 'kitchen-essentials', label: 'Kitchen Staples' }
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  totalCount
}) => {
  return (
    <div className="space-y-4">
      
      {/* Search and Secondary Filter Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sesame oil, deepam oil, foxtail millet..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Controls: In Stock & Sort */}
        <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
          
          {/* In Stock toggle */}
          <button
            type="button"
            onClick={onToggleInStock}
            className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              inStockOnly
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${inStockOnly ? 'bg-amber-600' : 'bg-stone-300'}`}
            />
            <span>In Stock Only</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5">
            <Sliders className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-none text-stone-800 text-xs font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured">Featured Selection</option>
              <option value="best-seller">Best Sellers First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Category Segmented Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product count notice */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
        <span>Showing <strong className="font-semibold text-stone-800">{totalCount}</strong> items</span>
        <span className="hidden sm:inline">100% Guaranteed Unadulterated & Lab Tested</span>
      </div>

    </div>
  );
};
