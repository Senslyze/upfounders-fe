import { z } from 'zod';

// Import JSON data files
import botbizData from '/Users/bhaskarpandey/Downloads/api_downloads/0 Botbiz_7599150826856201.json';
import zapupData from '/Users/bhaskarpandey/Downloads/api_downloads/0. ZapUp_9320896967987043.json';
import teleobiData from '/Users/bhaskarpandey/Downloads/api_downloads/00 AI Automation by Teleobi_7582589485107231.json';
import iconicData from '/Users/bhaskarpandey/Downloads/api_downloads/000  Iconic Solution_8878841652191480.json';
import xpressbotData from '/Users/bhaskarpandey/Downloads/api_downloads/000000 API Platform by XpressBot_8007945982606187.json';
import plivoData from '/Users/bhaskarpandey/Downloads/api_downloads/00001 API Platform by Plivo_6084374375005556.json';

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
    id: apiPartner.id,
    name: apiPartner.name.replace(/^\d+\s*/, '').trim(), // Remove leading numbers
    type: getPartnerType(apiPartner.service_models),
    rating: getRating(),
    reviewCount: getReviewCount(),
    platforms: apiPartner.facebook_platforms.map(platform => 
      platform === 'WHATSAPP' ? 'WhatsApp' : platform
    ),
    description: apiPartner.description.length > 150 
      ? apiPartner.description.substring(0, 150) + '...'
      : apiPartner.description,
    keyFeatures: getKeyFeatures(apiPartner.focus_areas),
    moreFeatures: Math.max(0, apiPartner.focus_areas.length - 4),
    pricing: getPricing(apiPartner.service_models),
    location: getLocation(apiPartner.countries),
    services: getServices(apiPartner.industries),
    moreServices: Math.max(0, apiPartner.industries.length - 3),
    website: apiPartner.company_website,
    profileImage: apiPartner.msp_profile_picture.image.uri,
    isBadged: apiPartner.is_badged,
  };
};

// Create the partners array
export const partners = [
  transformApiPartnerToPartner(botbizData as ApiPartner),
  transformApiPartnerToPartner(zapupData as ApiPartner),
  transformApiPartnerToPartner(teleobiData as ApiPartner),
  transformApiPartnerToPartner(iconicData as ApiPartner),
  transformApiPartnerToPartner(xpressbotData as ApiPartner),
  transformApiPartnerToPartner(plivoData as ApiPartner),
];

// Export the Zod schema for validation
export { ApiPartnerSchema };
export type Partner = ReturnType<typeof transformApiPartnerToPartner>;
