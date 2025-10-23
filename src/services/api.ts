import axios from 'axios';
// In Next.js, prefer environment variables for configuration
// Use NEXT_PUBLIC_ prefix to allow access on the client
const envBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const runtimeOrigin = typeof window !== 'undefined' ? window.location.origin : '';
const normalized = (url: string) => url.replace(/\/$/, '');
export const baseURL = normalized(envBase || runtimeOrigin);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config: any) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error: any) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error('Company not found');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    throw error;
  }
);

// Media interface for the new API response
export interface Media {
  id: string;
  media_url: string;
  tag: string;
  media_type: string;
  company_id: string;
}

// Company API types - matches actual API response
export interface Company {
  id: string;
  name: string;
  description: string;
  company_website: string;
  minimum_spend?: number;
  countries: string[];
  facebook_platforms: string[];
  focus_areas: string[];
  industries: string[];
  is_badged: boolean;
  language_tags: string[];
  service_models: string[];
  solution_types: string[];
  solution_subtypes: string[];
  msp_profile_picture: {
    image: {
      uri: string;
    };
    id: string;
  };
  diverse_owned_identities: string[];
  typename: string; // Changed from __typename to typename
  created_at?: string;
  updated_at?: string;
  media: Media[]; // New media array
}

// API service functions
export const companyApi = {
  // Fetch all companies
  getAllCompanies: async (): Promise<Company[]> => {
    try {
      const response = await apiClient.get('/api/company');
      return response.data;
    } catch (error) {
      console.error('Error fetching all companies:', error);
      throw error;
    }
  },

  // Fetch company by ID
  getCompanyById: async (id: string): Promise<Company> => {
    try {
      const response = await apiClient.get(`/api/company/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching company with ID ${id}:`, error);
      throw error;
    }
  },

  // Search companies with query parameters
  searchCompanies: async (params?: {
    search?: string;
    partnerTypes?: string[];
    products?: string[];
    pricingModels?: string[];
    regions?: string[];
    keyServices?: string[];
  }): Promise<Company[]> => {
    try {
      const response = await apiClient.get('/api/company', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching companies:', error);
      throw error;
    }
  }
};

// Export the axios instance for custom requests
export { apiClient };
export default companyApi;
