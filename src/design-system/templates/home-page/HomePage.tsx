import React from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Megaphone, Instagram } from 'lucide-react';
import SearchBar from '../../Molecules/SearchBar';
import StatsCards from '../../Molecules/StatsCards';
import PartnerGrid from '../../Molecules/PartnerGrid';

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

type HomePageProps = {
  onSearch?: (query: string) => void;
  onFiltersClick?: () => void;
};
type Partner = z.infer<typeof PartnerSchema>;

// Sample partner data
const samplePartners: Partner[] = [
  {
    id: '1',
    name: 'Rasayel',
    type: 'Solution Partner',
    rating: 4.8,
    reviewCount: 127,
    platforms: ['WhatsApp'],
    description: 'Rasayel lets businesses set up WhatsApp quickly and provides a shared inbox, chatbot builder and CRM integrations without extra user or...',
    keyFeatures: ['Quick WhatsApp setup', 'Shared inbox', 'Chatbot builder', 'CRM integrations'],
    moreFeatures: 4,
    pricing: 'Starting at $0.01 per message',
    location: 'Global',
    services: ['Onboarding Support', 'Automation Tools', 'CRM Integrations'],
    moreServices: 4
  },
  {
    id: '2',
    name: 'ManyChat',
    type: 'Tech Provider',
    rating: 4.6,
    reviewCount: 234,
    platforms: ['WhatsApp', 'Messenger', 'Instagram'],
    description: 'ManyChat is a leading chatbot platform that helps businesses automate conversations across WhatsApp, Messenger, and Instagram...',
    keyFeatures: ['Visual flow builder', 'Multi-channel support', 'E-commerce integrations', 'Advanced automation'],
    moreFeatures: 3,
    pricing: 'Free plan available',
    location: 'Global, North America, Europe',
    services: ['Chatbot Automation', 'Lead Generation', 'E-commerce Integration'],
    moreServices: 3
  },
  {
    id: '3',
    name: 'Twilio',
    type: 'Tech Partner',
    rating: 4.7,
    reviewCount: 456,
    platforms: ['WhatsApp', 'SMS', 'Voice'],
    description: 'Twilio provides powerful APIs for WhatsApp Business, enabling developers to build custom messaging solutions with enterprise-grade...',
    keyFeatures: ['WhatsApp Business API', 'REST API access', 'Webhook support', 'Multi-language SDKs'],
    moreFeatures: 3,
    pricing: '$0.0051 per message',
    location: 'Global',
    services: ['API Integration', 'Developer Tools', 'Enterprise Solutions'],
    moreServices: 3
  }
];

const HomePage: React.FC<HomePageProps> = ({ onSearch, onFiltersClick }) => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Decorative Background Icons */}
      <div className="absolute inset-0 opacity-5">
        {/* Top Left */}
        <div className="absolute top-20 left-10">
          <Megaphone className="w-8 h-8 text-green-400" />
        </div>
        <div className="absolute top-32 left-16">
          <MessageCircle className="w-6 h-6 text-blue-400" />
        </div>
        
        {/* Top Right */}
        <div className="absolute top-16 right-20">
          <MessageCircle className="w-7 h-7 text-green-400" />
        </div>
        <div className="absolute top-28 right-32">
          <MessageCircle className="w-5 h-5 text-green-300" />
        </div>
        <div className="absolute top-40 right-16">
          <MessageCircle className="w-6 h-6 text-green-400" />
        </div>
        
        {/* Mid Left */}
        <div className="absolute top-1/2 left-12">
          <Instagram className="w-8 h-8 text-purple-400" />
        </div>
        <div className="absolute top-1/2 left-24">
          <Instagram className="w-6 h-6 text-purple-300" />
        </div>
        
        {/* Center */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          <Megaphone className="w-7 h-7 text-green-300" />
        </div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 translate-y-8">
          <MessageCircle className="w-5 h-5 text-blue-300" />
        </div>
        
        {/* Mid Right */}
        <div className="absolute top-2/3 right-24">
          <MessageCircle className="w-6 h-6 text-blue-400" />
        </div>
        
        {/* Bottom */}
        <div className="absolute bottom-20 left-1/4">
          <Instagram className="w-7 h-7 text-purple-400" />
        </div>
        <div className="absolute bottom-32 right-1/4">
          <Megaphone className="w-6 h-6 text-green-400" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect Partner
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover, compare, and connect with Meta-approved Business Solution Providers. 
              Get expert consultancy to find the right partner for your business growth.
            </p>
          </div>
        </div>

        {/* Consultancy Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Need Help Finding the Right Partner?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-4">
                Our Meta partnership experts can help you identify the perfect solution provider 
                for your business needs. Get personalized recommendations and strategic guidance.
              </p>
              <Link
                to="/?contact=open"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Mail size={20} className="mr-2" />
                Get Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <SearchBar 
            onSearch={onSearch}
            onFiltersClick={onFiltersClick}
          />
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <StatsCards />
        </div>

        {/* Partners Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <PartnerGrid 
            partners={samplePartners}
            onCompareToggle={(partnerId) => console.log('Compare toggle:', partnerId)}
            onViewDetails={(partnerId) => console.log('View details:', partnerId)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
