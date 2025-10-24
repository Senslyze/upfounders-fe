"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, Users, DollarSign, Zap, Clock, MapPin, MessageCircle, Globe, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/design-system/Atoms/card';
import { Badge } from '@/design-system/Atoms/badge';
import { Button } from '@/design-system/Atoms/button';
import { getCompanyById, type Partner } from '../home-page/utils';

type TabType = 'overview' | 'pricing' | 'features' | 'onboarding';

const PartnerDetailPage: React.FC = () => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId;
  const router = useRouter();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<{ url: string; type: 'video' | 'image' } | null>(null);

  useEffect(() => {
    let isCancelled = false;
    
    const fetchPartner = async () => {
      if (!companyId) return;
      
      setLoading(true);
      try {
        const partnerData = await getCompanyById(companyId);
        
        if (!isCancelled) {
          setPartner(partnerData);
        }
      } catch (error) {
        console.error('Error fetching partner:', error);
        if (!isCancelled) {
          setPartner(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchPartner();
    
    return () => {
      isCancelled = true;
    };
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

  // Helper: list of all displayable media (exclude LOGO/empty)
  const getDisplayableMedia = () => {
    if (!partner?.media) return [];
    return partner.media.filter(m => {
      const url = (m.media_url || '').trim();
      if (!url) return false;
      if (m.tag === 'LOGO') return false;
      // Skip macOS metadata files accidentally uploaded
      if (url.toLowerCase().includes('.ds_store')) return false;
      return true;
    });
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

  // (Deprecated) getMediaIcon no longer used after unified renderer

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: <Star className="w-4 h-4" /> },
    { id: 'pricing' as TabType, label: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'features' as TabType, label: 'Features', icon: <Zap className="w-4 h-4" /> },
    { id: 'onboarding' as TabType, label: 'Onboarding', icon: <Clock className="w-4 h-4" /> },
  ];

  // Try rendering as IMAGE first; on error, fallback to VIDEO
  const VideoOrImage: React.FC<{ url: string; alt: string }> = ({ url, alt }) => {
    const [showVideo, setShowVideo] = useState(false);
    return (
      <>
        <div
          className="overflow-hidden rounded-lg border border-gray-200 cursor-pointer transition-transform duration-200 group-hover:scale-[1.05]"
          onClick={() => setLightboxMedia({ url, type: showVideo ? 'video' : 'image' })}
        >
          <div className=" ">
            {!showVideo ? (
              <img
                src={url}
                alt={alt}
                className="w-full h-40 sm:h-48 object-cover"
                loading="lazy"
                onError={() => setShowVideo(true)}
              />
            ) : (
              <video
                src={url}
                className="w-full h-40 sm:h-48 object-cover"
                preload="metadata"
              />
            )}
          </div>
        </div>
      </>
    );
  };

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
          <p className="text-gray-600 mb-6">The partner you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/')} variant="outline">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Navigation */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </button>
        </div>

        {/* Partner Overview Card */}
        <Card className="mb-6 sm:mb-8 border border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    Solution Partner
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  {partner.profileImage && (
                    <img 
                      src={partner.profileImage} 
                      alt={partner.name}
                      className="w-16 h-16 rounded-lg object-cover mx-auto sm:mx-0"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{partner.name}</h1>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:ml-4">
                <Button 
                  variant="outline" 
                  className="cursor-pointer flex items-center justify-center space-x-2 border border-gray-200 w-full sm:w-auto"
                  onClick={() => partner?.id && router.push(`/?selectedIds=${encodeURIComponent(partner.id)}`)}
                >
                  <Users className="w-4 h-4" />
                  <span>Add to Comparison</span>
                </Button>
                {partner.website && (
                  <Button 
                    variant="default" 
                    className="cursor-pointer flex items-center justify-center space-x-2 border border-gray-200 w-full sm:w-auto"
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
        <Card className='bg-white p-4 border border-gray-200'>
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-nowrap justify-between sm:justify-start sm:space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center sm:justify-start space-x-2 py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex-1 sm:flex-none ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            {/* About Section */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">About {partner.name}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {partner.description}
                </p>
              </CardContent>
            </Card>

            {/* Supported Products & Geographic Coverage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Supported Products</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {partner.facebook_platforms.map((platform, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {getPlatformIcon(platform)}
                        <span className="text-gray-700 text-sm sm:text-base">{platform}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Geographic Coverage</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {partner.countries.length > 0 ? (
                      <>
                        {(showAllLocations ? partner.countries : partner.countries.slice(0, 3)).map((country, index) => (
                          <div key={index} className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            <span className="text-gray-700 text-xs sm:text-sm">{country}</span>
                          </div>
                        ))}
                        {partner.countries.length > 3 && (
                          <button
                            onClick={() => setShowAllLocations(!showAllLocations)}
                            className="inline-flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {showAllLocations ? (
                              <>
                                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Show Less</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>+{partner.countries.length - 3} More</span>
                              </>
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        <span className="text-gray-700 text-xs sm:text-sm">Global</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Industries */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Industries</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {partner.industries.map((industry, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border border-gray-200 text-xs sm:text-sm">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Media Gallery */}
            {hasDisplayableMedia() && (
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Media Gallery</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    {/* Lightbox */}
                    {lightboxMedia && (
                      <div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-2 sm:p-4"
                        onClick={() => setLightboxMedia(null)}
                      >
                        <div className="relative max-w-6xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                          <button
                            aria-label="Close"
                            className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 bg-red-400 text-white rounded-full p-1 sm:p-2 shadow"
                            onClick={() => setLightboxMedia(null)}
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          {lightboxMedia.type === 'video' ? (
                            <video
                              src={lightboxMedia.url}
                              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
                              controls
                            autoPlay
                          />
                        ) : (
                          <img
                            src={lightboxMedia.url}
                            alt="media"
                            className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
                          />
                        )}
                      </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {getDisplayableMedia().map((media, index) => (
                        <div key={media.id} className="relative group">
                          {/* Try video first, then fallback to image on error */}
                          <VideoOrImage
                            url={media.media_url}
                            alt={`${partner.name} media ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'pricing' && (
          <Card className="border border-gray-200">
            <CardHeader className="pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Pricing Information</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {/* Starting Price label */}
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl text-green-600 tracking-tight">
                    {typeof partner.minimum_spend === 'number'
                      ? (partner.minimum_spend === 0 || partner.minimum_spend === -1
                          ? 'Free plan available'
                          : `Minimum spend: ${new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 2,
                            }).format(partner.minimum_spend)} monthly`)
                      : 'Contact for pricing'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'features' && (
          <Card className="border border-gray-200">
            <CardHeader className="pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Features</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Service Models</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.service_models.map((model, index) => (
                      <Badge key={index} variant="outline" className="border border-gray-200 text-xs sm:text-sm bg-blue-50 text-blue-700 px-3 py-1">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Focus Areas</h3>
                  <div className="space-y-3">
                    {partner.focus_areas.map((area, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        <p className="text-sm sm:text-base text-black leading-relaxed">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'onboarding' && (
          <Card className="border border-gray-200">
            <CardHeader className="pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Onboarding Process</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm sm:text-base">Onboarding information will be available soon.</p>
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
