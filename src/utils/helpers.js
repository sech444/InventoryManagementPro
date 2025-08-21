// ================================================================
// 3. UTILITY FUNCTIONS
// ================================================================

// src/utils/helpers.js
export const generateBarcode = (sku) => {
  return '12345' + sku.replace(/[^0-9]/g, '').padStart(8, '0');
};

export const calculateProfitMargin = (price, cost) => {
  return price > 0 ? (((price - cost) / price) * 100).toFixed(1) : 0;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const scrollToElement = (elementId) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('bg-yellow-100');
      setTimeout(() => element.classList.remove('bg-yellow-100'), 2000);
    }
  }, 100);
};