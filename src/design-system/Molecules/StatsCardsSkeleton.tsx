import React from 'react';
import { Users, TrendingUp, Filter, Globe } from 'lucide-react';
import Skeleton from '../Atoms/skeleton';

const StatsCardsSkeleton: React.FC<{ className?: string }> = ({ className = "" }) => {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      label: "Total Partners",
      iconColor: "bg-blue-50"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      label: "SAAS Partners",
      iconColor: "bg-green-50"
    },
    {
      icon: <Filter className="w-6 h-6 text-purple-600" />,
      label: "Platforms Supported",
      iconColor: "bg-purple-50"
    },
    {
      icon: <Globe className="w-6 h-6 text-orange-600" />,
      label: "Countries Covered",
      iconColor: "bg-orange-50"
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          {/* Static icon */}
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${stat.iconColor}`}>
            {stat.icon}
          </div>
          
          {/* Value skeleton - only the number loads */}
          <div className="text-3xl font-bold text-gray-900 mb-2">
            <Skeleton className="h-9 w-20 mx-auto" />
          </div>
          
          {/* Static label */}
          <div className="text-sm text-gray-500 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCardsSkeleton;
