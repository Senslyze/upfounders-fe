import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users2, ArrowLeft, DollarSign, Zap, Clock } from 'lucide-react';
import { companyApi, type Company } from '@/services/api';
import { Badge } from '@/design-system/Atoms/badge';

const ComparePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { selectedIds?: string[] } | null;
  const selectedIds = state?.selectedIds ?? [];

  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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
      } catch (e: any) {
        setError(e?.message || 'Failed to load companies');
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
    navigate('.', { replace: true, state: { selectedIds: [] } });
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="flex items-start gap-3 mb-4">
          <div className="mt-1">
            <Users2 className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Comparison</h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 max-w-3xl">
          Compare up to 3 Meta partners side-by-side to find the best fit for your business needs. Analyze pricing,
          features, onboarding requirements, and Meta compliance support.
        </p>

        {/* Content */}
        <div className="mt-8">
          {isLoading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm text-center text-gray-600">
              Loading selected partners...
            </div>
          )}

          {!isLoading && companies.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Compare Partners</h2>
                <button onClick={clearAll} className="text-red-600 text-sm cursor-pointer">Clear All</button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2 mb-6 text-sm">
                <button
                  onClick={() => setActiveTab('overview')}
                  aria-selected={activeTab==='overview'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab==='overview' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <Users2 className={`w-4 h-4 ${activeTab==='overview' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  aria-selected={activeTab==='pricing'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab==='pricing' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <DollarSign className={`w-4 h-4 ${activeTab==='pricing' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Pricing
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  aria-selected={activeTab==='features'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab==='features' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <Zap className={`w-4 h-4 ${activeTab==='features' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('onboarding')}
                  aria-selected={activeTab==='onboarding'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab==='onboarding' ? 'bg-white text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <Clock className={`w-4 h-4 ${activeTab==='onboarding' ? 'text-blue-600' : 'text-gray-500'}`} />
                  Onboarding
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h3>
                    <div className={`grid gap-4`} style={{gridTemplateColumns:`repeat(${companies.length}, minmax(0, 1fr))`}}>
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
                    <div className={`grid gap-4`} style={{gridTemplateColumns:`repeat(${companies.length}, minmax(0, 1fr))`}}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                          <div className="flex flex-wrap gap-2">
                            {c.facebook_platforms?.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 text-xs">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Focus Areas</h3>
                    <div className={`grid gap-4`} style={{gridTemplateColumns:`repeat(${companies.length}, minmax(0, 1fr))`}}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                          <div className="flex flex-wrap gap-2 overflow-hidden">
                            {c.focus_areas?.map((item, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-green-50 text-green-700 text-xs block whitespace-normal break-words max-w-full text-left"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Industries</h3>
                    <div className={`grid gap-4`} style={{gridTemplateColumns:`repeat(${companies.length}, minmax(0, 1fr))`}}>
                      {companies.map((c) => (
                        <div key={c.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">{c.name}</div>
                          <div className="flex flex-wrap gap-2">
                            {c.industries?.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 text-xs">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder tabs */}
              {activeTab !== 'overview' && (
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
                  to="/"
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


