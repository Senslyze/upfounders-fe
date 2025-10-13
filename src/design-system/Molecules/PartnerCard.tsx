import React from 'react';
import { Users, Globe, MessageCircle, Instagram, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/design-system/Atoms/card';
import { Badge } from '@/design-system/Atoms/badge';
import { Button } from '@/design-system/Atoms/button';
import { type Partner } from '../templates/home-page/utils';
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
  const [showAllIndustries, setShowAllIndustries] = React.useState(false);
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
    <Card className="hover:shadow-md transition-shadow w-full max-w-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              {partner.profileImage && (
                <img 
                  src={partner.profileImage} 
                  alt={partner.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-gray-900 break-words leading-tight">{partner.name}</h3>
                {partner.isBadged && (
                  <span className="text-xs text-blue-600 font-medium">✓ Verified Partner</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {partner.service_models.map((model, index) => (
                <Badge key={index} variant={getTypeVariant(model)} className="text-xs">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 overflow-hidden">

        {/* Supported Platforms */}
        <div className="flex flex-wrap gap-2">
          {partner.facebook_platforms.map((platform, index) => (
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

        {/* Focus Areas */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Focus Areas</h4>
          <div className="flex flex-wrap gap-2">
            {partner.focus_areas.slice(0, 3).map((area, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                {area.length > 30 ? area.substring(0, 30) + '...' : area}
              </Badge>
            ))}
            {partner.focus_areas.length > 3 && (
              <span className="text-gray-500 text-xs">+{partner.focus_areas.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Service Models and Countries */}
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">Service Models</h4>
            <div className="flex flex-wrap gap-1">
              {partner.service_models.map((model, index) => (
                <Badge key={index} variant="outline" className="bg-green-50 text-green-700 text-xs">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <Globe className="w-4 h-4 text-blue-600 mr-1" />
              Countries
            </h4>
            <div className="flex flex-wrap gap-1">
              {partner.countries.slice(0, 3).map((country, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                  {country}
                </Badge>
              ))}
              {partner.countries.length > 3 && (
                <Badge variant="outline" className="bg-gray-50 text-gray-600 text-xs">
                  +{partner.countries.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Industries */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Industries</h4>
          <div className="flex flex-wrap gap-2">
            {(showAllIndustries ? partner.industries : partner.industries.slice(0, 3)).map((industry, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                {industry}
              </Badge>
            ))}
            {partner.industries.length > 3 && (
              <button
                onClick={() => setShowAllIndustries(!showAllIndustries)}
                className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                {showAllIndustries ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    <span>+{partner.industries.length - 3} More</span>
                  </>
                )}
              </button>
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
            { 'View Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;
