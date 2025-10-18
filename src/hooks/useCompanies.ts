import { useEffect, useState, useCallback } from 'react';
import type { Partner, FilterOptions } from '../design-system/templates/home-page/utils';
import { getPartners, getPaginatedPartners } from '../design-system/templates/home-page/utils';

export function useCompanies() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoading(true);
      try {
        const all = await getPartners();
        if (mounted) setPartners(all);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  return { partners, loading };
}

export function useInfinitePartners(
  searchQuery: string,
  filters: FilterOptions,
  priorityCompanies: string[]
) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchPage = useCallback(async (pageToLoad: number, reset: boolean = false) => {
    setLoading(true);
    try {
      const { partners: pagePartners, hasMore: more, totalCount: count } = await getPaginatedPartners(
        pageToLoad,
        searchQuery,
        filters,
        priorityCompanies
      );
      setPartners(prev => (reset ? pagePartners : [...prev, ...pagePartners]));
      setHasMore(more);
      setTotalCount(count);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, priorityCompanies]);

  // Reset and load first page when inputs change
  useEffect(() => {
    setPartners([]);
    setPage(1);
    fetchPage(1, true);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  }, [fetchPage, loading, hasMore, page]);

  return { partners, loading, hasMore, totalCount, loadMore };
}


