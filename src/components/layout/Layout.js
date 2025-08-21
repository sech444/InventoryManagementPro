// import React, { useState } from 'react';
// import { Warehouses,
//   Crown, Menu, Bell, LogOut, BarChart3, Package, ShoppingCart, 
//   Receipt, Building2, Truck, FileBarChart, Users, Settings, Scan 
// } from 'lucide-react';
// import DashboardView from '../views/Dashboard';
// import InventoryView from '../views/Inventory';
// import UserManagementView from '../views/UserManagement';


// const Layout = ({ currentUser, onLogout, inventory, auth }) => {
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleBarcodeSearch = () => {
//     const barcode = prompt('Enter or scan barcode:');
//     if (barcode) {
//       const item = inventory.searchByBarcode(barcode);
//       if (item) {
//         setCurrentView('inventory');
//         // In a real app, you'd also set search term or highlight the item
//       } else {
//         alert('Item not found');
//       }
//     }
//   };

//   // Sidebar Navigation
//   const Sidebar = () => (
//     <div className={`bg-white shadow-lg h-screen transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
//       <div className="p-4">
//         <div className="flex items-center justify-between">
//           <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
//             <Crown className="h-8 w-8 text-green-600" />
//             {sidebarOpen && (
//               <div className="ml-3">
//                 <h1 className="text-xl font-bold text-gray-900">Inventory Pro</h1>
//                 <p className="text-xs text-gray-500">Enterprise Edition</p>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 rounded-md hover:bg-gray-100"
//           >
//             <Menu className="h-4 w-4" />
//           </button>
//         </div>
//       </div>

//       <nav className="mt-8">
//         <div className="px-4 space-y-2">
//           {[
//             { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
//             { id: 'inventory', icon: Package, label: 'Inventory' },
//             { id: 'sales', icon: ShoppingCart, label: 'Sales Orders' },
//             { id: 'purchases', icon: Receipt, label: 'Purchase Orders' },
//             { id: 'warehouses', icon: Building2, label: 'Warehouses' },
//             { id: 'vendors', icon: Truck, label: 'Vendors' },
//             { id: 'reports', icon: FileBarChart, label: 'Reports' },
//             ...(currentUser.role === 'admin' ? [{ id: 'users', icon: Users, label: 'User Management' }] : []),
//             { id: 'settings', icon: Settings, label: 'Settings' },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setCurrentView(item.id)}
//               className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
//                 currentView === item.id
//                   ? 'bg-green-100 text-green-800'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//               }`}
//             >
//               <item.icon className="h-5 w-5" />
//               {sidebarOpen && <span className="ml-3">{item.label}</span>}
//             </button>
//           ))}
//         </div>
//       </nav>

//       <div className="absolute bottom-4 left-4 right-4">
//         {sidebarOpen && (
//           <div className="bg-gray-50 rounded-lg p-3 mb-4">
//             <div className="flex items-center">
//               <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
//                 <span className="text-white text-sm font-medium">
//                   {currentUser.name.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               <div className="ml-3 flex-1">
//                 <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
//                 <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
//               </div>
//             </div>
//           </div>
//         )}
//         <button
//           onClick={onLogout}
//           className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
//         >
//           <LogOut className="h-5 w-5" />
//           {sidebarOpen && <span className="ml-3">Logout</span>}
//         </button>
//       </div>
//     </div>
//   );

//   // Top Header
//   const Header = () => (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <h2 className="text-2xl font-bold text-gray-900 capitalize">{currentView.replace(/([A-Z])/g, ' $1')}</h2>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={handleBarcodeSearch}
//             className="p-2 text-gray-400 hover:text-gray-600 border rounded-md hover:bg-gray-50"
//           >
//             <Scan className="h-5 w-5" />
//           </button>
//           <button className="p-2 text-gray-400 hover:text-gray-600">
//             <Bell className="h-5 w-5" />
//           </button>
//           <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
//             <span className="text-white text-sm font-medium">
//               {currentUser.name.charAt(0).toUpperCase()}
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return <DashboardView inventory={inventory} />;
//       case 'inventory':
//         return <InventoryView inventory={inventory} currentUser={currentUser} />;
//       case 'users':
//         return currentUser.role === 'admin' ? 
//           <UserManagementView auth={auth} currentUser={currentUser} /> : 
//           <div className="text-center py-12">
//             <Users className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-lg font-medium text-gray-900">Access Denied</h3>
//             <p className="text-gray-500">Only administrators can access user management.</p>
//           </div>;
//       default:
//         return (
//           <div className="text-center py-12">
//             <Package className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-lg font-medium text-gray-900">{currentView}</h3>
//             <p className="text-gray-500">This feature is coming soon...</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
        
//         <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
//           {renderCurrentView()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import { 
  Crown, Menu, Bell, LogOut, BarChart3, Package, ShoppingCart, 
  Receipt, Building2, Truck, FileBarChart, Users, Settings, Scan 
} from 'lucide-react';
import DashboardView from '../views/Dashboard';
import InventoryView from '../views/Inventory';
import UserManagementView from '../views/UserManagement';
import WarehousesView from '../views/Warehouses'; // Import your Warehouses component

const Layout = ({ currentUser, onLogout, inventory, auth, warehouses }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock warehouses data if not provided - you can remove this once you have real data
  const defaultWarehouses = warehouses || [
    {
      id: 1,
      name: "Main Warehouse",
      address: "123 Storage St, New York, NY 10001",
      manager: "John Smith"
    },
    {
      id: 2,
      name: "Secondary Warehouse", 
      address: "456 Distribution Ave, Los Angeles, CA 90210",
      manager: "Jane Doe"
    },
    {
      id: 3,
      name: "Regional Hub",
      address: "789 Logistics Blvd, Chicago, IL 60601", 
      manager: "Mike Johnson"
    }
  ];

  const handleBarcodeSearch = () => {
    const barcode = prompt('Enter or scan barcode:');
    if (barcode) {
      const item = inventory.searchByBarcode(barcode);
      if (item) {
        setCurrentView('inventory');
        // In a real app, you'd also set search term or highlight the item
      } else {
        alert('Item not found');
      }
    }
  };

  // Sidebar Navigation
  const Sidebar = () => (
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
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'inventory', icon: Package, label: 'Inventory' },
            { id: 'sales', icon: ShoppingCart, label: 'Sales Orders' },
            { id: 'purchases', icon: Receipt, label: 'Purchase Orders' },
            { id: 'warehouses', icon: Building2, label: 'Warehouses' },
            { id: 'vendors', icon: Truck, label: 'Vendors' },
            { id: 'reports', icon: FileBarChart, label: 'Reports' },
            ...(currentUser.role === 'admin' ? [{ id: 'users', icon: Users, label: 'User Management' }] : []),
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
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

  // Top Header
  const Header = () => (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{currentView.replace(/([A-Z])/g, ' $1')}</h2>
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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView inventory={inventory} />;
      case 'inventory':
        return <InventoryView inventory={inventory} currentUser={currentUser} />;
      case 'warehouses':
        return <WarehousesView warehouses={defaultWarehouses} inventory={inventory} />;
      case 'users':
        return currentUser.role === 'admin' ? 
          <UserManagementView auth={auth} currentUser={currentUser} /> : 
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Access Denied</h3>
            <p className="text-gray-500">Only administrators can access user management.</p>
          </div>;
      default:
        return (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">{currentView}</h3>
            <p className="text-gray-500">This feature is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default Layout;