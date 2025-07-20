'use client'

import productsJson from '../../public/products.json'
import { useState } from 'react';

import ProductCard from "./ProductCard";
import Sidebar from './Sidebar';

export default function ProductCards() {

    const products = productsJson.products

    const allCategories = [...new Set(products.map(product => product.category))];
    const allTags = [
        ...new Set(
          products.flatMap(product => product.tags)
        )
      ];

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [price, setPrice] = useState<{ min: string; max: string }>({ min: '', max: '' })
    const [category, setCategory] = useState<string[]>(allCategories)
    const [tags, setTags] = useState<string[]>(allTags)

    const filteredData = products.filter((product) => {
        const min = price.min ? parseFloat(price.min) : 0;
        const max = price.max ? parseFloat(price.max) : Infinity;

        return (
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.price >= min &&
            product.price <= max && category.includes(product.category) &&
            product.tags.some(tag => tags.includes(tag))
        );
    });

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    // Handler for category select (single select)
    const handleCategoryChange = (category: string) => {
        setCategory([category]);
    };

    // Handler for tag checkboxes (multi-select)
    const handleTagChange = (tag: string, checked: boolean) => {
        setTags(prev =>
            checked ? [...prev, tag] : prev.filter(t => t !== tag)
        );
    };

    const resetFilter = () => {
        setSearchTerm('')
        setCategory(allCategories)
        setTags(allTags)
    }

    return (
        <div className="flex flex-row my-8 gap-8">
            <Sidebar 
            allTags={allTags}
            tags={tags}
            setTags={handleTagChange}
            allCategories={allCategories} 
            category={category}
            setCategory={handleCategoryChange} 
            handleSearch={handleSearch} 
            price={price} setPrice={setPrice} 
            searchTerm={searchTerm} 
            />
            {filteredData.length === 0 && (
                <div>
                    <p>

                        No products available with this search filter.
                    </p>

                    <button onClick={resetFilter} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Remove all filters
                    </button>
                </div>
            )}
            <div className='grid grid-cols-4'>
                {filteredData && filteredData.map((product) => (
                    <ProductCard key={product.id} product={{ ...product, brand: product.brand ?? '' }} />
                ))}
            </div>
        </div>
    );
}  
