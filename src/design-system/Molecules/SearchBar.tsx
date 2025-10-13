import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Input } from '@/design-system/Atoms/input';
import { Button } from '@/design-system/Atoms/button';

export interface FilterOptions {
  products: string[];
  partnerTypes: string[];
  pricingModels: string[];
  regions: string[];
  keyServices: string[];
}

type SearchBarProps = {
  onSearch?: (query: string) => void;
  onFiltersChange?: (filters: FilterOptions) => void;
  onClearFilters?: () => void;
  placeholder?: string;
  className?: string;
  showFilters?: boolean;
  filters?: FilterOptions;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFiltersChange,
  onClearFilters,
  placeholder = "Search providers by name, features, or keywords...",
  className = "",
  showFilters = true,
  filters = {
    products: [],
    partnerTypes: [],
    pricingModels: [],
    regions: [],
    keyServices: []
  }
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Real-time search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch?.(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch?.('');
  };

  const handleFiltersClick = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const handleCheckboxChange = (category: keyof FilterOptions, value: string, checked: boolean) => {
    const currentValues = filters[category] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value);
    
    onFiltersChange?.({
      ...filters,
      [category]: newValues
    });
  };

  const handleRemoveFilter = (category: keyof FilterOptions, value: string) => {
    const newFilters = {
      ...filters,
      [category]: filters[category].filter(item => item !== value)
    };
    onFiltersChange?.(newFilters);
  };

  // Get all applied filters for display
  const getAppliedFilters = () => {
    const applied: Array<{ category: keyof FilterOptions; value: string; label: string }> = [];
    
    Object.entries(filters).forEach(([category, values]) => {
      values.forEach((value: string) => {
        applied.push({
          category: category as keyof FilterOptions,
          value,
          label: value
        });
      });
    });
    
    return applied;
  };

  const appliedFilters = getAppliedFilters();

  const FilterSection = ({ title, category, options }: {
    title: string;
    category: keyof FilterOptions;
    options: string[];
  }) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[category]?.includes(option) || false}
              onChange={(e) => handleCheckboxChange(category, option, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-10 pr-10 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters Button and Applied Filters */}
          {showFilters && (
            <div className="space-y-4">
              {/* Filters Button and Clear All Button - Same Line */}
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFiltersClick}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilterPanel ? 'rotate-180' : ''}`} />
                </Button>
                
                {/* Clear all filters button */}
                {appliedFilters.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-xs border-none shadow-none text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
              
              {/* Applied Filters - Next Line */}
              {appliedFilters.length > 0 && (
                <div className="flex items-center space-x-3">
                  <div className="flex flex-wrap gap-2">
                    {appliedFilters.map((filter, index) => (
                      <div
                        key={`${filter.category}-${filter.value}-${index}`}
                        className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{filter.label}</span>
                        <button
                          onClick={() => handleRemoveFilter(filter.category, filter.value)}
                          className="hover:bg-blue-100 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && showFilters && (
        <div className="border-t border-gray-200 p-6 m-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          {/* Filter Content */}
          <div className="space-y-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Products */}
              <FilterSection
                title="Products"
                category="products"
                options={['WhatsApp', 'Instagram', 'Messenger', 'Ads Manager']}
              />

              {/* partnerTypes */}
              <FilterSection
                title="Partner Type"
                category="partnerTypes"
                options={['Solution Partner', 'Technical Provider', 'Technical Partner']}
              />

              {/* Service Models (Pricing) */}
              <FilterSection
                title="Service Models"
                category="pricingModels"
                options={['SAAS', 'MANAGED', 'PROJECT_BASED', 'HOURLY']}
              />

              {/* Regions */}
              <FilterSection
                title="Regions"
                category="regions"
                options={[
                  'North America',
                  'Europe',
                  'Asia Pacific',
                  'Latin America',
                  'Middle East & Africa',
                  'Global'
                ]}
              />

              {/* Key Services */}
              <FilterSection
                title="Key Services"
                category="keyServices"
                options={[
                  'Onboarding Support',
                  'Automation Tools',
                  'CRM Integrations',
                  'Customer Service',
                  'Shared Inbox',
                  'Chatbot Builder',
                  'Embedded Sign-up',
                  'Cloud Contact Centre',
                  'Direct Meta Compliance',
                  'Early Feature Access'
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
