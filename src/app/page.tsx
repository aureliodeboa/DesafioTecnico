"use client"
import React, { useState } from 'react';
import Login from './auth/login';
import Dashboard from './dashboard/page';
import { ThemeProvider } from '@/contexts/ThemeContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider>
    {isLoggedIn ? (
      <Dashboard onLogout={() => setIsLoggedIn(false)} />
    ) : (
      <Login onLogin={() => setIsLoggedIn(true)} />
    )}
  </ThemeProvider>
  )

};

export default App;