'use client'

import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Checkbox } from './ui/Checkbox';

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  price: { min: string; max: string };
  onPriceChange: (price: { min: string; max: string }) => void;
  category: string[];
  onCategoryChange: (category: string) => void;
  allCategories: string[];
  tags: string[];
  onTagsChange: (tag: string, checked: boolean) => void;
  allTags: string[];
}

export default function Sidebar({
  searchTerm,
  onSearchChange,
  price,
  onPriceChange,
  category,
  onCategoryChange,
  allCategories,
  tags,
  onTagsChange,
  allTags,
}: SidebarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange({ ...price, min: e.target.value });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange({ ...price, max: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  const handleTagChange = (tag: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onTagsChange(tag, e.target.checked);
  };

  return (
    <aside className="flex min-w-sm flex-col p-6">
      <div className="mb-6">
        <Input
          label="Search Products"
          id="search"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
        <Input
          label="Min price"
          id="minprice"
          type="number"
          max="999"
          min="0"
          placeholder="Min price"
          value={price.min}
          onChange={handleMinPriceChange}
        />
        
        <Input
          label="Max price"
          id="maxprice"
          type="number"
          max="999"
          min="0"
          placeholder="Max price"
          value={price.max}
          onChange={handleMaxPriceChange}
        />
        
        <Select
          label="Category"
          id="categories"
          value={category[0]}
          onChange={handleCategoryChange}
          options={allCategories.map(cat => ({ value: cat, label: cat }))}
        />
        
        <details>
          <summary className="cursor-pointer mb-2">
            Tags:
          </summary>
          <div className="space-y-2">
            {allTags.map(tag => (
              <Checkbox
                key={tag}
                label={tag}
                id={tag}
                value={tag}
                checked={tags.includes(tag)}
                onChange={handleTagChange(tag)}
              />
            ))}
          </div>
        </details>
      </div>
    </aside>
  );
}  
