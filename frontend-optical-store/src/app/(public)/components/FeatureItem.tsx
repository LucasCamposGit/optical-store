import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  label: string;
}

export default function FeatureItem({ icon, label }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-[150px]">
      <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {icon}
      </svg>
      <p className="mt-2 text-gray-700 font-medium text-sm">{label}</p>
    </div>
  );
}

