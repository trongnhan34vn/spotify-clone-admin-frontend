import React from 'react';
import type { StatusBadgeProps } from '../types/ui/StatusBadge.type';

const colorMap = new Map<string, string>([
  ['red', 'bg-red-500'],
  ['blue', 'bg-blue-500'],
  ['green', 'bg-green-500'],
  ['yellow', 'bg-yellow-500'],
  ['gray', 'bg-gray-500'],
]);
const Badge = ({ label, icon, color }: StatusBadgeProps) => {

  const mapColor = () => {
    return colorMap.get(color);
  };

  return (
    <div className={`flex w-fit px-2 gap-1 ${mapColor()} items-center rounded`}>
      {icon}
      <p>{label}</p>
    </div>
  );
};

export default Badge;
