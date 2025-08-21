// ================================================================
// src/components/views/Reports.js
import React from 'react';
import { Package, TrendingUp, Receipt, AlertTriangle, DollarSign, Percent, Download } from 'lucide-react';

const Reports = () => {
  const reports = [
    { title: 'Inventory Report', icon: Package, description: 'Current stock levels and valuation' },
    { title: 'Sales Report', icon: TrendingUp, description: 'Sales performance and trends' },
    { title: 'Purchase Report', icon: Receipt, description: 'Purchase orders and vendor analysis' },
    { title: 'Low Stock Report', icon: AlertTriangle, description: 'Items below minimum stock level' },
    { title: 'Profit Analysis', icon: DollarSign, description: 'Profit margins by item and category' },
    { title: 'Commission Report', icon: Percent, description: 'Sales commission tracking' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Reports & Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <report.icon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                Generate
              </button>
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
