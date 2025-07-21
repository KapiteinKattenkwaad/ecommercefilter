'use client'

import ProductCard from "./ProductCard";
import Sidebar from './Sidebar';
import { useProductFilters } from '../hooks/useProductFilters';
import { motion } from "motion/react"

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col md:flex-row py-8">
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
      
      <div className='flex-1'>
        <motion.div 
          className="flex flex-wrap"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard 
                product={{ ...product, brand: product.brand ?? '' }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}  
