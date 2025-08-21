import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color = 'green', change = null }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold text-${color}-600 mt-1`}>{value}</p>
        {change && (
          <p className="text-sm text-green-600 mt-2">
            <TrendingUp className="h-4 w-4 inline mr-1" />
            {change}
          </p>
        )}
      </div>
      <div className={`p-3 bg-${color}-100 rounded-lg`}>
        <Icon className={`h-8 w-8 text-${color}-600`} />
      </div>
    </div>
  </div>
);

export default StatCard;
