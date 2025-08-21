// ================================================================
// src/components/views/PurchaseOrders.js
import React from 'react';
import { Plus } from 'lucide-react';

const PurchaseOrders = ({ inventory }) => {
  const mockPOs = [
    { id: 1, vendor: 'TechCorp', date: '2024-08-20', total: 1750.00, status: 'pending' },
    { id: 2, vendor: 'FashionCo', date: '2024-08-18', total: 850.00, status: 'received' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Purchase Orders</h3>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Purchase Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-gray-500">Total POs</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-gray-500">Received</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">1</div>
          <div className="text-sm text-gray-500">Overdue</div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockPOs.map(po => (
              <tr key={po.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  PO-{po.id.toString().padStart(4, '0')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{po.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{po.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${po.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    po.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    po.status === 'received' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {po.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900">Receive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrders;