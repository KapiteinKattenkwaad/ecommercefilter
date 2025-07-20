import { useState, useMemo } from 'react';
import productsJson from '../../public/products.json';

interface FilterState {
  searchTerm: string;
  price: { min: string; max: string };
  category: string[];
  tags: string[];
}

interface UseProductFiltersReturn {
  products: typeof productsJson.products;
  filteredProducts: typeof productsJson.products;
  allCategories: string[];
  allTags: string[];
  filters: FilterState;
  updateSearchTerm: (term: string) => void;
  updatePrice: (price: { min: string; max: string }) => void;
  updateCategory: (category: string) => void;
  updateTags: (tag: string, checked: boolean) => void;
  resetFilters: () => void;
}

export function useProductFilters(): UseProductFiltersReturn {
  const products = productsJson.products;

  const allCategories = useMemo(() => 
    [...new Set(products.map(product => product.category))], 
    [products]
  );

  const allTags = useMemo(() => 
    [...new Set(products.flatMap(product => product.tags))], 
    [products]
  );

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    price: { min: '', max: '' },
    category: allCategories,
    tags: []
  });

  const filteredProducts = useMemo(() => {
    const min = filters.price.min ? parseFloat(filters.price.min) : 0;
    const max = filters.price.max ? parseFloat(filters.price.max) : 999;

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesPrice = product.price >= min && product.price <= max;
      const matchesCategory = filters.category.includes(product.category);
      const matchesTags = filters.tags.length === 0 || 
        product.tags.some(tag => filters.tags.includes(tag));

      return matchesSearch && matchesPrice && matchesCategory && matchesTags;
    });
  }, [products, filters]);

  const updateSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  };

  const updatePrice = (price: { min: string; max: string }) => {
    setFilters(prev => ({ ...prev, price }));
  };

  const updateCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category: [category] }));
  };

  const updateTags = (tag: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      tags: checked 
        ? [...prev.tags, tag] 
        : prev.tags.filter(t => t !== tag)
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      price: { min: '', max: '' },
      category: allCategories,
      tags: []
    });
  };

  return {
    products,
    filteredProducts,
    allCategories,
    allTags,
    filters,
    updateSearchTerm,
    updatePrice,
    updateCategory,
    updateTags,
    resetFilters
  };
} 