import { z } from 'zod';
import { companyApi } from '../../../services/api';
import type { Company, Media } from '../../../services/api';

// Zod schema for the API data structure - matches actual API response
const MediaSchema = z.object({
  id: z.string(),
  media_url: z.string(),
  tag: z.string(),
  media_type: z.string(),
  company_id: z.string(),
});

const ApiPartnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  company_website: z.string(),
  minimum_spend: z.number().optional(),
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
  typename: z.string(), // Changed from __typename to typename
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  media: z.array(MediaSchema), // New media array
});

type ApiPartner = z.infer<typeof ApiPartnerSchema>;

// Helper function to get logo URL from media array
const getLogoFromMedia = (media: Media[]): string | null => {
  const logoMedia = media.find(item => item.tag === 'LOGO');
  return logoMedia ? logoMedia.media_url : null;
};

// State for caching companies data
let cachedCompanies: Company[] | null = null;
let isLoading = false;

// Transform API data to our Partner format - using ONLY real API data
const transformApiPartnerToPartner = (apiPartner: ApiPartner) => {
  // Get logo from media array, fallback to msp_profile_picture
  const logoUrl = getLogoFromMedia(apiPartner.media) || apiPartner.msp_profile_picture?.image?.uri;
  
  return {
    // Basic info from API
    id: apiPartner.id,
    name: apiPartner.name,
    description: apiPartner.description,
    website: apiPartner.company_website,
    minimum_spend: apiPartner.minimum_spend,
    profileImage: logoUrl, // Now uses logo from media array
    isBadged: apiPartner.is_badged,
    
    // Arrays from API (no transformation, just direct mapping)
    countries: apiPartner.countries,
    facebook_platforms: apiPartner.facebook_platforms,
    focus_areas: apiPartner.focus_areas,
    industries: apiPartner.industries,
    language_tags: apiPartner.language_tags,
    service_models: apiPartner.service_models,
    solution_types: apiPartner.solution_types,
    solution_subtypes: apiPartner.solution_subtypes,
    diverse_owned_identities: apiPartner.diverse_owned_identities,
    
    // Additional API fields
    typename: apiPartner.typename, // Changed from __typename to typename
    created_at: apiPartner.created_at,
    updated_at: apiPartner.updated_at,
    media: apiPartner.media, // Include media array
    
    // No fake data - no rating, reviewCount, pricing, type mapping, etc.
  };
};

// Function to fetch and transform companies data
const fetchAndTransformCompanies = async (): Promise<ReturnType<typeof transformApiPartnerToPartner>[]> => {
  if (cachedCompanies) {
    return cachedCompanies.map(transformApiPartnerToPartner);
  }

  if (isLoading) {
    // Wait for ongoing request
    return new Promise((resolve) => {
      const checkCache = () => {
        if (cachedCompanies) {
          resolve(cachedCompanies.map(transformApiPartnerToPartner));
        } else {
          setTimeout(checkCache, 100);
        }
      };
      checkCache();
    });
  }

  try {
    isLoading = true;
    const companies = await companyApi.getAllCompanies();
    cachedCompanies = companies;
    return companies.map(transformApiPartnerToPartner);
  } catch (error) {
    console.error('Error fetching companies:', error);
    // Return empty array on error, could also implement fallback to static data
    return [];
  } finally {
    isLoading = false;
  }
};

// Function to get a single company by ID
export const getCompanyById = async (id: string): Promise<ReturnType<typeof transformApiPartnerToPartner> | null> => {
  try {
    const company = await companyApi.getCompanyById(id);
    return transformApiPartnerToPartner(company);
  } catch (error) {
    console.error(`Error fetching company with ID ${id}:`, error);
    return null;
  }
};

// Create the partners array with all data (now async)
export const getPartners = async (): Promise<ReturnType<typeof transformApiPartnerToPartner>[]> => {
  return await fetchAndTransformCompanies();
};

// Pagination and infinite scroll utilities
export const ITEMS_PER_PAGE = 12;

