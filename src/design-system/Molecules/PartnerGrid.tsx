import React from 'react';
import { z } from 'zod';
import PartnerCard from './PartnerCard';

// Zod schemas
const PartnerTypeSchema = z.enum(['Solution Partner', 'Tech Provider', 'Tech Partner']);
const PlatformSchema = z.enum(['WhatsApp', 'Messenger', 'Instagram', 'SMS', 'Voice']);

const PartnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: PartnerTypeSchema,
  rating: z.number().min(0).max(5),
  reviewCount: z.number().min(0),
  platforms: z.array(PlatformSchema),
  description: z.string(),
  keyFeatures: z.array(z.string()),
  moreFeatures: z.number().min(0),
  pricing: z.string(),
  location: z.string(),
  services: z.array(z.string()),
  moreServices: z.number().min(0),
});

const PartnerGridPropsSchema = z.object({
  partners: z.array(PartnerSchema),
  onCompareToggle: z.function().optional(),
  onViewDetails: z.function().optional(),
  comparisonItems: z.array(z.string()).optional().default([]),
  className: z.string().optional().default(""),
});

type Partner = z.infer<typeof PartnerSchema>;
type PartnerGridProps = {
  partners: Partner[];
  onCompareToggle?: (partnerId: string) => void;
  onViewDetails?: (partnerId: string) => void;
  comparisonItems?: string[];
  className?: string;
};

const PartnerGrid: React.FC<PartnerGridProps> = ({
  partners,
  onCompareToggle,
  onViewDetails,
  comparisonItems = [],
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {partners.length} of {partners.length} partners
        </p>
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
    </div>
  );
};

export default PartnerGrid;
