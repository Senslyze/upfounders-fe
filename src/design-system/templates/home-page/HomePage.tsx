"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Mail, MessageCircle, Megaphone, Instagram } from 'lucide-react';
import SearchBar, { type FilterOptions } from '../../Molecules/SearchBar';
import StatsCards from '../../Molecules/StatsCards';
import PartnerGrid from '../../Molecules/PartnerGrid';
import ConsultationDialog from '../../Molecules/ConsultationDialog';
import HomePageSkeleton from './HomePageSkeleton';
import { PRIORITY_COMPANIES } from './utils';
import type { Partner as UiPartner } from './utils';
import { useCompanies, useInfinitePartners } from '../../../hooks/useCompanies';


type HomePageProps = {
  onSearch?: (query: string) => void;
};

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    products: [],
    partnerTypes: [],
    pricingModels: [],
    regions: [],
    keyServices: []
  });
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);

  // Comparison selection state
  const [comparisonItems, setComparisonItems] = useState<string[]>(() => {
    const selectedIdsParam = searchParams.get('selectedIds');
    if (!selectedIdsParam) return [];
    return selectedIdsParam.split(',').filter(Boolean);
  });

  // Get all partners for stats
  const { partners: allPartners, loading: statsLoading } = useCompanies();
  
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

  // When navigated with a preselected partner via query (?selectedIds=...)
  useEffect(() => {
    const selectedIdsParam = searchParams.get('selectedIds');
    const targetId = selectedIdsParam ? selectedIdsParam.split(',').filter(Boolean)[0] : undefined;
    if (!targetId) return;

    const tryScroll = () => {
      const el = document.getElementById(`partner-${targetId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
      }
      return false;
    };

    // Try immediately, then a few retries to handle async rendering
    if (!tryScroll()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts += 1;
        if (tryScroll() || attempts > 20) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [searchParams]);

  const handleCompareToggle = useCallback((partnerId: string) => {
    setComparisonItems((prev) => {
      const isSelected = prev.includes(partnerId);
      if (isSelected) {
        return prev.filter((id) => id !== partnerId);
      }
      // Cap selection to maximum 3
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, partnerId];
    });
  }, []);

  // Clear the selectedIds in URL after using them once
  useEffect(() => {
    const selectedIdsParam = searchParams.get('selectedIds');
    if (selectedIdsParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('selectedIds');
      const next = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      router.replace(next);
    }
  }, [pathname, router, searchParams]);

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
    router.push(`/partner/${partnerId}`);
  }, [router]);

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

  // Show skeleton while initial data is loading
  if (statsLoading && allPartners.length === 0) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Decorative Background Icons - Hidden on mobile, reduced on tablet */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        {/* Top Left */}
        <div className="absolute top-20 left-4 sm:left-10">
          <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
        </div>
        <div className="absolute top-32 left-8 sm:left-16">
          <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
        </div>
        
        {/* Top Right */}
        <div className="absolute top-16 right-8 sm:right-20">
          <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-green-400" />
        </div>
        <div className="absolute top-28 right-16 sm:right-32">
          <MessageCircle className="w-3 h-3 sm:w-5 sm:h-5 text-green-300" />
        </div>
        <div className="absolute top-40 right-8 sm:right-16">
          <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
        </div>
        
        {/* Mid Left */}
        <div className="absolute top-1/2 left-6 sm:left-12">
          <Instagram className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
        </div>
        <div className="absolute top-1/2 left-12 sm:left-24">
          <Instagram className="w-4 h-4 sm:w-6 sm:h-6 text-purple-300" />
        </div>
        
        {/* Center */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          <Megaphone className="w-5 h-5 sm:w-7 sm:h-7 text-green-300" />
        </div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 translate-y-8">
          <MessageCircle className="w-3 h-3 sm:w-5 sm:h-5 text-blue-300" />
        </div>
        
        {/* Mid Right */}
        <div className="absolute top-2/3 right-12 sm:right-24">
          <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
        </div>
        
        {/* Bottom */}
        <div className="absolute bottom-20 left-1/4">
          <Instagram className="w-5 h-5 sm:w-7 sm:h-7 text-purple-400" />
        </div>
        <div className="absolute bottom-32 right-1/4">
          <Megaphone className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Find Your Perfect Partner
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-2">
              Discover, compare, and connect with Meta-approved Business Solution Providers. 
              Get expert consultancy to find the right partner for your business growth.
            </p>
          </div>
        </div>

        {/* Consultancy Banner */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 sm:p-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Need Help Finding the Right Partner?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
                Our Meta partnership experts can help you identify the perfect solution provider 
                for your business needs. Get personalized recommendations and strategic guidance.
              </p>
              <button
                onClick={() => setIsConsultationDialogOpen(true)}
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base w-full sm:w-auto"
              >
                <Mail size={18} className="mr-2" />
                Get Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar with Integrated Filters */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <SearchBar 
            onSearch={handleSearch}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            filters={filters}
          />
        </div>

        {/* Stats Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <StatsCards partners={allPartners} />
        </div>

        {/* Partners Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
          <PartnerGrid 
            partners={partners as unknown as UiPartner[]}
            onCompareToggle={handleCompareToggle}
            onViewDetails={handleViewDetails}
            comparisonItems={comparisonItems}
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
