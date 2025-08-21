import React from 'react';
import { 
  Package, DollarSign, TrendingUp, AlertTriangle, Plus, 
  ShoppingCart, Receipt, FileBarChart 
} from 'lucide-react';

// Statistics Card Component
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

const DashboardView = ({ inventory }) => {
  const { items, sales, analytics } = inventory;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          title="Total Items"
          value={items.length.toLocaleString()}
          color="blue"
          change="+12% from last month"
        />
        <StatCard
          icon={DollarSign}
          title="Inventory Value"
          value={`$${analytics.totalValue.toLocaleString()}`}
          color="green"
          change="+8% from last month"
        />
        <StatCard
          icon={TrendingUp}
          title="Total Revenue"
          value={`$${analytics.totalRevenue.toLocaleString()}`}
          color="purple"
          change="+15% from last month"
        />
        <StatCard
          icon={AlertTriangle}
          title="Low Stock Alerts"
          value={analytics.lowStockItems}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Plus, label: 'Add Item', color: 'green' },
            { icon: ShoppingCart, label: 'New Sale', color: 'blue' },
            { icon: Receipt, label: 'Purchase Order', color: 'purple' },
            { icon: FileBarChart, label: 'Generate Report', color: 'orange' },
          ].map((action, index) => (
            <button
              key={index}
              className={`p-4 border-2 border-dashed border-${action.color}-300 rounded-lg hover:border-${action.color}-400 hover:bg-${action.color}-50 transition-colors group`}
            >
              <action.icon className={`h-8 w-8 text-${action.color}-500 mx-auto mb-2 group-hover:text-${action.color}-600`} />
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h3>
          <div className="space-y-3">
            {sales.slice(0, 5).map(sale => {
              const item = items.find(i => i.id === sale.itemId);
              return (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item?.name}</p>
                    <p className="text-sm text-gray-500">Qty: {sale.quantity} • {sale.date}</p>
                  </div>
                  <p className="font-semibold text-green-600">${(sale.quantity * sale.salePrice).toFixed(2)}</p>
                </div>
              );
            })}
            {sales.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No sales recorded yet
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Low Stock Alerts</h3>
          <div className="space-y-3">
            {items.filter(item => item.quantity <= item.minStock).slice(0, 5).map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">{item.quantity} left</p>
                  <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                </div>
              </div>
            ))}
            {items.filter(item => item.quantity <= item.minStock).length === 0 && (
              <div className="text-center py-6 text-gray-500">
                All items are adequately stocked
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;