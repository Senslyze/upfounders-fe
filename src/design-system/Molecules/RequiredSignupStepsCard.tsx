import React from 'react';
import { z } from 'zod';

const RequiredSignupStepsCardPropsSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.custom<React.ReactNode>(),
  requirementsTitle: z.string().default('Requirements:'),
  requirements: z.array(z.string()),
});

export type RequiredSignupStepsCardProps = z.infer<typeof RequiredSignupStepsCardPropsSchema>;

const RequiredSignupStepsCard: React.FC<RequiredSignupStepsCardProps> = ({ step, title, description, icon, requirementsTitle, requirements }) => {
  return (
    <div className="relative pl-10  w-4/5 mx-auto">
      {/* Step badge */}
      <div className="absolute -left-1 top-1">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center shadow">
          {step}
        </div>
      </div>
      {/* Card */}
      <div className="flex-1 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-700 mb-5">{description}</p>

        {/* Requirements */}
        <div>
          <p className="text-gray-900 font-semibold mb-2">{requirementsTitle}</p>
          <ul className="space-y-2">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-2 text-gray-700">
                <span className="mt-2 inline-flex"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequiredSignupStepsCard;


