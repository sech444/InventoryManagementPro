// ================================================================
// src/components/tables/InventoryTable.js
import React from 'react';
import { 
  Package, Edit2, Trash2, ShoppingCart, Printer, QrCode, 
  AlertTriangle 
} from 'lucide-react';
import { calculateProfitMargin } from '../../utils/helpers';

const InventoryTable = ({ 
  items, 
  warehouses, 
  onEditItem, 
  onDeleteItem, 
  onRecordSale 
}) => {
  const handleGenerateQR = (item) => {
    const qrData = JSON.stringify({
      id: item.id,
      sku: item.sku,
      name: item.name,
      barcode: item.barcode
    });
    alert(`QR Code generated for ${item.name}\nData: ${qrData}\n\nIn a real app, this would generate and display/download a QR code image.`);
  };

  const handlePrintLabel = (item) => {
    const warehouse = warehouses.find(w => w.id === item.warehouse);
    const printContent = `
      ITEM LABEL
      ─────────────────
      Name: ${item.name}
      SKU: ${item.sku}
      Barcode: ${item.barcode}
      Price: ${item.price.toFixed(2)}
      Location: ${warehouse?.name || 'N/A'}
      Bin: ${item.binLocation}
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Item Label - ${item.sku}</title></head>
        <body style="font-family: monospace; padding: 20px;">
          <pre>${printContent}</pre>
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      onDeleteItem(itemId);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Details</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU/Barcode</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial/Batch</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => {
              const warehouse = warehouses.find(w => w.id === item.warehouse);
              const isLowStock = item.quantity <= item.minStock;
              const profitMargin = calculateProfitMargin(item.price, item.cost);
              
              return (
                <tr key={item.id} id={`item-${item.id}`} className={`hover:bg-gray-50 transition-colors ${isLowStock ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-mono">{item.sku}</div>
                    <div className="text-xs text-gray-500 font-mono">{item.barcode}</div>
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
                    <div className="text-xs text-gray-500">Bin: {item.binLocation}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.quantity}</div>
                    <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                    {isLowStock && (
                      <div className="text-xs text-red-600 flex items-center mt-1">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Low Stock
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Sale: ${item.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Cost: ${item.cost.toFixed(2)}</div>
                    <div className={`text-xs font-medium ${profitMargin > 50 ? 'text-green-600' : profitMargin > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                      Margin: {profitMargin}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500 font-mono">S/N: {item.serialNumber}</div>
                    <div className="text-xs text-gray-500 font-mono">Batch: {item.batchNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditItem(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => onRecordSale(item)}
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
    </div>
  );
};

export default InventoryTable;