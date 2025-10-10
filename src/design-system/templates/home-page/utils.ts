import { z } from 'zod';

// Import all JSON data files using import.meta.glob
const jsonModules = import.meta.glob('../../../assets/api_downloads/*.json', { eager: true });

// Zod schema for the API data structure
const ApiPartnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  company_website: z.string(),
  countries: z.array(z.string()),
  facebook_platforms: z.array(z.string()),
  focus_areas: z.array(z.string()),
  industries: z.array(z.string()),
  is_badged: z.boolean(),
  language_tags: z.array(z.string()),
  service_models: z.array(z.string()),
  solution_types: z.array(z.string()),
  solution_subtypes: z.array(z.string()),
  msp_profile_picture: z.object({
    image: z.object({
      uri: z.string(),
    }),
    id: z.string(),
  }),
  diverse_owned_identities: z.array(z.string()),
  __typename: z.string(),
});

type ApiPartner = z.infer<typeof ApiPartnerSchema>;

// Transform API data to our Partner format
const transformApiPartnerToPartner = (apiPartner: ApiPartner) => {
  // Map service models to partner types
  const getPartnerType = (serviceModels: string[]) => {
    if (serviceModels.includes('SAAS')) return 'Solution Partner';
    if (serviceModels.includes('MANAGED') || serviceModels.includes('PROJECT_BASED')) return 'Tech Provider';
    return 'Tech Partner';
  };

  // Map countries to location string
  const getLocation = (countries: string[]) => {
    if (countries.length > 10) return 'Global';
    if (countries.length > 3) return `${countries.slice(0, 3).join(', ')}, and ${countries.length - 3} more`;
    return countries.join(', ');
  };

  // Map focus areas to key features (limit to 4)
  const getKeyFeatures = (focusAreas: string[]) => {
    return focusAreas.slice(0, 4).map(area => 
      area.length > 30 ? area.substring(0, 30) + '...' : area
    );
  };

  // Map industries to services
  const getServices = (industries: string[]) => {
    const serviceMap: Record<string, string> = {
      'ECOMMERCE': 'E-commerce Integration',
      'RETAIL': 'Retail Solutions',
      'TECHNOLOGY': 'Tech Solutions',
      'HEALTHCARE': 'Healthcare Solutions',
      'FINANCIAL_SERVICES': 'Financial Services',
      'EDUCATION': 'Education Solutions',
      'TRAVEL': 'Travel Solutions',
      'AUTOMOTIVE': 'Automotive Solutions',
      'PROFESSIONAL_SERVICES': 'Professional Services',
      'TELECOM': 'Telecom Solutions',
    };
    
    return industries.slice(0, 3).map(industry => 
      serviceMap[industry] || `${industry.replace(/_/g, ' ')} Solutions`
    );
  };

  // Generate pricing based on service models
  const getPricing = (serviceModels: string[]) => {
    if (serviceModels.includes('SAAS')) return 'Starting at $29/month';
    if (serviceModels.includes('MANAGED')) return 'Custom pricing available';
    if (serviceModels.includes('PROJECT_BASED')) return 'Project-based pricing';
    return 'Contact for pricing';
  };

  // Generate rating and review count (mock data)
  const getRating = () => Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
  const getReviewCount = () => Math.floor(Math.random() * 500) + 50;

  return {
    id: apiPartner.id || 'unknown',
    name: (apiPartner.name || 'Unknown Partner').replace(/^\d+\s*/, '').trim(), // Remove leading numbers
    type: getPartnerType(apiPartner.service_models || []),
    rating: getRating(),
    reviewCount: getReviewCount(),
    platforms: (apiPartner.facebook_platforms || []).map(platform => 
      platform === 'WHATSAPP' ? 'WhatsApp' : platform
    ),
    description: (apiPartner.description || 'No description available').length > 150 
      ? (apiPartner.description || 'No description available').substring(0, 150) + '...'
      : (apiPartner.description || 'No description available'),
    keyFeatures: getKeyFeatures(apiPartner.focus_areas || []),
    moreFeatures: Math.max(0, (apiPartner.focus_areas || []).length - 4),
    pricing: getPricing(apiPartner.service_models || []),
    location: getLocation(apiPartner.countries || []),
    services: getServices(apiPartner.industries || []),
    moreServices: Math.max(0, (apiPartner.industries || []).length - 3),
    website: apiPartner.company_website || '#',
    profileImage: apiPartner.msp_profile_picture?.image?.uri || 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=Logo',
    isBadged: apiPartner.is_badged || false,
  };
};