// Priority companies to show at the top in specific order
export const PRIORITY_COMPANIES = [
  'Zixflow',
  'Twilio',
  'Intrakt',
  'WATI',
  'SleekFlow',
  'AiSensy',
  'Rasayel',
  'Infobip',
  'BotSpace',
  'iMBrace'
];

export interface FilterOptions {
  products: string[];
  partnerTypes: string[];
  pricingModels: string[];
  regions: string[];
  keyServices: string[];
}

// Function to sort partners with priority companies at the top in specific order
const sortPartnersWithPriority = (partners: ReturnType<typeof transformApiPartnerToPartner>[], priorityCompanyNames?: string[]) => {
  if (!priorityCompanyNames || priorityCompanyNames.length === 0) return partners;
  
  const priorityPartners: ReturnType<typeof transformApiPartnerToPartner>[] = [];
  const otherPartners: ReturnType<typeof transformApiPartnerToPartner>[] = [];
  
  // Create a set of priority company names for faster lookup
  const priorityNamesSet = new Set(priorityCompanyNames.map(name => name.toLowerCase()));
  
  // Separate priority and non-priority partners
  partners.forEach(partner => {
    if (priorityNamesSet.has(partner.name.toLowerCase())) {
      priorityPartners.push(partner);
    } else {
      otherPartners.push(partner);
    }
  });
  
  // Sort priority partners according to the specified order
  const sortedPriorityPartners = priorityCompanyNames
    .map(name => priorityPartners.find(partner => 
      partner.name.toLowerCase() === name.toLowerCase()
    ))
    .filter(Boolean) as ReturnType<typeof transformApiPartnerToPartner>[];
  
  return [...sortedPriorityPartners, ...otherPartners];
};

export const getPaginatedPartners = async (page: number = 1, searchQuery?: string, filters?: FilterOptions, priorityCompanies?: string[]) => {
  const allPartners = await getPartners();
  let filteredPartners = allPartners;
  
  // Apply search filter - only return results for complete company names
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredPartners = filteredPartners.filter(partner => 
      partner.name.toLowerCase() === query
    );
  }
  
  // Apply filters - using only real API data
  if (filters) {
    // Filter by service models (instead of fake partner types)
    if (filters.partnerTypes && filters.partnerTypes.length > 0) {
      filteredPartners = filteredPartners.filter(partner => 
        partner.service_models.some(model => 
          filters.partnerTypes!.some(filterType => 
            model.toLowerCase() === filterType.toLowerCase()
          )
        )
      );
    }
    
    // Filter by products/platforms
    if (filters.products && filters.products.length > 0) {
      filteredPartners = filteredPartners.filter(partner => 
        partner.facebook_platforms.some(platform => 
          filters.products!.some(filterProduct => 
            platform.toLowerCase() === filterProduct.toLowerCase()
          )
        )
      );
    }
    
    // Filter by service models (instead of fake pricing)
    if (filters.pricingModels && filters.pricingModels.length > 0) {
      filteredPartners = filteredPartners.filter(partner => 
        partner.service_models.some(model => 
          filters.pricingModels!.some(filterPricing => 
            model.toLowerCase() === filterPricing.toLowerCase()
          )
        )
      );
    }
    
    // Filter by countries (instead of fake regions)
    if (filters.regions && filters.regions.length > 0) {
      filteredPartners = filteredPartners.filter(partner => 
        partner.countries.some(country => filters.regions!.includes(country))
      );
    }
    
    // Filter by focus areas and industries (instead of fake services)
    if (filters.keyServices && filters.keyServices.length > 0) {
      filteredPartners = filteredPartners.filter(partner => {
        const allFeatures = [...partner.focus_areas, ...partner.industries].map(f => f.toLowerCase());
        return filters.keyServices!.some(service => {
          const serviceLower = service.toLowerCase();
          return allFeatures.some(feature => feature.includes(serviceLower));
        });
      });
    }
  }
  
  // Apply priority sorting if specified
  filteredPartners = sortPartnersWithPriority(filteredPartners, priorityCompanies);
  
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

// Export the Zod schemas for validation
export { ApiPartnerSchema, MediaSchema };
export type Partner = ReturnType<typeof transformApiPartnerToPartner>;
