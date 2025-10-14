import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users2, ArrowLeft } from 'lucide-react';
import { companyApi, type Company } from '@/services/api';
import { Badge } from '@/design-system/Atoms/badge';

const ComparePage: React.FC = () => {
  const location = useLocation();
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

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Selected Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((c) => (
                  <div key={c.id} className="border border-gray-200 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{c.name}</h3>
                    {c.company_website && (
                      <a href={c.company_website} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">{c.company_website}</a>
                    )}
                    <p className="text-gray-600 text-sm mt-3 mb-4 line-clamp-4">{c.description}</p>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Service Models</div>
                        <div className="flex flex-wrap gap-2">
                          {c.service_models?.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Platforms</div>
                        <div className="flex flex-wrap gap-2">
                          {c.facebook_platforms?.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-100 text-gray-700 text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Focus Areas</div>
                        <div className="flex flex-wrap gap-2">
                          {c.focus_areas?.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Industries</div>
                        <div className="flex flex-wrap gap-2">
                          {c.industries?.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Countries</div>
                        <div className="flex flex-wrap gap-2">
                          {c.countries?.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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


