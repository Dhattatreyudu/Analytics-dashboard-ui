import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function Layout({
  onRefresh,
  isLoading,
  timeframe,
  setTimeframe,
  notifications = [],
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Navbar */}
        <Topbar
          onMenuToggle={() => setSidebarOpen(true)}
          onRefresh={onRefresh}
          isLoading={isLoading}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          notifications={notifications}
        />

        {/* Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-6 px-6 text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                InfioneX IT Solutions
              </span>{' '}
              · Internship Program 2026 · Problem Statement 02
            </div>
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <span>Frontend Engineering Track</span>
              <span>•</span>
              <a
                href="mailto:admin@infionex.com"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                admin@infionex.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
