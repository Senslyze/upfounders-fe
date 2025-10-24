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
  disableCompare?: boolean;
};

const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  onCompareToggle,
  onViewDetails,
  isInComparison = false,
  disableCompare = false
}) => {
  const [showAllIndustries, setShowAllIndustries] = React.useState(false);
  const [compareSelected, setCompareSelected] = React.useState(false);
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

  const isSelected = compareSelected || isInComparison;

  return (
    <Card id={`partner-${partner.id}`} className="hover:shadow-md transition-shadow w-full max-w-sm mx-auto md:mx-0 border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              {partner.profileImage && (
                <img 
                  src={partner.profileImage} 
                  alt={partner.name}
                  className="w-10 h-10 rounded-lg object-cover"
                  loading="lazy"
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
                <Badge key={index} variant={getTypeVariant(model)} className="text-xs border border-gray-200">
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
          {partner.facebook_platforms && partner.facebook_platforms.length > 0 ? (
            partner.facebook_platforms.map((platform, index) => (
              <Badge key={index} variant="outline" className="flex items-center space-x-1 border-gray-200">
                {getPlatformIcon(platform)}
                <span>{platform}</span>
              </Badge>
            ))
          ) : (
            <span className="text-gray-400 text-sm">Not available</span>
          )}
        </div>

        {/* Description */}
        {partner.description ? (
          <p className="text-gray-600 text-sm line-clamp-2">
            {partner.description}
          </p>
        ) : (
          <p className="text-gray-400 text-sm">Not available</p>
        )}

        {/* Service Models*/}
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">Service Models</h4>
            <div className="flex flex-wrap gap-1">
              {partner.service_models && partner.service_models.length > 0 ? (
                partner.service_models.map((model, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 !text-blue-700 text-xs border border-blue-100">
                    {model}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 text-xs">Not available</span>
              )}
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              {partner.focus_areas && partner.focus_areas.length > 0 ? (
                <>
                  {partner.focus_areas.slice(0, 3).map((area, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                      {area.length > 30 ? area.substring(0, 30) + '...' : area}
                    </Badge>
                  ))}
                  {partner.focus_areas.length > 3 && (
                    <span className="text-gray-500 text-xs">+{partner.focus_areas.length - 3} more</span>
                  )}
                </>
              ) : (
                <span className="text-gray-400 text-xs">Not available</span>
              )}
            </div>
          </div>

          {/* Countries */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <Globe className="w-4 h-4 text-blue-600 mr-1" />
              Countries
            </h4>
            <div className="flex flex-wrap gap-1">
              {partner.countries && partner.countries.length > 0 ? (
                <>
                  {partner.countries.slice(0, 3).map((country, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 text-xs border-gray-200">
                      {country}
                    </Badge>
                  ))}
                  {partner.countries.length > 3 && (
                    <Badge variant="outline" className="bg-gray-50 text-gray-600 text-xs border-gray-200">
                      +{partner.countries.length - 3} more
                    </Badge>
                  )}
                </>
              ) : (
                <span className="text-gray-400 text-xs">Not available</span>
              )}
            </div>
          </div>
        </div>

        {/* Industries */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Industries</h4>
          <div className="flex flex-wrap gap-2">
            {partner.industries && partner.industries.length > 0 ? (
              <>
                {(showAllIndustries ? partner.industries : partner.industries.slice(0, 3)).map((industry, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
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
              </>
            ) : (
              <span className="text-gray-400 text-sm">Not available</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (disableCompare && !isSelected) return;
              setCompareSelected(!isSelected);
              onCompareToggle?.(partner.id);
            }}
            disabled={disableCompare && !isSelected}
            className={` cursor-pointer border border-gray-200 flex items-center space-x-2 hover:text-current ${disableCompare && !isSelected ? 'opacity-60 cursor-not-allowed' : ''} ${isSelected ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:text-white border-transparent' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            <Users className={`w-4 h-4 ${isSelected ? 'text-white' : ''}`} /> 
            <span>{isSelected ? 'Remove' : 'Compare'}</span>
          </Button>
          <Button
            className='cursor-pointer bg-gray-100 text-gray-800'
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails?.(partner.id)}
          >
            { 'View Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;
