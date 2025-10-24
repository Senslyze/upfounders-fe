"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users2, ArrowLeft, DollarSign, Zap, Clock } from 'lucide-react';
import { companyApi, type Company } from '@/services/api';
import { Badge } from '@/design-system/Atoms/badge';
import { getComparisonIds, clearComparison } from '@/lib/utils';

const ComparePage: React.FC = () => {
  const router = useRouter();
  const selectedIds = React.useMemo(() => {
    return getComparisonIds();
  }, []);

  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showLimitWarning, setShowLimitWarning] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem('compare.selectedIds');
      if (raw) {
        const parsed = JSON.parse(raw);
        const originalCount = Array.isArray(parsed) ? parsed.length : 0;
        if (originalCount > 3) {
          setShowLimitWarning(true);
          // Auto-hide warning after 5 seconds
          setTimeout(() => setShowLimitWarning(false), 5000);
        }
      }
    } catch {
      // Ignore errors
    }
  }, []);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      if (!selectedIds || selectedIds.length === 0) return;
      setIsLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          selectedIds.map((id) => companyApi.getCompanyById(id))
        );
        setCompanies(results);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Failed to load companies';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, [selectedIds]);

  // Tabs
  type TabKey = 'overview' | 'pricing' | 'features' | 'onboarding';
  const [activeTab, setActiveTab] = React.useState<TabKey>('overview');

  const clearAll = () => {
    setCompanies([]);
    setError(null);
    setActiveTab('overview');
    clearComparison();
    router.replace('/compare');
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back link */}
        <div className="mb-4 sm:mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="flex items-start gap-3 mb-4">
          <div className="mt-1">
            <Users2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Partner Comparison</h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 max-w-3xl text-sm sm:text-base">
          Compare up to 3 Meta partners side-by-side to find the best fit for your business needs. Analyze pricing,
          features, onboarding requirements, and Meta compliance support.
        </p>

        {/* Warning for exceeding limit */}
        {showLimitWarning && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  <strong>Maximum 3 partners allowed:</strong> You selected more than 3 partners. Only the first 3 have been loaded for comparison.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-6 sm:mt-8">
          {isLoading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm text-center text-gray-600">
              Loading selected partners...
            </div>
          )}

          {!isLoading && companies.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Compare Partners</h2>
                <button onClick={clearAll} className="text-red-600 text-sm cursor-pointer">Clear All</button>
              </div>

              {/* Tabs */}
              <div className="flex flex-nowrap justify-between sm:justify-start sm:gap-3 bg-gray-100 rounded-xl p-1 sm:p-2 mb-6 text-sm" role="tablist">
                <button
                  onClick={() => setActiveTab('overview')}
                  role="tab"
                  aria-selected={activeTab==='overview'}
                  className={`inline-flex items-center justify-center sm:justify-start gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none whitespace-nowrap text-xs sm:text-sm ${activeTab==='overview' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <Users2 className={`w-4 h-4 hidden sm:inline ${activeTab==='overview' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  role="tab"
                  aria-selected={activeTab==='pricing'}
                  className={`inline-flex items-center justify-center sm:justify-start gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none whitespace-nowrap text-xs sm:text-sm ${activeTab==='pricing' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <DollarSign className={`w-4 h-4 hidden sm:inline ${activeTab==='pricing' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Pricing
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  role="tab"
                  aria-selected={activeTab==='features'}
                  className={`inline-flex items-center justify-center sm:justify-start gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none whitespace-nowrap text-xs sm:text-sm ${activeTab==='features' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <Zap className={`w-4 h-4 hidden sm:inline ${activeTab==='features' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('onboarding')}
                  role="tab"
                  aria-selected={activeTab==='onboarding'}
                  className={`inline-flex items-center justify-center sm:justify-start gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none whitespace-nowrap text-xs sm:text-sm ${activeTab==='onboarding' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <Clock className={`w-4 h-4 hidden sm:inline ${activeTab==='onboarding' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Onboarding
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h3>
                    <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-lg font-bold text-gray-900">{c.name}</div>
                          <div className="mt-3 text-sm text-gray-700">
                            <div className="flex items-center justify-between py-1">
                              <span className="text-gray-500">Partner Type:</span>
                              <span className="font-medium">{c.solution_types?.[0] || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between py-1">
                              <span className="text-gray-500">Regions:</span>
                              <span className="font-medium truncate max-w-[60%]" title={c.countries?.join(', ')}>{c.countries?.slice(0,3).join(', ') || '—'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supported Products */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Supported Products</h3>
                    <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                          <div className="flex flex-wrap gap-2">
                            {c.facebook_platforms?.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 text-xs border border-gray-200">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* Industries */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Industries</h3>
                    <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                          <div className="flex flex-wrap gap-2">
                            {c.industries?.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 text-xs border border-gray-200">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Pricing</h3>
                  <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                    {companies.map((c) => (
                      <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                        <p className="text-gray-700 text-sm">
                          {typeof c.minimum_spend === 'number'
                            ? (c.minimum_spend === 0 || c.minimum_spend === -1
                                ? 'Free plan available'
                                : `Minimum spend: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(c.minimum_spend)} monthly`)
                            : 'Contact for pricing'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-8">
                  {/* Service Models */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Service Models</h3>
                    <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                          <div className="flex flex-wrap gap-2">
                            {c.service_models?.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 !text-blue-700 text-xs border border-blue-100">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Focus Areas</h3>
                    <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                          <div className="flex flex-col gap-2">
                            {c.focus_areas?.map((item, idx) => (
                              <span
                                key={idx}
                                className="block w-full text-left whitespace-normal break-words hyphens-auto leading-snug p-2 rounded-md border border-green-200 bg-green-50 text-green-700 text-xs"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Onboarding Tab */}
              {activeTab === 'onboarding' && (
                <div className="text-gray-600 text-sm">This section will be available soon.</div>
              )}
            </div>
          )}

          {!isLoading && companies.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Users2 className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">No Partners Selected</h2>
                <p className="text-gray-600 max-w-2xl mb-6">
                  Select partners from the directory to compare their features, pricing, and onboarding requirements.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Browse Directory
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-600">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;


