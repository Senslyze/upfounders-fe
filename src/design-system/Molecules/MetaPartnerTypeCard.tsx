import React from 'react';
import { CheckCircle   } from 'lucide-react';

export type MetaPartnerTypeCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  tone: 'blue' | 'green' | 'purple';
  features: string[];
};

const toneToClasses: Record<MetaPartnerTypeCardProps['tone'], string> = {
  // Only background color here to avoid conflicting with explicit border color
  blue: 'bg-blue-50',
  green: 'bg-green-50',
  purple: 'bg-purple-50',
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2">
    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
    <span className="text-gray-700 text-sm">{text}</span>
  </li>
);

const MetaPartnerTypeCard: React.FC<MetaPartnerTypeCardProps> = ({ title, description, icon, features, tone }) => {
  const toneClasses = toneToClasses[tone];

  return (
    <div className={`rounded-2xl border border-gray-200 ${toneClasses} p-6 md:p-7`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature) => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </ul>
    </div>
  );
};

export default MetaPartnerTypeCard;


