'use client'

import ProductCard from "./ProductCard";
import Sidebar from './Sidebar';
import { useProductFilters } from '../hooks/useProductFilters';

export default function ProductCards() {
  const {
    filteredProducts,
    allCategories,
    allTags,
    filters,
    updateSearchTerm,
    updatePrice,
    updateCategory,
    updateTags,
    resetFilters
  } = useProductFilters();

  return (
    <div className="flex flex-row py-8">
      <Sidebar 
        allTags={allTags}
        tags={filters.tags}
        onTagsChange={updateTags}
        allCategories={allCategories} 
        category={filters.category}
        onCategoryChange={updateCategory} 
        onSearchChange={updateSearchTerm} 
        price={filters.price} 
        onPriceChange={updatePrice} 
        searchTerm={filters.searchTerm} 
      />
      
      {filteredProducts.length === 0 && (
        <div>
          <p>No products available with this search filter.</p>
          <button 
            onClick={resetFilters} 
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Remove all filters
          </button>
        </div>
      )}
      
      <div className='flex flex-wrap'>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{ ...product, brand: product.brand ?? '' }} 
          />
        ))}
      </div>
    </div>
  );
}  
