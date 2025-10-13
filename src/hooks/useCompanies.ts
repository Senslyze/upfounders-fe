import { useState, useEffect, useCallback } from 'react';
import { getPartners, getCompanyById, getPaginatedPartners } from '../design-system/templates/home-page/utils';
import type { FilterOptions } from '../design-system/templates/home-page/utils';

export interface UseCompaniesState {
  partners: ReturnType<typeof getPartners> extends Promise<infer T> ? T : never;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseCompanyState {
  company: ReturnType<typeof getCompanyById> extends Promise<infer T> ? T : never;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UsePaginatedPartnersState {
  partners: ReturnType<typeof getPaginatedPartners> extends Promise<infer T> ? T : never;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook to fetch all companies
export const useCompanies = (): UseCompaniesState => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPartners();
      setPartners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch companies');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  return {
    partners,
    loading,
    error,
    refetch: fetchPartners,
  };
};

// Hook to fetch a single company by ID
export const useCompany = (id: string): UseCompanyState => {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getCompanyById(id);
      setCompany(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch company');
      console.error('Error fetching company:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return {
    company,
    loading,
    error,
    refetch: fetchCompany,
  };
};

// Hook to fetch paginated partners with filters
export const usePaginatedPartners = (
  page: number = 1,
  searchQuery?: string,
  filters?: FilterOptions
): UsePaginatedPartnersState => {
  const [partners, setPartners] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaginatedPartners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPaginatedPartners(page, searchQuery, filters);
      setPartners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch partners');
      console.error('Error fetching paginated partners:', err);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filters]);

  useEffect(() => {
    fetchPaginatedPartners();
  }, [fetchPaginatedPartners]);

  return {
    partners,
    loading,
    error,
    refetch: fetchPaginatedPartners,
  };
};

// Hook for direct API access (if needed)
export const useCompanyApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = useCallback(async <T>(request: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await request();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
      console.error('API request error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    executeRequest,
  };
};
