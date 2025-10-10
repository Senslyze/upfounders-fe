import React from 'react';
import { Users, TrendingUp, Star, Filter } from 'lucide-react';
import { type Partner } from '../templates/home-page/utils';

type StatCardProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconColor: string;
};

type StatsCardsProps = {
  partners: Partner[];
  className?: string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, iconColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${iconColor}`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-500 font-medium">
        {label}
      </div>
    </div>
  );
};

const StatsCards: React.FC<StatsCardsProps> = ({ partners, className = "" }) => {
  // Calculate dynamic statistics
  const totalPartners = partners.length;
  
  const solutionPartners = partners.filter(partner => partner.type === 'Solution Partner').length;
  
  const averageRating = partners.length > 0 
    ? (partners.reduce((sum, partner) => sum + partner.rating, 0) / partners.length).toFixed(1)
    : '0.0';
  
  // Count unique platforms across all partners
  const uniquePlatforms = new Set(partners.flatMap(partner => partner.platforms)).size;

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: totalPartners.toLocaleString(),
      label: "Total Partners",
      iconColor: "bg-blue-50"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      value: solutionPartners.toLocaleString(),
      label: "Solution Partners",
      iconColor: "bg-green-50"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      value: averageRating,
      label: "Average Rating",
      iconColor: "bg-yellow-50"
    },
    {
      icon: <Filter className="w-6 h-6 text-purple-600" />,
      value: uniquePlatforms,
      label: "Platforms Supported",
      iconColor: "bg-purple-50"
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default StatsCards;
