// ================================================================
// 2. SAMPLE DATA
// ================================================================

// src/data/sampleData.js
export const sampleUsers = [
  { 
    id: 1, 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin', 
    name: 'Administrator', 
    email: 'admin@company.com', 
    commission: 0, 
    active: true 
  },
  { 
    id: 2, 
    username: 'sales1', 
    password: 'sales123', 
    role: 'sales', 
    name: 'John Sales', 
    email: 'john@company.com', 
    commission: 5, 
    active: true 
  },
];

export const sampleWarehouses = [
  { 
    id: 1, 
    name: 'Main Warehouse', 
    address: '123 Main St', 
    manager: 'John Doe', 
    active: true 
  },
  { 
    id: 2, 
    name: 'Secondary Warehouse', 
    address: '456 Oak Ave', 
    manager: 'Jane Smith', 
    active: true 
  },
];

export const sampleVendors = [
  { 
    id: 1, 
    name: 'TechCorp', 
    contact: 'tech@techcorp.com', 
    phone: '555-0101', 
    address: '789 Tech Blvd', 
    active: true 
  },
  { 
    id: 2, 
    name: 'FashionCo', 
    contact: 'orders@fashionco.com', 
    phone: '555-0102', 
    address: '321 Fashion Ave', 
    active: true 
  },
];

export const sampleItems = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    sku: 'WH001', 
    category: 'Electronics', 
    quantity: 45, 
    price: 79.99, 
    cost: 35.00, 
    description: 'Bluetooth wireless headphones',
    supplier: 'TechCorp', 
    minStock: 10, 
    dateAdded: '2024-08-15', 
    warehouse: 1,
    barcode: '1234567890123', 
    serialNumber: 'WH001-001', 
    batchNumber: 'B001',
    binLocation: 'A1-B2-C3'
  },
  { 
    id: 2, 
    name: 'Cotton T-Shirt', 
    sku: 'CT002', 
    category: 'Clothing', 
    quantity: 120, 
    price: 19.99, 
    cost: 8.50, 
    description: '100% cotton t-shirt',
    supplier: 'FashionCo', 
    minStock: 20, 
    dateAdded: '2024-08-12', 
    warehouse: 1,
    barcode: '2345678901234', 
    serialNumber: 'CT002-001', 
    batchNumber: 'B002',
    binLocation: 'B1-A2-D1'
  },
];