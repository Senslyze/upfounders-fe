import React from 'react';
import { BookOpen, Users, Zap, Shield, DollarSign, User2, ShieldCheck, Users2, CheckCircle2 } from 'lucide-react';
import MetaPartnerTypeCard from '../../Molecules/MetaPartnerTypeCard';
import PricingModelCard from '../../Molecules/PricingModelCard';
import RequiredSignupStepsCard from '../../Molecules/RequiredSignupStepsCard';

const ResourcesPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/** Build steps data to auto-generate step numbers */}
        {(() => {
          /* no-op IIFE to keep simple constant definition inside JSX scope */
          return null;
        })()}
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
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Understanding Meta Partner Types
        </h2>

        {/* Partner Type Cards */}
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

        {/* Pricing Models */}
        <div className="mt-16">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Pricing Models Explained
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <PricingModelCard
              title="Per Message"
              description="Pay for each message sent"
              icon={<DollarSign className="w-5 h-5" />}
              pros={[
                'Predictable costs',
                'Scalable',
                'No monthly commitments',
              ]}
              cons={[
                'Costs can add up quickly',
                'May not be cost-effective for high volume',
              ]}
              examples={["Rasayel", "Twilio"]}
            />
            <PricingModelCard
              title="Per User"
              description="Pay per user or seat"
              icon={<User2 className="w-5 h-5" />}
              pros={[
                'Predictable monthly costs',
                'Unlimited messaging',
                'Team collaboration',
              ]}
              cons={[
                'Cost per user can be high',
                'May not scale well for large teams',
              ]}
              examples={["ManyChat", "Chatfuel"]}
            />
            <PricingModelCard
              title="Per Contact"
              description="Pay based on active contacts"
              icon={<Users className="w-5 h-5" />}
              pros={[
                'Contact-based pricing',
                'Good for growing businesses',
                'Flexible scaling',
              ]}
              cons={[
                'Costs increase with contact growth',
                'May incentivize contact reduction',
              ]}
              examples={["MessageBird"]}
            />
            <PricingModelCard
              title="Bundle Based"
              description="Pre-paid message bundles"
              icon={<DollarSign className="w-5 h-5" />}
              pros={[
                'Volume discounts',
                'Predictable costs',
                'No overage charges',
              ]}
              cons={[
                'Upfront payment required',
                'May waste unused messages',
              ]}
              examples={["CM.com"]}
            />
            <PricingModelCard
              title="Pay-as-you-go"
              description="Usage-based pricing without commitments"
              icon={<DollarSign className="w-5 h-5" />}
              pros={[
                'No monthly fees',
                'Pay only for what you use',
                'Flexible',
              ]}
              cons={[
                'Variable monthly costs',
                'May be more expensive per message',
              ]}
              examples={["Infobip"]}
            />
          </div>
        </div>

        {/* Required Signup Steps */}
        <div className="mt-16">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Required Signup Steps
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'Verify Facebook Business Manager ID',
                description:
                  "Ensure your Facebook Business Manager is properly set up and verified",
                icon: <ShieldCheck className="w-5 h-5" />,
                requirements: [
                  'Valid Facebook Business account',
                  'Business verification completed',
                ],
              },
              {
                title: 'Choose Your Partner',
                description:
                  'Select a Meta-approved partner based on your needs and budget',
                icon: <Users2 className="w-5 h-5" />,
                requirements: [
                  'Review partner features',
                  'Compare pricing models',
                  'Check regional availability',
                ],
              },
              {
                title: 'Partner Onboarding',
                description: "Complete the partner's onboarding process",
                icon: <Zap className="w-5 h-5" />,
                requirements: [
                  'Account creation',
                  'API key setup',
                  'Webhook configuration',
                ],
              },
              {
                title: 'Meta Approval',
                description: 'Wait for Meta to approve your messaging setup',
                icon: <CheckCircle2 className="w-5 h-5" />,
                requirements: [
                  'Partner submits for approval',
                  'Meta reviews application',
                  'Approval notification',
                ],
              },
            ].map((card, index) => (
              <RequiredSignupStepsCard
                key={card.title}
                step={index + 1}
                title={card.title}
                description={card.description}
                icon={card.icon}
                requirementsTitle="Requirements:"
                requirements={card.requirements}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;


