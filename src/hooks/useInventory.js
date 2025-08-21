// // src/hooks/useInventory.js
// import { useState, useMemo, useCallback } from 'react';
// // import { sampleItems } from '../data/sampleData';
// import { generateBarcode } from '../utils/helpers';

// export const useInventory = () => {
//   const [items, setItems] = useState([]);
//   const [sales, setSales] = useState([]);

//   const addItem = useCallback((formData) => {
//     const newItem = {
//       ...formData,
//       id: Date.now(),
//       dateAdded: new Date().toISOString().split('T')[0],
//       barcode: formData.barcode || generateBarcode(formData.sku)
//     };
//     setItems(prev => [...prev, newItem]);
//   }, []);

//   const updateItem = useCallback((itemId, formData) => {
//     setItems(prev => prev.map(item => 
//       item.id === itemId ? { ...item, ...formData } : item
//     ));
//   }, []);

//   const deleteItem = useCallback((itemId) => {
//     setItems(prev => prev.filter(item => item.id !== itemId));
//     setSales(prev => prev.filter(sale => sale.itemId !== itemId));
//   }, []);

//   const recordSale = useCallback((saleData) => {
//     const newSale = {
//       ...saleData,
//       id: Date.now(),
//       date: new Date().toISOString().split('T')[0]
//     };
    
//     setSales(prev => [...prev, newSale]);
//     setItems(prev => prev.map(item => 
//       item.id === saleData.itemId 
//         ? { ...item, quantity: Math.max(0, item.quantity - saleData.quantity) }
//         : item
//     ));
//   }, []);

//   const filteredItems = useMemo(() => {
//     return (searchTerm, selectedCategory, priceFilter, stockFilter) => {
//       return items.filter(item => {
//         const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             item.barcode?.includes(searchTerm);
//         const matchesCategory = !selectedCategory || item.category === selectedCategory;
//         const matchesPrice = (!priceFilter.min || item.price >= parseFloat(priceFilter.min)) &&
//                             (!priceFilter.max || item.price <= parseFloat(priceFilter.max));
//         const matchesStock = stockFilter === 'all' || 
//                             (stockFilter === 'low' && item.quantity <= item.minStock) ||
//                             (stockFilter === 'out' && item.quantity === 0);
        
//         return matchesSearch && matchesCategory && matchesPrice && matchesStock;
//       });
//     };
//   }, [items]);

//   return {
//     items,
//     sales,
//     setItems,
//     setSales,
//     addItem,
//     updateItem,
//     deleteItem,
//     recordSale,
//     filteredItems
//   };
// };

import { useState, useEffect, useMemo } from 'react';

