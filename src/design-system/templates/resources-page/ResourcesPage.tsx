import React from 'react';
import { BookOpen, Users, Zap, Shield } from 'lucide-react';
import MetaPartnerTypeCard from '../../Molecules/MetaPartnerTypeCard';

const ResourcesPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Meta Partners Resource Hub
          </h1>
          <p className="max-w-3xl text-gray-600 text-lg">
            Learn about Meta's partner programs, understand the differences between partner types, and get guidance
            on choosing the right provider for your business.
          </p>
        </div>

        {/* Section Title */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Understanding Meta Partner Types
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <MetaPartnerTypeCard
            title="Solution Partner"
            description="Can invoice customers directly and offer credit lines"
            icon={<Users className="w-5 h-5 text-blue-600" />}
            tone="blue"
            features={[
              'Direct customer billing',
              'Credit line offerings',
              'Full service management',
              'Customer relationship ownership',
            ]}
          />
          <MetaPartnerTypeCard
            title="Tech Provider"
            description="Can offer services but customers pay Meta directly"
            icon={<Zap className="w-5 h-5 text-green-600" />}
            tone="green"
            features={[
              'Technical implementation',
              'API and integration support',
              'Meta handles billing',
              'Focus on technology',
            ]}
          />
          <MetaPartnerTypeCard
            title="Tech Partner"
            description="Specialized technical partnerships with Meta"
            icon={<Shield className="w-5 h-5 text-purple-600" />}
            tone="purple"
            features={[
              'Deep technical integration',
              'Early access to features',
              'Direct Meta support',
              'Advanced capabilities',
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;


