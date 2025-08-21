// // ================================================================
// // 4. CUSTOM HOOKS
// // ================================================================

// // src/hooks/useAuth.js
// import { useState, useCallback } from 'react';
// import { sampleUsers } from '../data/sampleData';

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [users, setUsers] = useState(sampleUsers);

//   const login = useCallback((credentials) => {
//     const user = users.find(u => 
//       u.username === credentials.username && 
//       u.password === credentials.password && 
//       u.active
//     );
    
//     if (user) {
//       setCurrentUser(user);
//       setIsAuthenticated(true);
//       return { success: true };
//     }
    
//     return { success: false, error: 'Invalid credentials or inactive user' };
//   }, [users]);

//   const logout = useCallback(() => {
//     setCurrentUser(null);
//     setIsAuthenticated(false);
//   }, []);

//   return {
//     isAuthenticated,
//     currentUser,
//     users,
//     setUsers,
//     login,
//     logout
//   };
// };

import { useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator', email: 'admin@company.com', commission: 0, active: true },
    { id: 2, username: 'sales1', password: 'sales123', role: 'sales', name: 'John Sales', email: 'john@company.com', commission: 5, active: true },
  ]);

  const login = (credentials) => {
    const user = users.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password && 
      u.active
    );
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const addUser = (userData) => {
    if (currentUser?.role !== 'admin') {
      throw new Error('Only administrators can add users');
    }
    
    const newUser = {
      ...userData,
      id: Date.now(),
      active: true
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (userId, userData) => {
    if (currentUser?.role !== 'admin') {
      throw new Error('Only administrators can update users');
    }
    
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, ...userData, password: userData.password || user.password }
        : user
    ));
  };

  const deleteUser = (userId) => {
    if (currentUser?.role !== 'admin') {
      throw new Error('Only administrators can delete users');
    }
    if (userId === currentUser.id) {
      throw new Error('Cannot delete your own account');
    }
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const toggleUserStatus = (userId) => {
    if (currentUser?.role !== 'admin') {
      throw new Error('Only administrators can modify user status');
    }
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  return {
    isAuthenticated,
    currentUser,
    users,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus
  };
};

export { useAuth };