// Transform all JSON modules to partners
const allPartners = Object.values(jsonModules)
  .map((module: any) => {
    try {
      const data = module.default || module;
      return transformApiPartnerToPartner(data as ApiPartner);
    } catch (error) {
      console.warn('Error processing partner data:', error);
      return null;
    }
  })
  .filter((partner): partner is NonNullable<typeof partner> => partner !== null);

// Create the partners array with all data
export const partners = allPartners;

// Pagination and infinite scroll utilities
export const ITEMS_PER_PAGE = 12;

export interface FilterOptions {
  products: string[];
  partnerTypes: string[];
  pricingModels: string[];
  regions: string[];
  keyServices: string[];
}

export const getPaginatedPartners = (page: number = 1, searchQuery?: string, filters?: FilterOptions) => {
  let filteredPartners = allPartners;
  
  // Apply search filter
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredPartners = filteredPartners.filter(partner => 
      partner.name.toLowerCase().includes(query) ||
      partner.description.toLowerCase().includes(query) ||
      partner.services.some(service => service.toLowerCase().includes(query)) ||
      partner.keyFeatures.some(feature => feature.toLowerCase().includes(query)) ||
      partner.type.toLowerCase().includes(query) ||
      partner.platforms.some(platform => platform.toLowerCase().includes(query))
    );
  }
  
  // Apply filters
  if (filters) {
    // Filter by partner types
    if (filters.partnerTypes && filters.partnerTypes.length > 0) {
      filteredPartners = filteredPartners.filter(partner => 
        filters.partnerTypes!.includes(partner.type)
      );
    }
    
    // Filter by products/platforms
    if (filters.products && filters.products.length > 0) {
      filteredPartners = filteredPartners.filter(partner => 
        partner.platforms.some(platform => filters.products!.includes(platform))
      );
    }
    
    // Filter by pricing models (based on pricing string)
    if (filters.pricingModels && filters.pricingModels.length > 0) {
      filteredPartners = filteredPartners.filter(partner => {
        const pricing = partner.pricing.toLowerCase();
        return filters.pricingModels!.some(model => 
          pricing.includes(model.toLowerCase()) ||
          (model === 'Per Message' && pricing.includes('message')) ||
          (model === 'Per User' && pricing.includes('user')) ||
          (model === 'Monthly Active Users' && pricing.includes('month')) ||
          (model === 'Pay-as-you-go' && pricing.includes('pay')) ||
          (model === 'One-time Fee' && pricing.includes('one-time'))
        );
      });
    }
    
    // Filter by regions (based on location)
    if (filters.regions && filters.regions.length > 0) {
      filteredPartners = filteredPartners.filter(partner => {
        const location = partner.location.toLowerCase();
        return filters.regions!.some(region => {
          const regionLower = region.toLowerCase();
          if (regionLower === 'global') return location.includes('global');
          if (regionLower === 'north america') return location.includes('north america') || location.includes('usa') || location.includes('canada');
          if (regionLower === 'europe') return location.includes('europe') || location.includes('uk') || location.includes('germany') || location.includes('france');
          if (regionLower === 'asia pacific') return location.includes('asia') || location.includes('pacific') || location.includes('india') || location.includes('singapore');
          if (regionLower === 'latin america') return location.includes('latin') || location.includes('america') || location.includes('brazil') || location.includes('mexico');
          if (regionLower === 'middle east & africa') return location.includes('middle east') || location.includes('africa') || location.includes('uae');
          return false;
        });
      });
    }
    
    // Filter by key services (based on key features and services)
    if (filters.keyServices && filters.keyServices.length > 0) {
      filteredPartners = filteredPartners.filter(partner => {
        const allFeatures = [...partner.keyFeatures, ...partner.services].map(f => f.toLowerCase());
        return filters.keyServices!.some(service => {
          const serviceLower = service.toLowerCase();
          return allFeatures.some(feature => 
            feature.includes(serviceLower) ||
            (serviceLower === 'automation tools' && (feature.includes('automation') || feature.includes('bot'))) ||
            (serviceLower === 'crm integrations' && feature.includes('crm')) ||
            (serviceLower === 'customer service' && (feature.includes('customer') || feature.includes('service'))) ||
            (serviceLower === 'chatbot builder' && (feature.includes('chatbot') || feature.includes('bot'))) ||
            (serviceLower === 'onboarding support' && feature.includes('onboarding'))
          );
        });
      });
    }
  }
  
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  return {
    partners: filteredPartners.slice(startIndex, endIndex),
    hasMore: endIndex < filteredPartners.length,
    totalCount: filteredPartners.length,
    currentPage: page,
    totalPages: Math.ceil(filteredPartners.length / ITEMS_PER_PAGE)
  };
};

// Export the Zod schema for validation
export { ApiPartnerSchema };
export type Partner = ReturnType<typeof transformApiPartnerToPartner>;
