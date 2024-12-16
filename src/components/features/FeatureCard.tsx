import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="pt-6">
      <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
        <div className="-mt-6">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
            {icon}
          </div>
          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
            {title}
          </h3>
          <p className="mt-5 text-base text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;