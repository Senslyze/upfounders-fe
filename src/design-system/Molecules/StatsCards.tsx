import React from 'react';
import { z } from 'zod';
import { Users, TrendingUp, Star, Filter } from 'lucide-react';

// Zod schemas
const StatCardPropsSchema = z.object({
  icon: z.any(), // React.ReactNode
  value: z.union([z.string(), z.number()]),
  label: z.string(),
  iconColor: z.string(),
});

const StatsCardsPropsSchema = z.object({
  className: z.string().optional().default(""),
});

type StatCardProps = z.infer<typeof StatCardPropsSchema>;
type StatsCardsProps = {
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

const StatsCards: React.FC<StatsCardsProps> = ({ className = "" }) => {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: "12",
      label: "Total Partners",
      iconColor: "bg-blue-50"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      value: "7",
      label: "Solution Partners",
      iconColor: "bg-green-50"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      value: "4.5",
      label: "Average Rating",
      iconColor: "bg-yellow-50"
    },
    {
      icon: <Filter className="w-6 h-6 text-purple-600" />,
      value: "7",
      label: "Products Supported",
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
