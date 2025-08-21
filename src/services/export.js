// ================================================================
// src/services/export.js
export const exportToCSV = (items, warehouses) => {
  const headers = [
    'SKU', 'Name', 'Category', 'Quantity', 'Price', 'Cost', 
    'Supplier', 'Min Stock', 'Warehouse', 'Bin Location', 'Barcode'
  ];
  
  const csvContent = [
    headers.join(','),
    ...items.map(item => {
      const warehouse = warehouses.find(w => w.id === item.warehouse);
      return [
        item.sku, 
        `"${item.name}"`, 
        item.category, 
        item.quantity, 
        item.price, 
        item.cost, 
        `"${item.supplier || ''}"`, 
        item.minStock,
        `"${warehouse?.name || ''}"`,
        `"${item.binLocation || ''}"`,
        item.barcode
      ].join(',');
    })
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `inventory_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};