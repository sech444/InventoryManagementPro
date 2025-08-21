import React from 'react';
import { Bell, Scan } from 'lucide-react';

const Header = ({ currentUser, currentView }) => {
  const handleBarcodeSearch = () => {
    // This functionality will be handled by the view components
    console.log('Barcode search clicked');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {currentView.replace('-', ' ')}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBarcodeSearch}
            className="p-2 text-gray-400 hover:text-gray-600 border rounded-md hover:bg-gray-50"
          >
            <Scan className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {currentUser.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
