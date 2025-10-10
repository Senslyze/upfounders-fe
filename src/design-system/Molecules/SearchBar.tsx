import React, { useState } from 'react';
import { z } from 'zod';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/design-system/Atoms/input';
import { Button } from '@/design-system/Atoms/button';

// Zod schemas
const SearchBarPropsSchema = z.object({
  onSearch: z.function().optional(),
  onFiltersClick: z.function().optional(),
  placeholder: z.string().optional().default("Search providers by name, features, or keywords..."),
  className: z.string().optional().default(""),
});

type SearchBarProps = {
  onSearch?: (query: string) => void;
  onFiltersClick?: () => void;
  placeholder?: string;
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFiltersClick,
  placeholder = "Search providers by name, features, or keywords...",
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Filters Button */}
        <div className="flex justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={onFiltersClick}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
