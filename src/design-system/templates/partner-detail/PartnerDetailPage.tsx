import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, DollarSign, Zap, Clock, MapPin, MessageCircle, Globe, ChevronDown, ChevronUp, Image, Video, Play } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/design-system/Atoms/card';
import { Badge } from '@/design-system/Atoms/badge';
import { Button } from '@/design-system/Atoms/button';
import { getCompanyById, type Partner } from '../home-page/utils';

type TabType = 'overview' | 'pricing' | 'features' | 'onboarding' | 'reviews';

const PartnerDetailPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showAllLocations, setShowAllLocations] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      if (!companyId) return;
      
      setLoading(true);
      try {
        // Fetch partner by ID using the API
        const partnerData = await getCompanyById(companyId);
        setPartner(partnerData);
      } catch (error) {
        console.error('Error fetching partner:', error);
        setPartner(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [companyId]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-green-600" />;
      case 'instagram':
        return <MessageCircle className="w-4 h-4 text-pink-600" />;
      case 'facebook':
        return <MessageCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Globe className="w-4 h-4 text-gray-600" />;
    }
  };

  const getServiceModelVariant = (model: string) => {
    switch (model.toLowerCase()) {
      case 'solution partner':
        return 'default';
      case 'meta partner':
        return 'secondary';
      case 'technology partner':
        return 'outline';
      default:
        return 'outline';
    }
  };

  // Helper function to filter media by type
  const getMediaByType = (mediaType: string) => {
    if (!partner?.media) return [];
    return partner.media.filter(media => 
      media.media_type.toLowerCase() === mediaType.toLowerCase() && 
      media.tag !== 'LOGO' && // Exclude logo from media gallery
      media.media_url && // Ensure media_url exists
      media.media_url.trim() !== '' // Ensure media_url is not empty
    );
  };

  // Helper function to check if there's any displayable media
  const hasDisplayableMedia = () => {
    if (!partner?.media) return false;
    return partner.media.some(media => 
      media.tag !== 'LOGO' && 
      media.media_url && 
      media.media_url.trim() !== ''
    );
  };

  // Helper function to get media icon
  const getMediaIcon = (mediaType: string) => {
    switch (mediaType.toLowerCase()) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      default:
        return <Image className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: <Star className="w-4 h-4" /> },
    { id: 'pricing' as TabType, label: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'features' as TabType, label: 'Features', icon: <Zap className="w-4 h-4" /> },
    { id: 'onboarding' as TabType, label: 'Onboarding', icon: <Clock className="w-4 h-4" /> },
    { id: 'reviews' as TabType, label: 'Reviews', icon: <Star className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading partner details...</span>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Partner Not Found</h1>
          <p className="text-gray-600 mb-6">The partner you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="partner-detail-container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </button>
        </div>

        {/* Partner Overview Card */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    Solution Partner
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">4.8 (127 reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  {partner.profileImage && (
                    <img 
                      src={partner.profileImage} 
                      alt={partner.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{partner.name}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => partner?.id && navigate('/', { state: { selectedIds: [partner.id] } })}
                >
                  <Users className="w-4 h-4" />
                  <span>Add to Comparison</span>
                </Button>
                {partner.website && (
                  <Button 
                    variant="default" 
                    className="flex items-center space-x-2"
                    onClick={() => window.open(partner.website, '_blank')}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Website</span>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tab Navigation */}
        <Card className='bg-white p-4'>
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">About {partner.name}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {partner.description}
                </p>
              </CardContent>
            </Card>

            {/* Supported Products & Geographic Coverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-gray-900">Supported Products</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {partner.facebook_platforms.map((platform, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {getPlatformIcon(platform)}
                        <span className="text-gray-700">{platform}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-gray-900">Geographic Coverage</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {partner.countries.length > 0 ? (
                      <>
                        {(showAllLocations ? partner.countries : partner.countries.slice(0, 3)).map((country, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{country}</span>
                          </div>
                        ))}
                        {partner.countries.length > 3 && (
                          <button
                            onClick={() => setShowAllLocations(!showAllLocations)}
                            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors mt-2"
                          >
                            {showAllLocations ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                <span>Show Less</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                <span>+{partner.countries.length - 3} More</span>
                              </>
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Global</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Services */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-gray-900">Key Services</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {partner.service_models.map((service, index) => (
                    <Badge key={index} variant={getServiceModelVariant(service)} className="bg-blue-100 text-blue-800">
                      {service}
                    </Badge>
                  ))}
                  {partner.focus_areas.map((area, index) => (
                    <Badge key={`focus-${index}`} variant="outline" className="bg-gray-100 text-gray-700">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industries */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-gray-900">Industries</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {partner.industries.map((industry, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Media Gallery */}
            {hasDisplayableMedia() && (
              <Card>
                <CardContent>
                  <div className="space-y-6">
                    {/* Images Section */}
                    {getMediaByType('IMAGE').length > 0 && (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getMediaByType('IMAGE').map((media, index) => (
                            <div key={media.id} className="relative group">
                              <img
                                src={media.media_url}
                                alt={`${partner.name} media ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => window.open(media.media_url, '_blank')}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-white bg-opacity-90 rounded-full p-2">
                                    <Image className="w-5 h-5 text-gray-700" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Videos Section */}
                    {getMediaByType('VIDEO').length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                          <Video className="w-4 h-4 mr-2" />
                          Videos ({getMediaByType('VIDEO').length})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getMediaByType('VIDEO').map((media) => (
                            <div key={media.id} className="relative group">
                              <video
                                src={media.media_url}
                                className="w-full h-48 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                                controls
                                preload="metadata"
                              >
                                Your browser does not support the video tag.
                              </video>
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center pointer-events-none">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-white bg-opacity-90 rounded-full p-2">
                                    <Play className="w-5 h-5 text-gray-700" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Other Media Types */}
                    {partner.media.filter(media => 
                      media.media_type.toLowerCase() !== 'image' && 
                      media.media_type.toLowerCase() !== 'video' && 
                      media.tag !== 'LOGO'
                    ).length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-3">Other Media</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {partner.media.filter(media => 
                            media.media_type.toLowerCase() !== 'image' && 
                            media.media_type.toLowerCase() !== 'video' && 
                            media.tag !== 'LOGO'
                          ).map((media) => (
                            <div key={media.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-center space-x-3">
                                {getMediaIcon(media.media_type)}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {media.media_type}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {media.tag}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(media.media_url, '_blank')}
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'pricing' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Pricing Information</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Starting Price label */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Starting Price</p>
                  <p className="text-2xl md:text-3xl text-green-600 tracking-tight">
                    {typeof partner.minimum_spend === 'number'
                      ? (partner.minimum_spend === 0 || partner.minimum_spend === -1
                          ? 'Free plan available'
                          : `Starting at ${new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 2,
                            }).format(partner.minimum_spend)} per message`)
                      : 'Contact for pricing'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'features' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Features</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service Models</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.service_models.map((model, index) => (
                      <Badge key={index} variant="outline">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.focus_areas.map((area, index) => (
                      <Badge key={index} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'onboarding' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Onboarding Process</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Onboarding information will be available soon.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'reviews' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Reviews will be available soon.</p>
            </CardContent>
          </Card>
        )}
        </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailPage;
