import React from 'react';
import { Mail, Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '../../Atoms/input';
import { Button } from '../../Atoms/button';
import StatsCardsSkeleton from '../../Molecules/StatsCardsSkeleton';
import PartnerGridSkeleton from '../../Molecules/PartnerGridSkeleton';

const HomePageSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div className="relative z-10">
        {/* Hero Section - Static */}
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

        {/* Consultancy Banner - Static */}
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
                disabled
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg opacity-80 cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
              >
                <Mail size={18} className="mr-2" />
                Get Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar - Static Shell using real components */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search providers by name"
                    disabled
                    className="pl-10 pr-10 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 opacity-60 cursor-not-allowed"
                  />
                </div>

                {/* Filters Button */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      disabled
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50 opacity-60 cursor-not-allowed"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Only values are skeleton */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <StatsCardsSkeleton />
        </div>

        {/* Partners Grid - Only this section is skeleton */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
          <PartnerGridSkeleton />
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
