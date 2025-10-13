import React from 'react';

type UpdatesCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const UpdatesCard: React.FC<UpdatesCardProps> = ({ title, description, icon }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 max-w-md mx-auto">{description}</p>
    </div>
  );
};

export default UpdatesCard;


