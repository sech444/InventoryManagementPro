// ================================================================
// 5. ANALYTICS HOOK
// ================================================================

// src/hooks/useAnalytics.js
import { useMemo } from 'react';

export const useAnalytics = (items, sales) => {
  return useMemo(() => {
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
};