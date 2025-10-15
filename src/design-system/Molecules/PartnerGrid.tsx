import React from 'react';
import PartnerCard from './PartnerCard';
import { type Partner } from '../templates/home-page/utils';
import { Link } from 'react-router-dom';
import { Users2 } from 'lucide-react';
type PartnerGridProps = {
  partners: Partner[];
  onCompareToggle?: (partnerId: string) => void;
  onViewDetails?: (partnerId: string) => void;
  comparisonItems?: string[];
  className?: string;
  totalCount?: number;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  searchQuery?: string;
};

const PartnerGrid: React.FC<PartnerGridProps> = ({
  partners,
  onCompareToggle,
  onViewDetails,
  comparisonItems = [],
  className = "",
  totalCount,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  searchQuery
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {comparisonItems.length === 0 ? (
            searchQuery && searchQuery.trim() ? (
              totalCount && totalCount > 0 ? 
                `Showing ${partners.length} of ${totalCount} partners for "${searchQuery}"` : 
                `Showing ${partners.length} partners for "${searchQuery}"`
            ) : (
              totalCount && totalCount > 0 ? 
                `Showing ${partners.length} of ${totalCount} partners` : 
                `Showing ${partners.length} partners`
            )
          ) : null}
        </p>
        {comparisonItems.length > 0 && (
          <div className="flex items-center gap-3">
            <p className="text-gray-600">
              {`${comparisonItems.length} ${comparisonItems.length === 1 ? 'partner' : 'partners'} selected for comparison`}
            </p>
            <Link
              to="/compare"
              state={{ selectedIds: comparisonItems }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Compare Now
            </Link>
          </div>
        )}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onCompareToggle={onCompareToggle}
            onViewDetails={onViewDetails}
            isInComparison={comparisonItems.includes(partner.id)}
          />
        ))}
      </div>

      {/* Loading and Load More Section */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading more partners...</span>
        </div>
      )}

      {!isLoading && hasMore && onLoadMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Load More Partners
          </button>
        </div>
      )}

      {!isLoading && !hasMore && partners.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end of the list</p>
        </div>
      )}

      {comparisonItems.length > 0 && (
        <Link
          to="/compare"
          state={{ selectedIds: comparisonItems }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="flex items-start gap-3 px-5 py-4 bg-blue-600 text-white rounded-xl shadow-xl hover:bg-blue-700 transition-colors">
            <Users2 className="w-6 h-6 mt-0.5" />
            <div className="leading-tight">
              <div className="text-base">{`Compare ${comparisonItems.length} ${comparisonItems.length === 1 ? 'Partner' : 'Partners'}`}</div>
              <div className="text-sm">Click to view comparison</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PartnerGrid;
