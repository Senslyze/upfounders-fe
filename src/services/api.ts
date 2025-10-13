import axios from 'axios';
import { baseURL } from '@/util/config';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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

// Company API types - matches actual API response
export interface Company {
  id: string;
  name: string;
  description: string;
  company_website: string;
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
  __typename: string;
  created_at?: string;
  updated_at?: string;
}

// API service functions
export const companyApi = {
  // Fetch all companies
  getAllCompanies: async (): Promise<Company[]> => {
    try {
      const response = await apiClient.get('/companies');
      return response.data;
    } catch (error) {
      console.error('Error fetching all companies:', error);
      throw error;
    }
  },

  // Fetch company by ID
  getCompanyById: async (id: string): Promise<Company> => {
    try {
      const response = await apiClient.get(`/companies/${id}`);
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
      const response = await apiClient.get('/companies', { params });
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
