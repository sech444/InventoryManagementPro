//   inventory-management-pro/src/components/views/Inventory.js
// Inventory View with enhanced features
import Swal from 'sweetalert2';
import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Download, Edit2, Trash2, ShoppingCart, 
  Printer, Package, AlertTriangle, QrCode, Scan 
} from 'lucide-react';

const InventoryView = ({ inventory = { items: [] }, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Safe access to inventory items
  const items = inventory.items || [];

  // Get unique categories from items
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(item => item.category).filter(Boolean))];
    return cats;
  }, [items]);

  // Mock warehouses - replace with real data
  const warehouses = [
    { id: 1, name: 'Main Warehouse' },
    { id: 2, name: 'Secondary Warehouse' },
    { id: 3, name: 'Regional Hub' }
  ];

  // Filter items based on search and filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (!item) return false;
      
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.barcode?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || item.category === selectedCategory;

      const matchesStock = stockFilter === 'all' || 
        (stockFilter === 'low' && item.quantity <= (item.minStock || 0)) ||
        (stockFilter === 'out' && item.quantity === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [items, searchTerm, selectedCategory, stockFilter]);

  // Handler functions
  const exportToCSV = () => {
    const csvData = filteredItems.map(item => ({
      Name: item.name,
      SKU: item.sku,
      Category: item.category,
      Quantity: item.quantity,
      Price: item.price,
      Cost: item.cost
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(csvData[0] || {}).join(",") + "\n" +
      csvData.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBarcodeSearch = () => {
    const barcode = prompt('Enter or scan barcode:');
    if (barcode) {
      const item = items.find(item => item.barcode === barcode);
      if (item) {
        // Scroll to item
        const element = document.getElementById(`item-${item.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.backgroundColor = '#fef3c7';
          setTimeout(() => {
            element.style.backgroundColor = '';
          }, 2000);
        }
      } else {
        alert('Item not found');
      }
    }
  };

  const handleEditItem = (item) => {
    console.log('Edit item:', item);
    // Implement edit functionality
  };

  const handleRecordSale = (item) => {
    console.log('Record sale for:', item);
    // Implement sale recording
  };

  const handlePrintLabel = (item) => {
    console.log('Print label for:', item);
    // Implement label printing
  };

//   const handleDeleteItem = (itemId) => {
//     if (confirm('Are you sure you want to delete this item?')) {
//       console.log('Delete item:', itemId);
//       // Implement delete functionality
//     }
//   };



const handleDeleteItem = async (itemId) => {
  const result = await Swal.fire({
    title: 'Delete item?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    console.log('Delete item:', itemId);
    // real delete logic
  }
};

  const handleGenerateQR = (item) => {
    console.log('Generate QR for:', item);
    // Implement QR code generation
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, SKU, or barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Stock Levels</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={handleBarcodeSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
            >
              <Scan className="h-4 w-4 mr-2" />
              Scan
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{filteredItems.length}</div>
          <div className="text-sm text-gray-500">Total Items</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600">
            {filteredItems.filter(item => item.quantity <= (item.minStock || 0)).length}
          </div>
          <div className="text-sm text-gray-500">Low Stock</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">
            {filteredItems.filter(item => item.quantity === 0).length}
          </div>
          <div className="text-sm text-gray-500">Out of Stock</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            ${filteredItems.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0).toFixed(0)}
          </div>
          <div className="text-sm text-gray-500">Total Value</div>
        </div>
      </div>

      {/* Enhanced Inventory Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Items Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU/Barcode</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const warehouse = warehouses.find(w => w.id === item.warehouse);
                  const isLowStock = item.quantity <= (item.minStock || 0);
                  const profitMargin = item.price > 0 ? (((item.price - item.cost) / item.price) * 100).toFixed(1) : 0;
                  
                  return (
                    <tr key={item.id} id={`item-${item.id}`} className={`hover:bg-gray-50 transition-colors ${isLowStock ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name || 'Unnamed Item'}</div>
                            <div className="text-sm text-gray-500">{item.description || 'No description'}</div>
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {item.category || 'Uncategorized'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-mono">{item.sku || 'N/A'}</div>
                        <div className="text-xs text-gray-500 font-mono">{item.barcode || 'N/A'}</div>
                        <button
                          onClick={() => handleGenerateQR(item)}
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <QrCode className="h-3 w-3 mr-1" />
                          Generate QR
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{warehouse?.name || 'N/A'}</div>
                        <div className="text-xs text-gray-500">Bin: {item.binLocation || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.quantity || 0}</div>
                        <div className="text-xs text-gray-500">Min: {item.minStock || 0}</div>
                        {isLowStock && (
                          <div className="text-xs text-red-600 flex items-center mt-1">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Low Stock
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Sale: ${(item.price || 0).toFixed(2)}</div>
                        <div className="text-xs text-gray-500">Cost: ${(item.cost || 0).toFixed(2)}</div>
                        <div className={`text-xs font-medium ${profitMargin > 50 ? 'text-green-600' : profitMargin > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                          Margin: {profitMargin}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit Item"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleRecordSale(item)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            title="Record Sale"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handlePrintLabel(item)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                            title="Print Label"
                          >
                            <Printer className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryView;