import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageCircle, Megaphone, Instagram } from 'lucide-react';
import SearchBar, { type FilterOptions } from '../../Molecules/SearchBar';
import StatsCards from '../../Molecules/StatsCards';
import PartnerGrid from '../../Molecules/PartnerGrid';
import ConsultationDialog from '../../Molecules/ConsultationDialog';
import { PRIORITY_COMPANIES } from './utils';
import { useCompanies, useInfinitePartners } from '../../../hooks/useCompanies';


type HomePageProps = {
  onSearch?: (query: string) => void;
};

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    products: [],
    partnerTypes: [],
    pricingModels: [],
    regions: [],
    keyServices: []
  });
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);

  // Get all partners for stats
  const { partners: allPartners } = useCompanies();
  
  // Use the infinite scroll partners hook with priority companies
  const { 
    partners, 
    loading: isLoading, 
    hasMore, 
    totalCount, 
    loadMore 
  } = useInfinitePartners(
    searchQuery,
    filters,
    PRIORITY_COMPANIES
  );



  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  }, [onSearch]);

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    const emptyFilters: FilterOptions = {
      products: [],
      partnerTypes: [],
      pricingModels: [],
      regions: [],
      keyServices: []
    };
    setFilters(emptyFilters);
  }, []);

  const handleViewDetails = useCallback((partnerId: string) => {
    // Navigate to partner detail page using the company ID
    navigate(`/partner/${partnerId}`);
  }, [navigate]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Decorative Background Icons */}
      <div className="absolute inset-0 opacity-5">
        {/* Top Left */}
        <div className="absolute top-20 left-10">
          <Megaphone className="w-8 h-8 text-green-400" />
        </div>
        <div className="absolute top-32 left-16">
          <MessageCircle className="w-6 h-6 text-blue-400" />
        </div>
        
        {/* Top Right */}
        <div className="absolute top-16 right-20">
          <MessageCircle className="w-7 h-7 text-green-400" />
        </div>
        <div className="absolute top-28 right-32">
          <MessageCircle className="w-5 h-5 text-green-300" />
        </div>
        <div className="absolute top-40 right-16">
          <MessageCircle className="w-6 h-6 text-green-400" />
        </div>
        
        {/* Mid Left */}
        <div className="absolute top-1/2 left-12">
          <Instagram className="w-8 h-8 text-purple-400" />
        </div>
        <div className="absolute top-1/2 left-24">
          <Instagram className="w-6 h-6 text-purple-300" />
        </div>
        
        {/* Center */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          <Megaphone className="w-7 h-7 text-green-300" />
        </div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 translate-y-8">
          <MessageCircle className="w-5 h-5 text-blue-300" />
        </div>
        
        {/* Mid Right */}
        <div className="absolute top-2/3 right-24">
          <MessageCircle className="w-6 h-6 text-blue-400" />
        </div>
        
        {/* Bottom */}
        <div className="absolute bottom-20 left-1/4">
          <Instagram className="w-7 h-7 text-purple-400" />
        </div>
        <div className="absolute bottom-32 right-1/4">
          <Megaphone className="w-6 h-6 text-green-400" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect Partner
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover, compare, and connect with Meta-approved Business Solution Providers. 
              Get expert consultancy to find the right partner for your business growth.
            </p>
          </div>
        </div>

        {/* Consultancy Banner */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Need Help Finding the Right Partner?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-4">
                Our Meta partnership experts can help you identify the perfect solution provider 
                for your business needs. Get personalized recommendations and strategic guidance.
              </p>
              <button
                onClick={() => setIsConsultationDialogOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Mail size={20} className="mr-2" />
                Get Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar with Integrated Filters */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <SearchBar 
            onSearch={handleSearch}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            filters={filters}
          />
        </div>

        {/* Stats Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <StatsCards partners={allPartners} />
        </div>

        {/* Partners Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <PartnerGrid 
            partners={partners}
            onCompareToggle={(partnerId) => console.log('Compare toggle:', partnerId)}
            onViewDetails={handleViewDetails}
            totalCount={totalCount}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* Consultation Dialog */}
      <ConsultationDialog 
        isOpen={isConsultationDialogOpen} 
        onClose={() => setIsConsultationDialogOpen(false)} 
      />
    </div>
  );
};

export default HomePage;
