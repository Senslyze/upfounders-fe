import React from 'react';
import Skeleton from '../Atoms/skeleton';

const PartnerCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
      {/* Logo and title skeleton */}
      <div className="flex items-start mb-4">
        <Skeleton className="w-16 h-16 rounded-lg mr-4 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      
      {/* Description skeleton */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      
      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>
      
      {/* Action buttons skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
};

const PartnerGridSkeleton: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results count skeleton - "Showing x of y partners" */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          <Skeleton className="h-5 w-64 inline-block" />
        </p>
      </div>

      {/* Partners Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center md:justify-items-stretch">
        {Array.from({ length: 9 }).map((_, index) => (
          <PartnerCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default PartnerGridSkeleton;
