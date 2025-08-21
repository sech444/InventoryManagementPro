// import React, { useState, useEffect, useCallback } from 'react';
// import { 
//   Package, Plus, FileText, Building2, Users, Settings,
//   Search, Edit2, Trash2, ShoppingCart, Printer, QrCode, 
//   AlertTriangle, Save, X, UserPlus, Download, TrendingUp, Receipt,
//   DollarSign, Percent, ArrowRightLeft, Database, Clock, CheckCircle,
//   AlertCircle, RefreshCw, Wifi, HardDrive
// } from 'lucide-react';

// // Mock SQL Database Service
// class SQLiteService {
//   constructor() {
//     this.db = this.initializeDB();
//     this.isConnected = true;
//   }

//   initializeDB() {
//     // Simulate SQL database with in-memory storage
//     return {
//       inventory: JSON.parse(localStorage.getItem('inventory_db') || '[]'),
//       warehouses: JSON.parse(localStorage.getItem('warehouses_db') || '[]'),
//       users: JSON.parse(localStorage.getItem('users_db') || '[]'),
//       sales: JSON.parse(localStorage.getItem('sales_db') || '[]'),
//       settings: JSON.parse(localStorage.getItem('settings_db') || '{}')
//     };
//   }

//   async query(sql, params = []) {
//     // Simulate SQL query processing
//     await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
    
//     try {
//       if (sql.includes('SELECT * FROM inventory')) {
//         return this.db.inventory;
//       } else if (sql.includes('INSERT INTO inventory')) {
//         const newItem = params[0];
//         newItem.id = Date.now();
//         newItem.created_at = new Date().toISOString();
//         newItem.updated_at = new Date().toISOString();
//         this.db.inventory.push(newItem);
//         this.persistDB();
//         return { insertId: newItem.id };
//       } else if (sql.includes('UPDATE inventory')) {
//         const [itemData, id] = params;
//         const index = this.db.inventory.findIndex(item => item.id === id);
//         if (index !== -1) {
//           this.db.inventory[index] = { ...this.db.inventory[index], ...itemData, updated_at: new Date().toISOString() };
//           this.persistDB();
//         }
//         return { affectedRows: index !== -1 ? 1 : 0 };
//       } else if (sql.includes('DELETE FROM inventory')) {
//         const id = params[0];
//         const initialLength = this.db.inventory.length;
//         this.db.inventory = this.db.inventory.filter(item => item.id !== id);
//         this.persistDB();
//         return { affectedRows: initialLength - this.db.inventory.length };
//       }
//       return [];
//     } catch (error) {
//       throw new Error(`SQL Error: ${error.message}`);
//     }
//   }

//   persistDB() {
//     localStorage.setItem('inventory_db', JSON.stringify(this.db.inventory));
//     localStorage.setItem('warehouses_db', JSON.stringify(this.db.warehouses));
//     localStorage.setItem('users_db', JSON.stringify(this.db.users));
//     localStorage.setItem('sales_db', JSON.stringify(this.db.sales));
//     localStorage.setItem('settings_db', JSON.stringify(this.db.settings));
//   }

//   async backup() {
//     return {
//       timestamp: new Date().toISOString(),
//       data: { ...this.db }
//     };
//   }

//   async restore(backupData) {
//     this.db = { ...backupData.data };
//     this.persistDB();
//   }
// }

// // Auto-save hook
// const useAutoSave = (data, saveFunction, delay = 2000) => {
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSaved, setLastSaved] = useState(null);
//   const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error'

//   const debouncedSave = useCallback(
//     (() => {
//       let timeoutId;
//       return (dataToSave) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(async () => {
//           setIsSaving(true);
//           setSaveStatus('saving');
//           try {
//             await saveFunction(dataToSave);
//             setLastSaved(new Date());
//             setSaveStatus('saved');
//           } catch (error) {
//             console.error('Auto-save failed:', error);
//             setSaveStatus('error');
//           } finally {
//             setIsSaving(false);
//           }
//         }, delay);
//       };
//     })(),
//     [saveFunction, delay]
//   );

//   useEffect(() => {
//     if (data) {
//       debouncedSave(data);
//     }
//   }, [data, debouncedSave]);

//   return { isSaving, lastSaved, saveStatus };
// };

// // Utility functions
// const generateBarcode = (sku) => {
//   return `BC${sku}${Math.random().toString().substr(2, 6)}`;
// };

// const calculateProfitMargin = (price, cost) => {
//   if (price === 0) return 0;
//   return Math.round(((price - cost) / price) * 100);
// };

// // Auto-save Status Component
// const AutoSaveStatus = ({ saveStatus, lastSaved, isSaving }) => {
//   const getStatusIcon = () => {
//     switch (saveStatus) {
//       case 'saving':
//         return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
//       case 'saved':
//         return <CheckCircle className="h-4 w-4 text-green-500" />;
//       case 'error':
//         return <AlertCircle className="h-4 w-4 text-red-500" />;
//       default:
//         return <HardDrive className="h-4 w-4 text-gray-400" />;
//     }
//   };

//   const getStatusText = () => {
//     switch (saveStatus) {
//       case 'saving':
//         return 'Saving...';
//       case 'saved':
//         return lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Saved';
//       case 'error':
//         return 'Save failed';
//       default:
//         return 'Not saved';
//     }
//   };

//   return (
//     <div className="flex items-center space-x-2 text-sm">
//       {getStatusIcon()}
//       <span className={`${
//         saveStatus === 'saving' ? 'text-blue-600' :
//         saveStatus === 'saved' ? 'text-green-600' :
//         saveStatus === 'error' ? 'text-red-600' : 'text-gray-500'
//       }`}>
//         {getStatusText()}
//       </span>
//     </div>
//   );
// };

// // Search Filters Component
// const SearchFilters = ({
//   searchTerm,
//   setSearchTerm,
//   selectedCategory,
//   setSelectedCategory,
//   stockFilter,
//   setStockFilter,
//   categories
// }) => {
//   return (
//     <div className="flex flex-wrap gap-4 items-center mb-6">
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search by name, SKU, or barcode..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </div>

//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//       >
//         <option value="">All Categories</option>
//         {categories.map(cat => (
//           <option key={cat} value={cat}>{cat}</option>
//         ))}
//       </select>

//       <select
//         value={stockFilter}
//         onChange={(e) => setStockFilter(e.target.value)}
//         className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//       >
//         <option value="all">All Stock Levels</option>
//         <option value="low">Low Stock</option>
//         <option value="out">Out of Stock</option>
//       </select>
//     </div>
//   );
// };

// // Enhanced Item Form Component
// const ItemForm = ({ item, warehouses, categories, onSave, onClose, autoSave = true }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     sku: '',
//     category: '',
//     quantity: 0,
//     price: 0,
//     cost: 0,
//     description: '',
//     supplier: '',
//     minStock: 5,
//     warehouse: '',
//     barcode: '',
//     serialNumber: '',
//     batchNumber: '',
//     binLocation: ''
//   });

//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     if (item) {
//       setFormData({ ...item });
//     }
//   }, [item]);

//   // Auto-save draft
//   const saveDraft = useCallback(async (data) => {
//     localStorage.setItem('itemFormDraft', JSON.stringify(data));
//   }, []);

