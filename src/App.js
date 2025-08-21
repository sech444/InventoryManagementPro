import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useInventory } from './hooks/useInventory';
import Layout from './components/layout/Layout';
import LoginForm from './components/forms/LoginForm';
import Dashboard from './components/views/Dashboard';
import Inventory from './components/views/Inventory';
import UserManagement from './components/views/UserManagement';
import PurchaseOrders from './components/views/PurchaseOrders';
import Warehouses from './components/views/Warehouses';
import Reports from './components/views/Reports';


const App = () => {
  const auth = useAuth();
  const inventory = useInventory(auth.isAuthenticated, auth.currentUser);
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard inventory={inventory} />;
      case 'inventory':
        return <Inventory inventory={inventory} currentUser={auth.currentUser} />;
      case 'users':
        return <UserManagement auth={auth} />;
      case 'purchase-orders':
        return <PurchaseOrders />;
      case 'warehouses':
          return <Warehouses />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard inventory={inventory} />;
    }
  };

  if (!auth.isAuthenticated) {
    return <LoginForm onLogin={auth.login} />;
  }

  return (
    <Layout
      currentUser={auth.currentUser}
      currentView={currentView}
      onViewChange={setCurrentView}
      onLogout={auth.logout}
    >
      {renderView()}
    </Layout>
  );
};

export default App;