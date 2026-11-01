import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { CustomersPage } from './pages/CustomersPage';
import { SettingsPage } from './pages/SettingsPage';
import { mockNotifications } from './services/mockData';

export default function App() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleGlobalRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout
                onRefresh={handleGlobalRefresh}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                notifications={mockNotifications}
              />
            }
          >
            <Route
              path="/"
              element={<DashboardPage key={`dash-${refreshKey}`} timeframe={timeframe} />}
            />
            <Route
              path="/analytics"
              element={<AnalyticsPage key={`analytics-${refreshKey}`} timeframe={timeframe} />}
            />
            <Route
              path="/transactions"
              element={<TransactionsPage key={`txns-${refreshKey}`} />}
            />
            <Route
              path="/customers"
              element={<CustomersPage key={`cust-${refreshKey}`} />}
            />
            <Route
              path="/settings"
              element={<SettingsPage />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