//   const { saveStatus } = useAutoSave(formData, saveDraft, 1000);

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = 'Name is required';
//     if (!formData.sku.trim()) errors.sku = 'SKU is required';
//     if (!formData.category) errors.category = 'Category is required';
//     if (formData.price <= 0) errors.price = 'Price must be greater than 0';
//     if (formData.cost < 0) errors.cost = 'Cost cannot be negative';
//     if (formData.quantity < 0) errors.quantity = 'Quantity cannot be negative';
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const submitData = {
//       ...formData,
//       barcode: formData.barcode || generateBarcode(formData.sku),
//       price: parseFloat(formData.price) || 0,
//       cost: parseFloat(formData.cost) || 0,
//       quantity: parseInt(formData.quantity) || 0,
//       minStock: parseInt(formData.minStock) || 5
//     };
    
//     onSave(submitData);
//     localStorage.removeItem('itemFormDraft');
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear validation error when user starts typing
//     if (validationErrors[field]) {
//       setValidationErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const profitMargin = calculateProfitMargin(formData.price, formData.cost);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {item ? 'Edit Item' : 'Add New Item'}
//               </h2>
//               {autoSave && (
//                 <AutoSaveStatus 
//                   saveStatus={saveStatus} 
//                   lastSaved={null} 
//                   isSaving={saveStatus === 'saving'} 
//                 />
//               )}
//             </div>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <X className="h-6 w-6" />
//             </button>
//           </div>
          
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-6">
//               {/* Basic Information */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => handleInputChange('name', e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                         validationErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                     {validationErrors.name && (
//                       <p className="text-xs text-red-600 mt-1">{validationErrors.name}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
//                     <input
//                       type="text"
//                       value={formData.sku}
//                       onChange={(e) => handleInputChange('sku', e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                         validationErrors.sku ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                     {validationErrors.sku && (
//                       <p className="text-xs text-red-600 mt-1">{validationErrors.sku}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => handleInputChange('category', e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                         validationErrors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     {validationErrors.category && (
//                       <p className="text-xs text-red-600 mt-1">{validationErrors.category}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
//                     <input
//                       type="text"
//                       value={formData.barcode}
//                       onChange={(e) => handleInputChange('barcode', e.target.value)}
//                       placeholder="Auto-generated if empty"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => handleInputChange('description', e.target.value)}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   />
//                 </div>
//               </div>

//               {/* Inventory Details */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Inventory Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
//                     <input
//                       type="number"
//                       value={formData.quantity}
//                       onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
//                       min="0"
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                         validationErrors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                     {validationErrors.quantity && (
//                       <p className="text-xs text-red-600 mt-1">{validationErrors.quantity}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock</label>
//                     <input
//                       type="number"
//                       value={formData.minStock}
//                       onChange={(e) => handleInputChange('minStock', parseInt(e.target.value) || 0)}
//                       min="0"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
//                     <select
//                       value={formData.warehouse}
//                       onChange={(e) => handleInputChange('warehouse', parseInt(e.target.value) || '')}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     >
//                       <option value="">Select Warehouse</option>
//                       {warehouses.map(wh => (
//                         <option key={wh.id} value={wh.id}>{wh.name}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Bin Location</label>
//                     <input
//                       type="text"
//                       value={formData.binLocation}
//                       onChange={(e) => handleInputChange('binLocation', e.target.value)}
//                       placeholder="e.g., A1-B2-C3"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
//                     <input
//                       type="text"
//                       value={formData.serialNumber}
//                       onChange={(e) => handleInputChange('serialNumber', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
//                     <input
//                       type="text"
//                       value={formData.batchNumber}
//                       onChange={(e) => handleInputChange('batchNumber', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Pricing */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Pricing</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($) *</label>
//                     <input
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
//                       min="0"
//                       step="0.01"
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                         validationErrors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                     {validationErrors.price && (
//                       <p className="text-xs text-red-600 mt-1">{validationErrors.price}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($) *</label>
//                     <input
//                       type="number"
//                       value={formData.cost}
//                       onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
//                       min="0"
//                       step="0.01"
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                         validationErrors.cost ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                     {validationErrors.cost && (
//                       <p className="text-xs text-red-600 mt-1">{validationErrors.cost}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
//                     <input
//                       type="text"
//                       value={formData.supplier}
//                       onChange={(e) => handleInputChange('supplier', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-md">
//                       <div className="flex justify-between">
//                         <span>Profit Margin:</span>
//                         <span className={`font-medium ${profitMargin > 50 ? 'text-green-600' : profitMargin > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
//                           {profitMargin}%
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Profit per Unit:</span>
//                         <span className="font-medium">${(formData.price - formData.cost).toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//                 >
//                   <Save className="h-4 w-4 mr-2" />
//                   {item ? 'Update' : 'Add'} Item
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Settings Component
// const SettingsPanel = ({ settings, onUpdateSettings, dbService }) => {
//   const [localSettings, setLocalSettings] = useState(settings);
//   const [activeTab, setActiveTab] = useState('general');
//   const [backupStatus, setBackupStatus] = useState('');

//   const handleSettingChange = (key, value) => {
//     const newSettings = { ...localSettings, [key]: value };
//     setLocalSettings(newSettings);
//     onUpdateSettings(newSettings);
//   };

//   const handleBackup = async () => {
//     setBackupStatus('creating');
//     try {
//       const backup = await dbService.backup();
//       const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `inventory_backup_${new Date().toISOString().split('T')[0]}.json`;
//       link.click();
//       URL.revokeObjectURL(url);
//       setBackupStatus('success');
//       setTimeout(() => setBackupStatus(''), 3000);
//     } catch (error) {
//       setBackupStatus('error');
//       setTimeout(() => setBackupStatus(''), 3000);
//     }
//   };

//   const handleRestore = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       try {
//         const backup = JSON.parse(e.target.result);
//         await dbService.restore(backup);
//         alert('Database restored successfully! Please refresh the page.');
//       } catch (error) {
//         alert('Failed to restore backup: Invalid file format');
//       }
//     };
//     reader.readAsText(file);
//   };

//   const tabs = [
//     { id: 'general', label: 'General', icon: Settings },
//     { id: 'inventory', label: 'Inventory', icon: Package },
//     { id: 'database', label: 'Database', icon: Database },
//     { id: 'notifications', label: 'Notifications', icon: AlertCircle }
//   ];

//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-semibold text-gray-800">System Settings</h3>
      
//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <nav className="-mb-px flex space-x-8">
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? 'border-green-500 text-green-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <tab.icon className="h-4 w-4 mr-2" />
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* General Settings */}
//       {activeTab === 'general' && (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
//           <div>
//             <h4 className="text-md font-semibold text-gray-800 mb-4">Company Information</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//                 <input
//                   type="text"
//                   value={localSettings.companyName || ''}
//                   onChange={(e) => handleSettingChange('companyName', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
//                 <select
//                   value={localSettings.currency || 'USD'}
//                   onChange={(e) => handleSettingChange('currency', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="USD">USD ($)</option>
//                   <option value="EUR">EUR (€)</option>
//                   <option value="GBP">GBP (£)</option>
//                   <option value="CAD">CAD (C$)</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-md font-semibold text-gray-800 mb-4">User Interface</h4>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Dark Mode</label>
//                   <p className="text-xs text-gray-500">Switch to dark theme</p>
//                 </div>
//                 <input
//                   type="checkbox"
//                   checked={localSettings.darkMode || false}
//                   onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Compact View</label>
//                   <p className="text-xs text-gray-500">Show more items per page</p>
//                 </div>
//                 <input
//                   type="checkbox"
//                   checked={localSettings.compactView || false}
//                   onChange={(e) => handleSettingChange('compactView', e.target.checked)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Inventory Settings */}
//       {activeTab === 'inventory' && (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
//           <div>
//             <h4 className="text-md font-semibold text-gray-800 mb-4">Stock Management</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Default Min Stock Level</label>
//                 <input
//                   type="number"
//                   value={localSettings.defaultMinStock || 5}
//                   onChange={(e) => handleSettingChange('defaultMinStock', parseInt(e.target.value) || 5)}
//                   min="0"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold (%)</label>
//                 <input
//                   type="number"
//                   value={localSettings.lowStockThreshold || 20}
//                   onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value) || 20)}
//                   min="0"
//                   max="100"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-md font-semibold text-gray-800 mb-4">Auto-Save Settings</h4>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Enable Auto-Save</label>
//                   <p className="text-xs text-gray-500">Automatically save changes as you type</p>
//                 </div>
//                 <input
//                   type="checkbox"
//                   checked={localSettings.autoSave !== false}
//                   onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Save Interval (seconds)</label>
//                 <select
//                   value={localSettings.autoSaveInterval || 2}
//                   onChange={(e) => handleSettingChange('autoSaveInterval', parseInt(e.target.value))}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="1">1 second</option>
//                   <option value="2">2 seconds</option>
//                   <option value="5">5 seconds</option>
//                   <option value="10">10 seconds</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Database Settings */}
//       {activeTab === 'database' && (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
//           <div>
//             <h4 className="text-md font-semibold text-gray-800 mb-4">Database Management</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <div className="flex items-center mb-2">
//                   <Wifi className="h-5 w-5 text-green-500 mr-2" />
//                   <span className="text-sm font-medium text-green-700">Connection Status</span>
//                 </div>
//                 <p className="text-sm text-green-600">Connected</p>
//               </div>
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <div className="flex items-center mb-2">
//                   <Database className="h-5 w-5 text-blue-500 mr-2" />
//                   <span className="text-sm font-medium text-blue-700">Database Size</span>
//                 </div>
//                 <p className="text-sm text-blue-600">2.4 MB</p>
//               </div>
//               <div className="bg-purple-50 p-4 rounded-lg">
//                 <div className="flex items-center mb-2">
//                   <Clock className="h-5 w-5 text-purple-500 mr-2" />
//                   <span className="text-sm font-medium text-purple-700">Last Backup</span>
//                 </div>
//                 <p className="text-sm text-purple-600">2 hours ago</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <h5 className="text-sm font-semibold text-gray-700 mb-2">Backup & Restore</h5>
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={handleBackup}
//                     disabled={backupStatus === 'creating'}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     {backupStatus === 'creating' ? 'Creating...' : 'Create Backup'}
//                   </button>
//                   <label className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer flex items-center">
//                     <input
//                       type="file"
//                       accept=".json"
//                       onChange={handleRestore}
//                       className="hidden"
//                     />
//                     <Database className="h-4 w-4 mr-2" />
//                     Restore Backup
//                   </label>
//                 </div>
//                 {backupStatus && (
//                   <p className={`text-xs mt-2 ${
//                     backupStatus === 'success' ? 'text-green-600' : 
//                     backupStatus === 'error' ? 'text-red-600' : 'text-blue-600'
//                   }`}>
//                     {backupStatus === 'creating' && 'Creating backup...'}
//                     {backupStatus === 'success' && 'Backup created successfully!'}
//                     {backupStatus === 'error' && 'Failed to create backup'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <h5 className="text-sm font-semibold text-gray-700 mb-2">Auto Backup</h5>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <label className="text-sm font-medium text-gray-700">Enable Daily Auto Backup</label>
//                     <p className="text-xs text-gray-500">Automatically backup database daily</p>
//                   </div>
//                   <input
//                     type="checkbox"
//                     checked={localSettings.autoBackup || false}
//                     onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
//                     className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notifications Settings */}
//       {activeTab === 'notifications' && (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
//           <div>
//             <h4 className="text-md font-semibold text-gray-800 mb-4">Notification Preferences</h4>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Low Stock Alerts</label>
//                   <p className="text-xs text-gray-500">Get notified when items are running low</p>
//                 </div>
//                 <input
//                   type="checkbox"
//                   checked={localSettings.lowStockAlerts !== false}
//                   onChange={(e) => handleSettingChange('lowStockAlerts', e.target.checked)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Sale Notifications</label>
//                   <p className="text-xs text-gray-500">Get notified when sales are recorded</p>
//                 </div>
//                 <input
//                   type="checkbox"
//                   checked={localSettings.saleNotifications || false}
//                   onChange={(e) => handleSettingChange('saleNotifications', e.target.checked)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Email Reports</label>
//                   <p className="text-xs text-gray-500">Receive daily/weekly reports via email</p>
//                 </div>
//                 <input
//                   type="checkbox"
//                   checked={localSettings.emailReports || false}
//                   onChange={(e) => handleSettingChange('emailReports', e.target.checked)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Enhanced Inventory Table
// const InventoryTable = ({ 
//   items, 
//   warehouses, 
//   onEditItem, 
//   onDeleteItem, 
//   onRecordSale,
//   settings 
// }) => {
//   const handleGenerateQR = (item) => {
//     const qrData = JSON.stringify({
//       id: item.id,
//       sku: item.sku,
//       name: item.name,
//       barcode: item.barcode
//     });
//     alert(`QR Code generated for ${item.name}\nData: ${qrData}\n\nIn a real app, this would generate and display/download a QR code image.`);
//   };

//   const handlePrintLabel = (item) => {
//     const warehouse = warehouses.find(w => w.id === item.warehouse);
//     const printContent = `
//       ITEM LABEL
//       ─────────────────
//       Name: ${item.name}
//       SKU: ${item.sku}
//       Barcode: ${item.barcode}
//       Price: ${settings.currency || '$'}${item.price.toFixed(2)}
//       Location: ${warehouse?.name || 'N/A'}
//       Bin: ${item.binLocation}
//     `;
    
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head><title>Item Label - ${item.sku}</title></head>
//         <body style="font-family: monospace; padding: 20px;">
//           <pre>${printContent}</pre>
//           <script>window.print(); window.close();</script>
//         </body>
//       </html>
//     `);
//   };

//   const handleDeleteItem = (itemId) => {
//     if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
//       onDeleteItem(itemId);
//     }
//   };

//   return (
//     <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Details</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU/Barcode</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial/Batch</th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {items.map((item) => {
//               const warehouse = warehouses.find(w => w.id === item.warehouse);
//               const isLowStock = item.quantity <= item.minStock;
//               const profitMargin = calculateProfitMargin(item.price, item.cost);
              
//               return (
//                 <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${isLowStock ? 'bg-red-50' : ''} ${settings.compactView ? 'text-sm' : ''}`}>
//                   <td className="px-6 py-4">
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                         <Package className="h-6 w-6 text-gray-400" />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                         <div className="text-sm text-gray-500">{item.description}</div>
//                         <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
//                           {item.category}
//                         </span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900 font-mono">{item.sku}</div>
//                     <div className="text-xs text-gray-500 font-mono">{item.barcode}</div>
//                     <button
//                       onClick={() => handleGenerateQR(item)}
//                       className="text-xs text-blue-600 hover:text-blue-800 flex items-center mt-1"
//                     >
//                       <QrCode className="h-3 w-3 mr-1" />
//                       Generate QR
//                     </button>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900">{warehouse?.name || 'N/A'}</div>
//                     <div className="text-xs text-gray-500">Bin: {item.binLocation}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-medium text-gray-900">{item.quantity}</div>
//                     <div className="text-xs text-gray-500">Min: {item.minStock}</div>
//                     {isLowStock && (
//                       <div className="text-xs text-red-600 flex items-center mt-1">
//                         <AlertTriangle className="h-3 w-3 mr-1" />
//                         Low Stock
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900">Sale: {settings.currency || '$'}{item.price.toFixed(2)}</div>
//                     <div className="text-xs text-gray-500">Cost: {settings.currency || '$'}{item.cost.toFixed(2)}</div>
//                     <div className={`text-xs font-medium ${profitMargin > 50 ? 'text-green-600' : profitMargin > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
//                       Margin: {profitMargin}%
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-xs text-gray-500 font-mono">S/N: {item.serialNumber}</div>
//                     <div className="text-xs text-gray-500 font-mono">Batch: {item.batchNumber}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-1">
//                       <button
//                         onClick={() => onEditItem(item)}
//                         className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                         title="Edit Item"
//                       >
//                         <Edit2 className="h-4 w-4" />
//                       </button>
//                       <button 
//                         onClick={() => onRecordSale(item)}
//                         className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
//                         title="Record Sale"
//                       >
//                         <ShoppingCart className="h-4 w-4" />
//                       </button>
//                       <button 
//                         onClick={() => handlePrintLabel(item)}
//                         className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
//                         title="Print Label"
//                       >
//                         <Printer className="h-4 w-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteItem(item.id)}
//                         className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                         title="Delete Item"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Sale Recording Modal
// const SaleModal = ({ item, onClose, onConfirmSale, settings }) => {
//   const [saleData, setSaleData] = useState({
//     quantity: 1,
//     price: item?.price || 0,
//     customer: '',
//     notes: ''
//   });

//   const handleConfirm = () => {
//     if (saleData.quantity > item.quantity) {
//       alert('Cannot sell more than available stock');
//       return;
//     }
//     onConfirmSale(item.id, saleData);
//     onClose();
//   };

//   if (!item) return null;

//   const totalValue = saleData.quantity * saleData.price;
//   const profit = saleData.quantity * (saleData.price - item.cost);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">Record Sale</h3>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <X className="h-6 w-6" />
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h4 className="font-medium text-gray-900">{item.name}</h4>
//               <p className="text-sm text-gray-500">SKU: {item.sku}</p>
//               <p className="text-sm text-gray-500">Available: {item.quantity} units</p>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Sell</label>
//               <input
//                 type="number"
//                 value={saleData.quantity}
//                 onChange={(e) => setSaleData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
//                 min="1"
//                 max={item.quantity}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
//               <input
//                 type="number"
//                 value={saleData.price}
//                 onChange={(e) => setSaleData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
//                 min="0"
//                 step="0.01"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Customer (Optional)</label>
//               <input
//                 type="text"
//                 value={saleData.customer}
//                 onChange={(e) => setSaleData(prev => ({ ...prev, customer: e.target.value }))}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
            
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <div className="flex justify-between text-sm">
//                 <span>Total Value:</span>
//                 <span className="font-medium">{settings.currency || '$'}{totalValue.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span>Profit:</span>
//                 <span className={`font-medium ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                   {settings.currency || '$'}{profit.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex space-x-3 mt-6">
//             <button
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleConfirm}
//               className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//             >
//               Confirm Sale
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Inventory Management System
// const InventoryManagementSystem = () => {
//   const [activeView, setActiveView] = useState('inventory');
//   const [showItemForm, setShowItemForm] = useState(false);
//   const [showSaleModal, setShowSaleModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [saleItem, setSaleItem] = useState(null);
  
//   // Database service
//   const [dbService] = useState(() => new SQLiteService());
  
//   // Settings
//   const [settings, setSettings] = useState({
//     companyName: 'My Company',
//     currency: '$',
//     darkMode: false,
//     compactView: false,
//     autoSave: true,
//     autoSaveInterval: 2,
//     defaultMinStock: 5,
//     lowStockThreshold: 20,
//     lowStockAlerts: true,
//     saleNotifications: false,
//     emailReports: false,
//     autoBackup: false
//   });

//   // Search and filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [stockFilter, setStockFilter] = useState('all');
  
//   // Data states
//   const [inventory, setInventory] = useState({
//     items: [
//       {
//         id: 1,
//         name: 'Wireless Bluetooth Headphones',
//         sku: 'WBH-001',
//         category: 'Electronics',
//         quantity: 25,
//         price: 79.99,
//         cost: 45.00,
//         description: 'High-quality wireless headphones with noise cancellation',
//         supplier: 'TechCorp',
//         minStock: 10,
//         warehouse: 1,
//         barcode: 'BCWBH-001847362',
//         serialNumber: 'SN2024001',
//         batchNumber: 'BT240815',
//         binLocation: 'A1-B2-C3'
//       },
//       {
//         id: 2,
//         name: 'Cotton T-Shirt',
//         sku: 'CTS-002',
//         category: 'Clothing',
//         quantity: 3,
//         price: 24.99,
//         cost: 12.00,
//         description: '100% organic cotton t-shirt',
//         supplier: 'FashionCo',
//         minStock: 15,
//         warehouse: 2,
//         barcode: 'BCCTS-002947583',
//         serialNumber: '',
//         batchNumber: 'BT240810',
//         binLocation: 'B2-A1-D4'
//       }
//     ]
//   });

//   const [warehouses] = useState([
//     { id: 1, name: 'Main Warehouse', address: '123 Storage St', manager: 'John Smith' },
//     { id: 2, name: 'Retail Store', address: '456 Shop Ave', manager: 'Jane Doe' }
//   ]);

//   const [auth] = useState({
//     users: [
//       { id: 1, name: 'Admin User', email: 'admin@company.com', role: 'admin', commission: 5, active: true },
//       { id: 2, name: 'Sales Rep', email: 'sales@company.com', role: 'user', commission: 3, active: true }
//     ]
//   });

//   const currentUser = auth.users[0];

//   // Auto-save inventory data
//   const saveInventoryData = useCallback(async (data) => {
//     await dbService.query('UPDATE inventory SET data = ?', [JSON.stringify(data)]);
//   }, [dbService]);

//   const { isSaving, lastSaved, saveStatus } = useAutoSave(
//     inventory, 
//     saveInventoryData, 
//     (settings.autoSaveInterval || 2) * 1000
//   );

//   // Load draft on mount
//   useEffect(() => {
//     const draft = localStorage.getItem('itemFormDraft');
//     if (draft && !selectedItem) {
//       // Could restore draft here if needed
//     }
//   }, [selectedItem]);

//   const categories = [...new Set(inventory.items.map(item => item.category))];

//   // Filter items
//   const filteredItems = inventory.items.filter(item => {
//     const matchesSearch = !searchTerm || 
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
//     const matchesStock = stockFilter === 'all' || 
//       (stockFilter === 'low' && item.quantity <= item.minStock) ||
//       (stockFilter === 'out' && item.quantity === 0);

//     return matchesSearch && matchesCategory && matchesStock;
//   });

//   const handleAddItem = async (itemData) => {
//     try {
//       const result = await dbService.query(
//         'INSERT INTO inventory (name, sku, category, quantity, price, cost, description, supplier, minStock, warehouse, barcode, serialNumber, batchNumber, binLocation) VALUES (?)',
//         [itemData]
//       );
      
//       const newItem = { ...itemData, id: result.insertId };
//       setInventory(prev => ({
//         ...prev,
//         items: [...prev.items, newItem]
//       }));
      
//       setShowItemForm(false);
//       setSelectedItem(null);
      
//       if (settings.saleNotifications) {
//         alert(`Item "${itemData.name}" added successfully!`);
//       }
//     } catch (error) {
//       alert('Failed to add item: ' + error.message);
//     }
//   };

//   const handleEditItem = async (itemData) => {
//     try {
//       await dbService.query(
//         'UPDATE inventory SET ? WHERE id = ?',
//         [itemData, selectedItem.id]
//       );
      
//       setInventory(prev => ({
//         ...prev,
//         items: prev.items.map(item => 
//           item.id === selectedItem.id ? { ...itemData, id: selectedItem.id } : item
//         )
//       }));
      
//       setShowItemForm(false);
//       setSelectedItem(null);
//     } catch (error) {
//       alert('Failed to update item: ' + error.message);
//     }
//   };

//   const handleDeleteItem = async (itemId) => {
//     try {
//       await dbService.query('DELETE FROM inventory WHERE id = ?', [itemId]);
//       setInventory(prev => ({
//         ...prev,
//         items: prev.items.filter(item => item.id !== itemId)
//       }));
//     } catch (error) {
//       alert('Failed to delete item: ' + error.message);
//     }
//   };

//   const handleConfirmSale = async (itemId, saleData) => {
//     const item = inventory.items.find(i => i.id === itemId);
//     if (!item) return;

//     try {
//       const newQuantity = item.quantity - saleData.quantity;
//       await dbService.query(
//         'UPDATE inventory SET quantity = ? WHERE id = ?',
//         [newQuantity, itemId]
//       );

//       // Record sale in sales table
//       await dbService.query(
//         'INSERT INTO sales (item_id, quantity, price, customer, total, profit, date) VALUES (?)',
//         [{
//           item_id: itemId,
//           quantity: saleData.quantity,
//           price: saleData.price,
//           customer: saleData.customer,
//           total: saleData.quantity * saleData.price,
//           profit: saleData.quantity * (saleData.price - item.cost),
//           date: new Date().toISOString()
//         }]
//       );

//       setInventory(prev => ({
//         ...prev,
//         items: prev.items.map(i => 
//           i.id === itemId ? { ...i, quantity: newQuantity } : i
//         )
//       }));

//       if (settings.saleNotifications) {
//         alert(`Sale recorded: ${saleData.quantity} x ${item.name} for ${settings.currency}${(saleData.quantity * saleData.price).toFixed(2)}`);
//       }
//     } catch (error) {
//       alert('Failed to record sale: ' + error.message);
//     }
//   };

//   const exportToCSV = () => {
//     const headers = [
//       'SKU', 'Name', 'Category', 'Quantity', 'Price', 'Cost', 
//       'Supplier', 'Min Stock', 'Warehouse', 'Bin Location', 'Barcode'
//     ];
    
//     const csvContent = [
//       headers.join(','),
//       ...filteredItems.map(item => {
//         const warehouse = warehouses.find(w => w.id === item.warehouse);
//         return [
//           item.sku, 
//           `"${item.name}"`, 
//           item.category, 
//           item.quantity, 
//           item.price, 
//           item.cost, 
//           `"${item.supplier || ''}"`, 
//           item.minStock,
//           `"${warehouse?.name || ''}"`,
//           `"${item.binLocation || ''}"`,
//           item.barcode
//         ].join(',');
//       })
//     ].join('\n');
    
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `inventory_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const handleRecordSale = (item) => {
//     setSaleItem(item);
//     setShowSaleModal(true);
//   };

//   // Navigation items
//   const navigationItems = [
//     { id: 'inventory', label: 'Inventory', icon: Package },
//     { id: 'purchase-orders', label: 'Purchase Orders', icon: FileText },
//     { id: 'warehouses', label: 'Warehouses', icon: Building2 },
//     { id: 'reports', label: 'Reports', icon: TrendingUp },
//     { id: 'users', label: 'Users', icon: Users },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   // Dashboard stats
//   const totalItems = inventory.items.length;
//   const totalValue = inventory.items.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
//   const lowStockItems = inventory.items.filter(item => item.quantity <= item.minStock).length;
//   const outOfStockItems = inventory.items.filter(item => item.quantity === 0).length;

//   return (
//     <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
//       {/* Header */}
//       <div className={`${settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-4">
//               <Package className={`h-8 w-8 ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`} />
//               <div>
//                 <h1 className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {settings.companyName} - Inventory Management
//                 </h1>
//                 <div className="flex items-center space-x-4 text-xs">
//                   <AutoSaveStatus saveStatus={saveStatus} lastSaved={lastSaved} isSaving={isSaving} />
//                   <div className="flex items-center space-x-1">
//                     <Database className="h-3 w-3 text-green-500" />
//                     <span className={settings.darkMode ? 'text-gray-300' : 'text-gray-600'}>SQL Connected</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 Welcome, {currentUser.name}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex space-x-8">
//           {/* Sidebar Navigation */}
//           <div className="w-64 flex-shrink-0">
//             <nav className="space-y-2">
//               {navigationItems.map(item => (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveView(item.id)}
//                   className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
//                     activeView === item.id
//                       ? `${settings.darkMode ? 'bg-green-700 text-white' : 'bg-green-600 text-white'}`
//                       : `${settings.darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
//                   }`}
//                 >
//                   <item.icon className="h-5 w-5 mr-3" />
//                   {item.label}
//                 </button>
//               ))}
//             </nav>

//             {/* Stats Sidebar */}
//             <div className={`mt-8 ${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-sm border ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//               <h3 className={`text-sm font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Quick Stats</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Items</span>
//                   <span className={`text-sm font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{totalItems}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</span>
//                   <span className={`text-sm font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{settings.currency}{totalValue.toFixed(0)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Low Stock</span>
//                   <span className={`text-sm font-medium ${lowStockItems > 0 ? 'text-red-600' : (settings.darkMode ? 'text-white' : 'text-gray-900')}`}>{lowStockItems}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Out of Stock</span>
//                   <span className={`text-sm font-medium ${outOfStockItems > 0 ? 'text-red-600' : (settings.darkMode ? 'text-white' : 'text-gray-900')}`}>{outOfStockItems}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Inventory View */}
//             {activeView === 'inventory' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h2 className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Inventory Management</h2>
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={exportToCSV}
//                       className={`px-4 py-2 ${settings.darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg flex items-center`}
//                     >
//                       <Download className="h-4 w-4 mr-2" />
//                       Export CSV
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedItem(null);
//                         setShowItemForm(true);
//                       }}
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
//                     >
//                       <Plus className="h-4 w-4 mr-2" />
//                       Add Item
//                     </button>
//                   </div>
//                 </div>

//                 <SearchFilters
//                   searchTerm={searchTerm}
//                   setSearchTerm={setSearchTerm}
//                   selectedCategory={selectedCategory}
//                   setSelectedCategory={setSelectedCategory}
//                   stockFilter={stockFilter}
//                   setStockFilter={setStockFilter}
//                   categories={categories}
//                 />

//                 <InventoryTable
//                   items={filteredItems}
//                   warehouses={warehouses}
//                   onEditItem={(item) => {
//                     setSelectedItem(item);
//                     setShowItemForm(true);
//                   }}
//                   onDeleteItem={handleDeleteItem}
//                   onRecordSale={handleRecordSale}
//                   settings={settings}
//                 />
//               </div>
//             )}

//             {/* Settings View */}
//             {activeView === 'settings' && (
//               <SettingsPanel
//                 settings={settings}
//                 onUpdateSettings={setSettings}
//                 dbService={dbService}
//               />
//             )}

//             {/* Purchase Orders View */}
//             {activeView === 'purchase-orders' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Purchase Orders</h3>
//                   <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
//                     <Plus className="h-4 w-4 mr-2" />
//                     Create Purchase Order
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                   <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     <div className="text-2xl font-bold text-blue-600">12</div>
//                     <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total POs</div>
//                   </div>
//                   <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     <div className="text-2xl font-bold text-yellow-600">3</div>
//                     <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pending</div>
//                   </div>
//                   <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     <div className="text-2xl font-bold text-green-600">8</div>
//                     <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Received</div>
//                   </div>
//                   <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     <div className="text-2xl font-bold text-red-600">1</div>
//                     <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Overdue</div>
//                   </div>
//                 </div>

//                 <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm rounded-xl border ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
//                   <div className="p-6 text-center">
//                     <FileText className={`h-12 w-12 ${settings.darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
//                     <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Purchase Orders functionality coming soon...</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Warehouses View */}
//             {activeView === 'warehouses' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Warehouse Management</h3>
//                   <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Warehouse
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {warehouses.map(warehouse => {
//                     const warehouseItems = inventory.items.filter(item => item.warehouse === warehouse.id);
//                     const warehouseValue = warehouseItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
                    
//                     return (
//                       <div key={warehouse.id} className={`${settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-sm border`}>
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <h4 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{warehouse.name}</h4>
//                             <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{warehouse.address}</p>
//                             <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manager: {warehouse.manager}</p>
//                           </div>
//                           <Building2 className="h-8 w-8 text-green-500" />
//                         </div>
                        
//                         <div className="mt-4 grid grid-cols-2 gap-4">
//                           <div>
//                             <div className="text-2xl font-bold text-blue-600">{warehouseItems.length}</div>
//                             <div className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Items</div>
//                           </div>
//                           <div>
//                             <div className="text-2xl font-bold text-green-600">{settings.currency}{warehouseValue.toFixed(0)}</div>
//                             <div className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Value</div>
//                           </div>
//                         </div>
                        
//                         <div className="mt-4 flex space-x-2">
//                           <button className={`flex-1 px-3 py-2 text-sm ${settings.darkMode ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-md`}>
//                             View Details
//                           </button>
//                           <button className={`px-3 py-2 text-sm ${settings.darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'} rounded-md`}>
//                             <ArrowRightLeft className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Reports View */}
//             {activeView === 'reports' && (
//               <div className="space-y-6">
//                 <h3 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Reports & Analytics</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[
//                     { title: 'Inventory Report', icon: Package, description: 'Current stock levels and valuation' },
//                     { title: 'Sales Report', icon: TrendingUp, description: 'Sales performance and trends' },
//                     { title: 'Purchase Report', icon: Receipt, description: 'Purchase orders and vendor analysis' },
//                     { title: 'Low Stock Report', icon: AlertTriangle, description: 'Items below minimum stock level' },
//                     { title: 'Profit Analysis', icon: DollarSign, description: 'Profit margins by item and category' },
//                     { title: 'Commission Report', icon: Percent, description: 'Sales commission tracking' },
//                   ].map((report, index) => (
//                     <div key={index} className={`${settings.darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:shadow-md'} p-6 rounded-xl shadow-sm border transition-shadow cursor-pointer`}>
//                       <div className="flex items-center mb-4">
//                         <div className="p-3 bg-green-100 rounded-lg">
//                           <report.icon className="h-6 w-6 text-green-600" />
//                         </div>
//                         <div className="ml-4">
//                           <h4 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{report.title}</h4>
//                         </div>
//                       </div>
//                       <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{report.description}</p>
//                       <div className="flex space-x-2">
//                         <button className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
//                           Generate
//                         </button>
//                         <button className={`px-3 py-2 text-sm ${settings.darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} rounded-md`}>
//                           <Download className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Users View */}
//             {activeView === 'users' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>User Management</h3>
//                   <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
//                     <UserPlus className="h-4 w-4 mr-2" />
//                     Add User
//                   </button>
//                 </div>

//                 <div className={`${settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border overflow-hidden`}>
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className={settings.darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
//                       <tr>
//                         <th className={`px-6 py-3 text-left text-xs font-medium ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>User</th>
//                         <th className={`px-6 py-3 text-left text-xs font-medium ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Role</th>
//                         <th className={`px-6 py-3 text-left text-xs font-medium ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Commission</th>
//                         <th className={`px-6 py-3 text-left text-xs font-medium ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Status</th>
//                         <th className={`px-6 py-3 text-left text-xs font-medium ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className={`divide-y ${settings.darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
//                       {auth.users.map(user => (
//                         <tr key={user.id} className={settings.darkMode ? 'bg-gray-800' : 'bg-white'}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div>
//                               <div className={`text-sm font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
//                               <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                               user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
//                             }`}>
//                               {user.role}
//                             </span>
//                           </td>
//                           <td className={`px-6 py-4 whitespace-nowrap text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
//                             {user.commission}%
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                               user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                             }`}>
//                               {user.active ? 'Active' : 'Inactive'}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <div className="flex space-x-2">
//                               <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
//                               <button className={`${user.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}>
//                                 {user.active ? 'Deactivate' : 'Activate'}
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {showItemForm && (
//         <ItemForm
//           item={selectedItem}
//           warehouses={warehouses}
//           categories={categories}
//           onSave={selectedItem ? handleEditItem : handleAddItem}
//           onClose={() => {
//             setShowItemForm(false);
//             setSelectedItem(null);
//           }}
//           autoSave={settings.autoSave}
//         />
//       )}

//       {showSaleModal && (
//         <SaleModal
//           item={saleItem}
//           onClose={() => {
//             setShowSaleModal(false);
//             setSaleItem(null);
//           }}
//           onConfirmSale={handleConfirmSale}
//           settings={settings}
//         />
//       )}
//     </div>
//   );
// };

// export default InventoryManagementSystem;


// ================================================================
// 6. MAIN APP STRUCTURE
// ================================================================

// // src/App.js - Cleaned up version with modular structure
// import React from 'react';
// import Layout from './components/layout/Layout';
// import LoginForm from './components/forms/LoginForm';
// import { useAuth } from './hooks/useAuth';
// import { useInventory } from './hooks/useInventory';

// const App = () => {
//   const auth = useAuth();
//   const inventory = useInventory();
//   const [currentView, setCurrentView] = React.useState('dashboard');

//   if (!auth.isAuthenticated) {
//     return <LoginForm onLogin={auth.login} />;
//   }

//   return (
//     <Layout
//       currentUser={auth.currentUser}
//       currentView={currentView}
//       onViewChange={setCurrentView}
//       onLogout={auth.logout}
//       inventory={inventory}
//       auth={auth}
//     />
//   );
// };

// export default App;



import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Search, Filter, Download, Edit2, Trash2, 
  Package, DollarSign, TrendingUp, AlertTriangle,
  BarChart3, ShoppingCart, Eye, Save, X, Users,
  MapPin, Truck, FileText, Settings, Bell, Menu,
  LogOut, Key, UserPlus, Percent, Printer, Scan,
  Building2, Package2, ClipboardList, Receipt,
  CreditCard, ArrowRightLeft, Boxes, QrCode,
  Mail, Webhook, PieChart, FileBarChart, Crown
} from 'lucide-react';

const InventoryManagementPro = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator', email: 'admin@company.com', commission: 0, active: true },
    { id: 2, username: 'sales1', password: 'sales123', role: 'sales', name: 'John Sales', email: 'john@company.com', commission: 5, active: true },
  ]);

  // Core State Management
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['Electronics', 'Clothing', 'Food', 'Books', 'Other']);
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'Main Warehouse', address: '123 Main St', manager: 'John Doe', active: true },
    { id: 2, name: 'Secondary Warehouse', address: '456 Oak Ave', manager: 'Jane Smith', active: true },
  ]);
  const [vendors, setVendors] = useState([
    { id: 1, name: 'TechCorp', contact: 'tech@techcorp.com', phone: '555-0101', address: '789 Tech Blvd', active: true },
    { id: 2, name: 'FashionCo', contact: 'orders@fashionco.com', phone: '555-0102', address: '321 Fashion Ave', active: true },
  ]);

  // Orders and Sales
  const [sales, setSales] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [stockFilter, setStockFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);

  // Login credentials
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Form state
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', quantity: 0, price: 0, cost: 0,
    description: '', supplier: '', minStock: 5, warehouse: '', barcode: '',
    serialNumber: '', batchNumber: '', binLocation: ''
  });

  const [userFormData, setUserFormData] = useState({
    username: '', password: '', name: '', email: '', role: 'sales', commission: 0
  });

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

  // Authentication handlers
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password && u.active);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials or inactive user');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // User management
  const handleAddUser = (e) => {
    e.preventDefault();
    if (currentUser.role !== 'admin') {
      alert('Only administrators can add users');
      return;
    }
    
    const newUser = {
      ...userFormData,
      id: Date.now(),
      active: true
    };
    setUsers(prev => [...prev, newUser]);
    setUserFormData({ username: '', password: '', name: '', email: '', role: 'sales', commission: 0 });
    setShowUserForm(false);
  };

  const handleDeleteUser = (userId) => {
    if (currentUser.role !== 'admin') {
      alert('Only administrators can delete users');
      return;
    }
    if (userId === currentUser.id) {
      alert('Cannot delete your own account');
      return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId) => {
    if (currentUser.role !== 'admin') {
      alert('Only administrators can modify user status');
      return;
    }
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  // Barcode scanner simulation
  const handleBarcodeSearch = () => {
    const barcode = prompt('Enter or scan barcode:');
    if (barcode) {
      const item = items.find(i => i.barcode === barcode);
      if (item) {
        setSearchTerm(item.sku);
        setCurrentView('inventory');
        // Highlight the found item
        setTimeout(() => {
          const element = document.getElementById(`item-${item.id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('bg-yellow-100');
            setTimeout(() => element.classList.remove('bg-yellow-100'), 2000);
          }
        }, 100);
      } else {
        alert('Item not found');
      }
    }
  };

  // Generate barcode for item
  const generateBarcode = (sku) => {
    return '12345' + sku.replace(/[^0-9]/g, '').padStart(8, '0');
  };

  // Generate QR Code (simulation)
  const handleGenerateQR = (item) => {
    const qrData = JSON.stringify({
      id: item.id,
      sku: item.sku,
      name: item.name,
      barcode: item.barcode
    });
    alert(`QR Code generated for ${item.name}\nData: ${qrData}\n\nIn a real app, this would generate and display/download a QR code image.`);
  };

  // Handle item deletion
  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      setItems(prev => prev.filter(item => item.id !== itemId));
      // Also remove related sales
      setSales(prev => prev.filter(sale => sale.itemId !== itemId));
    }
  };

  // Handle item edit
  const handleEditItem = (item) => {
    setFormData({ ...item });
    setEditingItem(item);
    setShowAddForm(true);
  };

  // Record sale
  const handleRecordSale = (item) => {
    const quantity = prompt(`Enter quantity sold for ${item.name}:\n(Available: ${item.quantity})`);
    if (quantity && parseInt(quantity) > 0) {
      const qty = parseInt(quantity);
      if (qty > item.quantity) {
        alert('Cannot sell more than available quantity!');
        return;
      }
      
      const salePrice = prompt(`Enter sale price per unit:\n(Suggested: ${item.price})`) || item.price;
      const customer = prompt('Enter customer name (optional):') || 'Walk-in Customer';
      
      // Calculate commission
      const commission = currentUser.role === 'sales' ? (parseFloat(salePrice) * qty * (currentUser.commission / 100)) : 0;
      
      const newSale = {
        id: Date.now(),
        itemId: item.id,
        quantity: qty,
        salePrice: parseFloat(salePrice),
        date: new Date().toISOString().split('T')[0],
        customer: customer,
        salesPerson: currentUser.id,
        commission: commission
      };
      
      setSales(prev => [...prev, newSale]);
      setItems(prev => prev.map(i => 
        i.id === item.id 
          ? { ...i, quantity: Math.max(0, i.quantity - qty) }
          : i
      ));
      
      alert(`Sale recorded!\nQuantity: ${qty}\nTotal: ${(parseFloat(salePrice) * qty).toFixed(2)}\nCommission: ${commission.toFixed(2)}`);
    }
  };

  // Print label (simulation)
  const handlePrintLabel = (item) => {
    const printContent = `
      ITEM LABEL
      ─────────────────
      Name: ${item.name}
      SKU: ${item.sku}
      Barcode: ${item.barcode}
      Price: ${item.price.toFixed(2)}
      Location: ${warehouses.find(w => w.id === item.warehouse)?.name || 'N/A'}
      Bin: ${item.binLocation}
    `;
    
    // In a real app, this would send to printer
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

  // Add missing user edit functionality
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    if (currentUser.role !== 'admin') {
      alert('Only administrators can edit users');
      return;
    }
    setUserFormData({
      username: user.username,
      password: '',
      name: user.name,
      email: user.email,
      role: user.role,
      commission: user.commission
    });
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (currentUser.role !== 'admin') {
      alert('Only administrators can update users');
      return;
    }
    
    setUsers(prev => prev.map(user => 
      user.id === editingUser.id 
        ? { 
            ...user, 
            ...userFormData, 
            password: userFormData.password || user.password // Keep old password if not changed
          }
        : user
    ));
    
    setUserFormData({ username: '', password: '', name: '', email: '', role: 'sales', commission: 0 });
    setEditingUser(null);
    setShowUserForm(false);
  };

  // Export functionality
  const exportToCSV = () => {
    const headers = ['SKU', 'Name', 'Category', 'Quantity', 'Price', 'Cost', 'Supplier', 'Min Stock', 'Warehouse', 'Bin Location', 'Barcode'];
    const csvContent = [
      headers.join(','),
      ...filteredItems.map(item => {
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

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.barcode?.includes(searchTerm);
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesPrice = (!priceFilter.min || item.price >= parseFloat(priceFilter.min)) &&
                          (!priceFilter.max || item.price <= parseFloat(priceFilter.max));
      const matchesStock = stockFilter === 'all' || 
                          (stockFilter === 'low' && item.quantity <= item.minStock) ||
                          (stockFilter === 'out' && item.quantity === 0);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }, [items, searchTerm, selectedCategory, priceFilter, stockFilter]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Pro</h1>
            <p className="text-gray-600 mt-2">Enterprise Inventory Management</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                placeholder="Enter password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Demo Credentials:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Admin:</strong> admin / admin123</div>
              <div><strong>Sales:</strong> sales1 / sales123</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          onClick={handleLogout}
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

  // Dashboard View
  const DashboardView = () => (
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
            { icon: Plus, label: 'Add Item', action: () => setShowAddForm(true), color: 'green' },
            { icon: ShoppingCart, label: 'New Sale', action: () => setCurrentView('sales'), color: 'blue' },
            { icon: Receipt, label: 'Purchase Order', action: () => setCurrentView('purchases'), color: 'purple' },
            { icon: FileBarChart, label: 'Generate Report', action: () => setCurrentView('reports'), color: 'orange' },
          ].map((action, index) => (
            <button
              key={index}
              onClick={action.action}
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
          </div>
        </div>
      </div>
    </div>
  );

  // User Management View (Admin only)
  const UserManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
        <button
          onClick={() => setShowUserForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.commission}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`${user.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {user.active ? 'Deactivate' : 'Activate'}
                    </button>
                    {user.id !== currentUser.id && (
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">{editingUser ? 'Edit User' : 'Add New User'}</h2>
                <button onClick={() => {
                  setShowUserForm(false);
                  setEditingUser(null);
                  setUserFormData({ username: '', password: '', name: '', email: '', role: 'sales', commission: 0 });
                }}>
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              
              <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={userFormData.name}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={userFormData.username}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password {editingUser && '(leave blank to keep current)'}</label>
                  <input
                    type="password"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    required={!editingUser}
                    placeholder={editingUser ? 'Leave blank to keep current password' : ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={userFormData.email}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={userFormData.role}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  >
                    <option value="sales">Sales</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commission (%)</label>
                  <input
                    type="number"
                    value={userFormData.commission}
                    onChange={(e) => setUserFormData(prev => ({ ...prev, commission: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserForm(false);
                      setEditingUser(null);
                      setUserFormData({ username: '', password: '', name: '', email: '', role: 'sales', commission: 0 });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {editingUser ? 'Update User' : 'Add User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Inventory View with enhanced features
  const InventoryView = () => (
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

      {/* Enhanced Inventory Table */}
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
              {filteredItems.map((item) => {
                const warehouse = warehouses.find(w => w.id === item.warehouse);
                const isLowStock = item.quantity <= item.minStock;
                const profitMargin = item.price > 0 ? (((item.price - item.cost) / item.price) * 100).toFixed(1) : 0;
                
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
      </div>
    </div>
  );

  // Purchase Orders View
  const PurchaseOrdersView = () => (
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
            {purchaseOrders.map(po => {
              const vendor = vendors.find(v => v.id === po.vendor);
              return (
                <tr key={po.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    PO-{po.id.toString().padStart(4, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor?.name}</td>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Warehouses View
  const WarehousesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Warehouse Management</h3>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map(warehouse => {
          const warehouseItems = items.filter(item => item.warehouse === warehouse.id);
          const warehouseValue = warehouseItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
          
          return (
            <div key={warehouse.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{warehouse.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{warehouse.address}</p>
                  <p className="text-sm text-gray-500">Manager: {warehouse.manager}</p>
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

  // Reports View
  const ReportsView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Reports & Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Inventory Report', icon: Package, description: 'Current stock levels and valuation' },
          { title: 'Sales Report', icon: TrendingUp, description: 'Sales performance and trends' },
          { title: 'Purchase Report', icon: Receipt, description: 'Purchase orders and vendor analysis' },
          { title: 'Low Stock Report', icon: AlertTriangle, description: 'Items below minimum stock level' },
          { title: 'Profit Analysis', icon: DollarSign, description: 'Profit margins by item and category' },
          { title: 'Commission Report', icon: Percent, description: 'Sales commission tracking' },
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <report.icon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                Generate
              </button>
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Enhanced Item Form
  const ItemForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {editingItem ? 'Edit Item' : 'Add New Item'}
            </h2>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingItem(null);
                setFormData({
                  name: '', sku: '', category: '', quantity: 0, price: 0, cost: 0,
                  description: '', supplier: '', minStock: 5, warehouse: '', barcode: '',
                  serialNumber: '', batchNumber: '', binLocation: ''
                });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (editingItem) {
              setItems(prev => prev.map(item => 
                item.id === editingItem.id 
                  ? { ...item, ...formData, id: editingItem.id }
                  : item
              ));
              setEditingItem(null);
            } else {
              const newItem = {
                ...formData,
                id: Date.now(),
                dateAdded: new Date().toISOString().split('T')[0],
                barcode: formData.barcode || generateBarcode(formData.sku)
              };
              setItems(prev => [...prev, newItem]);
            }
            
            setFormData({
              name: '', sku: '', category: '', quantity: 0, price: 0, cost: 0,
              description: '', supplier: '', minStock: 5, warehouse: '', barcode: '',
              serialNumber: '', batchNumber: '', binLocation: ''
            });
            setShowAddForm(false);
          }} className="space-y-6">
            
            {/* Basic Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                    placeholder="Auto-generated if empty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Inventory Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Inventory Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock</label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                  <select
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={(e) => setFormData(prev => ({ ...prev, warehouse: parseInt(e.target.value) || '' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map(wh => (
                      <option key={wh.id} value={wh.id}>{wh.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bin Location</label>
                  <input
                    type="text"
                    name="binLocation"
                    value={formData.binLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, binLocation: e.target.value }))}
                    placeholder="e.g., A1-B2-C3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, batchNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($) *</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={(e) => setFormData(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-md">
                    <div className="flex justify-between">
                      <span>Profit Margin:</span>
                      <span className="font-medium">
                        {formData.price > 0 ? (((formData.price - formData.cost) / formData.price) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit per Unit:</span>
                      <span className="font-medium">${(formData.price - formData.cost).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingItem(null);
                  setFormData({
                    name: '', sku: '', category: '', quantity: 0, price: 0, cost: 0,
                    description: '', supplier: '', minStock: 5, warehouse: '', barcode: '',
                    serialNumber: '', batchNumber: '', binLocation: ''
                  });
                }}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingItem ? 'Update' : 'Add'} Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Main render logic
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'inventory':
        return <InventoryView />;
      case 'sales':
        return <div className="text-center py-12"><ShoppingCart className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-lg font-medium text-gray-900">Sales Orders</h3><p className="text-gray-500">Sales order management coming soon...</p></div>;
      case 'purchases':
        return <PurchaseOrdersView />;
      case 'warehouses':
        return <WarehousesView />;
      case 'vendors':
        return <div className="text-center py-12"><Truck className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-lg font-medium text-gray-900">Vendor Management</h3><p className="text-gray-500">Vendor management coming soon...</p></div>;
      case 'reports':
        return <ReportsView />;
      case 'users':
        return currentUser.role === 'admin' ? <UserManagementView /> : <div className="text-center py-12"><Users className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-lg font-medium text-gray-900">Access Denied</h3><p className="text-gray-500">Only administrators can access user management.</p></div>;
      case 'settings':
        return <div className="text-center py-12"><Settings className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-lg font-medium text-gray-900">Settings</h3><p className="text-gray-500">System settings coming soon...</p></div>;
      default:
        return <DashboardView />;
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

      {/* Modals */}
      {showAddForm && <ItemForm />}
    </div>
  );
};

export default InventoryManagementPro;