const useInventory = (isAuthenticated, currentUser) => {
  const [items, setItems] = useState([]);
  const [categories] = useState(['Electronics', 'Clothing', 'Food', 'Books', 'Other']);
  const [warehouses] = useState([
    { id: 1, name: 'Main Warehouse', address: '123 Main St', manager: 'John Doe', active: true },
    { id: 2, name: 'Secondary Warehouse', address: '456 Oak Ave', manager: 'Jane Smith', active: true },
  ]);
  const [vendors] = useState([
    { id: 1, name: 'TechCorp', contact: 'tech@techcorp.com', phone: '555-0101', address: '789 Tech Blvd', active: true },
    { id: 2, name: 'FashionCo', contact: 'orders@fashionco.com', phone: '555-0102', address: '321 Fashion Ave', active: true },
  ]);

  const [sales, setSales] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [salesOrders] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    if (isAuthenticated) {
      const sampleItems = [
        { 
          id: 1, name: 'Wireless Headphones', sku: 'WH001', category: 'Electronics', 
          quantity: 45, price: 79.99, cost: 35.00, description: 'Bluetooth wireless headphones',
          supplier: 'TechCorp', minStock: 10, dateAdded: '2024-08-15', warehouse: 1,
          barcode: '1234567890123', serialNumber: 'WH001-001', batchNumber: 'B001',
          binLocation: 'A1-B2-C3'
        },
        { 
          id: 2, name: 'Cotton T-Shirt', sku: 'CT002', category: 'Clothing', 
          quantity: 120, price: 19.99, cost: 8.50, description: '100% cotton t-shirt',
          supplier: 'FashionCo', minStock: 20, dateAdded: '2024-08-12', warehouse: 1,
          barcode: '2345678901234', serialNumber: 'CT002-001', batchNumber: 'B002',
          binLocation: 'B1-A2-D1'
        },
      ];
      
      const sampleSales = [
        { id: 1, itemId: 1, quantity: 2, salePrice: 79.99, date: '2024-08-19', customer: 'John Doe', salesPerson: 2, commission: 7.99 },
        { id: 2, itemId: 2, quantity: 5, salePrice: 19.99, date: '2024-08-18', customer: 'Jane Smith', salesPerson: 2, commission: 4.99 },
      ];
      
      const samplePOs = [
        { id: 1, vendor: 1, items: [{ itemId: 1, quantity: 50, unitCost: 35.00 }], status: 'pending', date: '2024-08-20', total: 1750.00 },
      ];
      
      setItems(sampleItems);
      setSales(sampleSales);
      setPurchaseOrders(samplePOs);
    }
  }, [isAuthenticated]);

  const generateBarcode = (sku) => {
    return '12345' + sku.replace(/[^0-9]/g, '').padStart(8, '0');
  };

  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: Date.now(),
      dateAdded: new Date().toISOString().split('T')[0],
      barcode: itemData.barcode || generateBarcode(itemData.sku)
    };
    setItems(prev => [...prev, newItem]);
    return newItem;
  };

  const updateItem = (itemId, itemData) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...itemData } : item
    ));
  };

  const deleteItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    setSales(prev => prev.filter(sale => sale.itemId !== itemId));
  };

  const recordSale = (itemId, saleData) => {
    const item = items.find(i => i.id === itemId);
    if (!item) throw new Error('Item not found');
    if (saleData.quantity > item.quantity) {
      throw new Error('Cannot sell more than available quantity');
    }

    const commission = currentUser?.role === 'sales' 
      ? (saleData.salePrice * saleData.quantity * (currentUser.commission / 100)) 
      : 0;

    const newSale = {
      id: Date.now(),
      itemId,
      ...saleData,
      date: new Date().toISOString().split('T')[0],
      salesPerson: currentUser?.id,
      commission
    };

    setSales(prev => [...prev, newSale]);
    setItems(prev => prev.map(i => 
      i.id === itemId 
        ? { ...i, quantity: Math.max(0, i.quantity - saleData.quantity) }
        : i
    ));

    return newSale;
  };

  const searchByBarcode = (barcode) => {
    return items.find(item => item.barcode === barcode);
  };

  const analytics = useMemo(() => {
    const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.quantity * sale.salePrice), 0);
    const totalProfit = sales.reduce((sum, sale) => {
      const item = items.find(i => i.id === sale.itemId);
      return sum + (sale.quantity * (sale.salePrice - (item?.cost || 0)));
    }, 0);
    const lowStockItems = items.filter(item => item.quantity <= item.minStock).length;
    const totalCommissions = sales.reduce((sum, sale) => sum + (sale.commission || 0), 0);
    
    return { totalValue, totalRevenue, totalProfit, lowStockItems, totalCommissions };
  }, [items, sales]);

  return useMemo(() => ({
    items,
    categories,
    warehouses,
    vendors,
    sales,
    purchaseOrders,
    salesOrders,
    analytics,
    addItem,
    updateItem,
    deleteItem,
    recordSale,
    searchByBarcode,
    generateBarcode
  }), [items, categories, warehouses, vendors, sales, purchaseOrders, salesOrders, analytics, addItem, updateItem, deleteItem, recordSale, searchByBarcode, generateBarcode]);
};

export { useInventory };