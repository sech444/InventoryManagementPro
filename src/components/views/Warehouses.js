// // ================================================================
// // src/components/views/Warehouses.js
// import React from 'react';
// import { Building2, Plus, ArrowRightLeft } from 'lucide-react';

// const Warehouses = ({ warehouses, inventory }) => {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-800">Warehouse Management</h3>
//         <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Warehouse
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {warehouses.map(warehouse => {
//           const warehouseItems = inventory.items.filter(item => item.warehouse === warehouse.id);
//           const warehouseValue = warehouseItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
          
//           return (
//             <div key={warehouse.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h4 className="text-lg font-semibold text-gray-900">{warehouse.name}</h4>
//                   <p className="text-sm text-gray-500 mt-1">{warehouse.address}</p>
//                   <p className="text-sm text-gray-500">Manager: {warehouse.manager}</p>
//                 </div>
//                 <Building2 className="h-8 w-8 text-green-500" />
//               </div>
              
//               <div className="mt-4 grid grid-cols-2 gap-4">
//                 <div>
//                   <div className="text-2xl font-bold text-blue-600">{warehouseItems.length}</div>
//                   <div className="text-xs text-gray-500">Items</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-green-600">${warehouseValue.toFixed(0)}</div>
//                   <div className="text-xs text-gray-500">Value</div>
//                 </div>
//               </div>
              
//               <div className="mt-4 flex space-x-2">
//                 <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
//                   View Details
//                 </button>
//                 <button className="px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
//                   <ArrowRightLeft className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Warehouses;

// src/views/Warehouses.js
import React from 'react';
import { Building2, Plus, ArrowRightLeft } from 'lucide-react';

const Warehouses = (props = {}) => {
  // Extremely defensive prop handling
  console.log('Warehouses component received props:', props);
  
  const { warehouses = [], inventory = {} } = props;
  
  // Triple-check everything
  const safeWarehouses = Array.isArray(warehouses) ? warehouses : [];
  const safeInventory = inventory && typeof inventory === 'object' ? inventory : {};
  const safeInventoryItems = Array.isArray(safeInventory.items) ? safeInventory.items : [];
  
  console.log('Safe data:', {
    warehousesCount: safeWarehouses.length,
    inventoryItemsCount: safeInventoryItems.length,
    warehousesType: typeof safeWarehouses,
    isWarehousesArray: Array.isArray(safeWarehouses)
  });

  // If we still have no warehouses, show empty state
  if (safeWarehouses.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Warehouse Management</h3>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Warehouse
          </button>
        </div>
        
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Warehouses Found</h3>
          <p className="text-gray-500">Add your first warehouse to get started.</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Create Warehouse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Warehouse Management</h3>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Warehouse
        </button>
      </div>

      {/* Debug panel - remove once working */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
        <h4 className="font-semibold mb-2">Debug Information:</h4>
        <p>Warehouses array length: {safeWarehouses.length}</p>
        <p>Inventory items length: {safeInventoryItems.length}</p>
        <p>First warehouse: {JSON.stringify(safeWarehouses[0] || 'None')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeWarehouses.map((warehouse, index) => {
          // Extra safety for each warehouse object
          if (!warehouse || typeof warehouse !== 'object') {
            console.warn(`Invalid warehouse at index ${index}:`, warehouse);
            return (
              <div key={`invalid-${index}`} className="bg-red-50 p-6 rounded-xl border border-red-200">
                <p className="text-red-600">Invalid warehouse data at position {index}</p>
              </div>
            );
          }

          // Safe filtering with multiple checks
          let warehouseItems = [];
          try {
            warehouseItems = safeInventoryItems.filter(item => {
              return item && 
                     typeof item === 'object' && 
                     item.warehouse === warehouse.id;
            });
          } catch (error) {
            console.error('Error filtering warehouse items:', error);
            warehouseItems = [];
          }
          
          // Safe calculation
          let warehouseValue = 0;
          try {
            warehouseValue = warehouseItems.reduce((sum, item) => {
              const quantity = Number(item.quantity) || 0;
              const cost = Number(item.cost) || 0;
              return sum + (quantity * cost);
            }, 0);
          } catch (error) {
            console.error('Error calculating warehouse value:', error);
            warehouseValue = 0;
          }
          
          return (
            <div key={warehouse.id || `warehouse-${index}`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {warehouse.name || `Warehouse ${index + 1}`}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {warehouse.address || 'No address provided'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Manager: {warehouse.manager || 'Not assigned'}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{warehouseItems.length}</div>
                  <div className="text-xs text-gray-500">Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">${warehouseValue.toFixed(0)}</div>
                  <div className="text-xs text-gray-500">Value</div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                  View Details
                </button>
                <button className="px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                  <ArrowRightLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Warehouses;