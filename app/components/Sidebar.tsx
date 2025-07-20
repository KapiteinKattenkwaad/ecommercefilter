'use client'

interface SidebarProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  setPrice: (price: { min: string; max: string }) => void;
  price: { min: string; max: string };
  allCategories: string[];
  category: string[];
  setCategory: (category: string) => void;
  allTags: string[];
  tags: string[];
  setTags: (tag: string, checked: boolean) => void;
}

export default function Sidebar({
  setCategory,
  handleSearch,
  searchTerm,
  setPrice,
  price,
  allCategories,
  category,
  allTags,
  tags,
  setTags,
}: SidebarProps) {
  return (
    <aside className="flex flex-col w-96 bg-gray-50 p-6 border-r border-gray-200">
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
        <input
          id="search"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <label htmlFor="minprice" className="block text-sm font-medium text-gray-700 mb-2">Min price</label>
        <input
          id="minprice"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          type="number"
          max='999'
          min="0"
          placeholder="Min price"
          value={price.min}
          onChange={e => setPrice({ ...price, min: e.target.value })}
        />
        <label htmlFor="maxprice" className="block text-sm font-medium text-gray-700 mb-2">Max price</label>
        <input
          id="maxprice"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number"
          max='999'
          min="0"
          placeholder="Max price"
          value={price.max}
          onChange={e => setPrice({ ...price, max: e.target.value })}
        />
        <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          name="categories"
          id="categories"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          value={category[0]}
          onChange={e => setCategory(e.target.value)}
        >
          {allCategories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="space-y-2">
          {allTags.map(tag => (
            <div key={tag} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={tag}
                name={tag}
                value={tag}
                checked={tags.includes(tag)}
                onChange={e => setTags(tag, e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={tag} className="text-gray-700 text-sm cursor-pointer">
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}  
