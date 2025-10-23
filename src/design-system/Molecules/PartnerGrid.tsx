import React from 'react';
import PartnerCard from './PartnerCard';
import { type Partner } from '../templates/home-page/utils';
import Link from 'next/link';
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
  const disableFurtherSelection = comparisonItems.length >= 3;
  const selectedCount = Math.min(comparisonItems.length, 3);

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
              href="/compare"
              className={`px-4 py-2 rounded-lg transition-colors shadow-md ${comparisonItems.length < 2 || comparisonItems.length > 3 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              aria-disabled={comparisonItems.length < 2 || comparisonItems.length > 3}
              onClick={(e) => {
                if (comparisonItems.length < 2 || comparisonItems.length > 3) { e.preventDefault(); return; }
                try { sessionStorage.setItem('compare.selectedIds', JSON.stringify(comparisonItems)); } catch {}
              }}
            >
              Compare Now {comparisonItems.length < 2 ? '(min 2)' : comparisonItems.length > 3 ? '(max 3)' : ''}
            </Link>
          </div>
        )}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center md:justify-items-stretch">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onCompareToggle={onCompareToggle}
            onViewDetails={onViewDetails}
            isInComparison={comparisonItems.includes(partner.id)}
            disableCompare={disableFurtherSelection}
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
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-start gap-2">
          {/* Selection progress indicator */}
          <div aria-label="compare selection progress" className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`inline-block w-2.5 h-2.5 rounded-full shadow ${i < selectedCount ? 'bg-blue-600' : 'bg-blue-200'}`}
              />
            ))}
          </div>

          {/* Floating compare button */}
          <Link
            href="/compare"
            className={`${comparisonItems.length < 2 || comparisonItems.length > 3 ? 'pointer-events-none opacity-60' : ''}`}
            onClick={(e) => {
              if (comparisonItems.length < 2 || comparisonItems.length > 3) { e.preventDefault(); return; }
              try { sessionStorage.setItem('compare.selectedIds', JSON.stringify(comparisonItems)); } catch {}
            }}
          >
            <div className="flex items-start gap-3 px-5 py-4 bg-blue-600 text-white rounded-xl shadow-xl hover:bg-blue-700 transition-colors">
              <Users2 className="w-6 h-6 mt-0.5" />
              <div className="leading-tight">
                <div className="text-base">{`Compare ${comparisonItems.length} ${comparisonItems.length === 1 ? 'Partner' : 'Partners'}`}</div>
                <div className="text-sm">{comparisonItems.length < 2 ? 'Select at least 2' : comparisonItems.length > 3 ? 'Max 3 allowed' : 'Click to view comparison'}</div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PartnerGrid;
