import React, { useState } from 'react';
import {
  Crown, Menu, LogOut, BarChart3, Package, ShoppingCart,
  Receipt, Building2, Truck, FileBarChart, Users, Settings
} from 'lucide-react';

const Sidebar = ({ currentView, onViewChange, onLogout, currentUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'sales', icon: ShoppingCart, label: 'Sales Orders' },
    { id: 'purchase-orders', icon: Receipt, label: 'Purchase Orders' },
    { id: 'warehouses', icon: Building2, label: 'Warehouses' },
    { id: 'vendors', icon: Truck, label: 'Vendors' },
    { id: 'reports', icon: FileBarChart, label: 'Reports' },
    ...(currentUser.role === 'admin' ? [{ id: 'users', icon: Users, label: 'User Management' }] : []),
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`bg-white shadow-lg h-screen transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <Crown className="h-8 w-8 text-green-600" />
            {sidebarOpen && (
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Inventory Pro</h1>
                <p className="text-xs text-gray-500">Enterprise Edition</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentView === item.id
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        {sidebarOpen && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
