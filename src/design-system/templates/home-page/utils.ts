import { z } from 'zod';
import { companyApi } from '../../../services/api';
import type { Company } from '../../../services/api';

// Zod schema for the API data structure - matches actual API response
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
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

type ApiPartner = z.infer<typeof ApiPartnerSchema>;

// State for caching companies data
let cachedCompanies: Company[] | null = null;
let isLoading = false;

// Transform API data to our Partner format - using ONLY real API data
const transformApiPartnerToPartner = (apiPartner: ApiPartner) => {
  return {
    // Basic info from API
    id: apiPartner.id,
    name: apiPartner.name,
    description: apiPartner.description,
    website: apiPartner.company_website,
    profileImage: apiPartner.msp_profile_picture?.image?.uri,
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
    typename: apiPartner.__typename,
    created_at: apiPartner.created_at,
    updated_at: apiPartner.updated_at,
    
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

export interface FilterOptions {
  products: string[];
  partnerTypes: string[];
  pricingModels: string[];
  regions: string[];
  keyServices: string[];
}

export const getPaginatedPartners = async (page: number = 1, searchQuery?: string, filters?: FilterOptions) => {
  const allPartners = await getPartners();
  let filteredPartners = allPartners;
  
  // Apply search filter - using only real API data
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredPartners = filteredPartners.filter(partner => 
      partner.name.toLowerCase().includes(query) ||
      partner.description.toLowerCase().includes(query) ||
      partner.industries.some(industry => industry.toLowerCase().includes(query)) ||
      partner.focus_areas.some(area => area.toLowerCase().includes(query)) ||
      partner.facebook_platforms.some(platform => platform.toLowerCase().includes(query)) ||
      partner.service_models.some(model => model.toLowerCase().includes(query))
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
