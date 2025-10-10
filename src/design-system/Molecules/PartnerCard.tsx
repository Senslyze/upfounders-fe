import React from 'react';
import { z } from 'zod';
import { Star, Users, DollarSign, Globe, MessageCircle, Instagram, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/design-system/Atoms/card';
import { Badge } from '@/design-system/Atoms/badge';
import { Button } from '@/design-system/Atoms/button';

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
  website: z.string().optional(),
  profileImage: z.string().optional(),
  isBadged: z.boolean().optional(),
});

const PartnerCardPropsSchema = z.object({
  partner: PartnerSchema,
  onCompareToggle: z.function().optional(),
  onViewDetails: z.function().optional(),
  isInComparison: z.boolean().optional().default(false),
});

type Partner = z.infer<typeof PartnerSchema>;
type PartnerCardProps = {
  partner: Partner;
  onCompareToggle?: (partnerId: string) => void;
  onViewDetails?: (partnerId: string) => void;
  isInComparison?: boolean;
};

const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  onCompareToggle,
  onViewDetails,
  isInComparison = false
}) => {
  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'Solution Partner':
        return 'default' as const;
      case 'Tech Provider':
        return 'secondary' as const;
      case 'Tech Partner':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-green-600" />;
      case 'messenger':
        return <MessageCircle className="w-4 h-4 text-blue-600" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'sms':
        return <Phone className="w-4 h-4 text-green-600" />;
      case 'voice':
        return <Phone className="w-4 h-4 text-blue-600" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {partner.profileImage && (
                <img 
                  src={partner.profileImage} 
                  alt={partner.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                {partner.isBadged && (
                  <span className="text-xs text-blue-600 font-medium">✓ Verified Partner</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <Badge variant={getTypeVariant(partner.type)}>
                {partner.type}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">{partner.rating}</span>
                <span className="text-sm text-gray-500">({partner.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Supported Platforms */}
        <div className="flex flex-wrap gap-2">
          {partner.platforms.map((platform, index) => (
            <Badge key={index} variant="outline" className="flex items-center space-x-1">
              {getPlatformIcon(platform)}
              <span>{platform}</span>
            </Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {partner.description}
        </p>

        {/* Key Features */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Key Features</h4>
          <div className="flex flex-wrap gap-2">
            {partner.keyFeatures.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                {feature}
              </Badge>
            ))}
            {partner.moreFeatures > 0 && (
              <span className="text-gray-500 text-xs">+{partner.moreFeatures} more</span>
            )}
          </div>
        </div>

        {/* Pricing and Location */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">{partner.pricing}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">{partner.location}</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {partner.services.map((service, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                {service}
              </Badge>
            ))}
            {partner.moreServices > 0 && (
              <span className="text-gray-500 text-xs">+{partner.moreServices} more</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant={isInComparison ? "default" : "outline"}
            size="sm"
            onClick={() => onCompareToggle?.(partner.id)}
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Compare</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => partner.website ? window.open(partner.website, '_blank') : onViewDetails?.(partner.id)}
          >
            {partner.website ? 'Visit Website' : 'View Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;
