import React, { useEffect, useState, useCallback } from 'react';
import { KpiCards } from '../components/dashboard/KpiCards';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { CategoryBarChart } from '../components/dashboard/CategoryBarChart';
import { TrafficDonutChart } from '../components/dashboard/TrafficDonutChart';
import { RegionalPerformance } from '../components/dashboard/RegionalPerformance';
import { DataTable } from '../components/tables/DataTable';
import { ErrorState } from '../components/common/ErrorState';
import { mockApi } from '../services/mockApi';
import { Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

export function DashboardPage({ timeframe = 'monthly' }) {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [overviewRes, txnRes] = await Promise.all([
        mockApi.getDashboardOverview(timeframe),
        mockApi.getTransactions({ limit: 100 }),
      ]);
      setData(overviewRes.data);
      setTransactions(txnRes.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data.');
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3 h-3" />
              Live Telemetry
            </span>
            <span className="text-xs text-slate-400">Oct 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome to the InfioneX Executive Analytics Dashboard. Monitor revenue, engagement, and operational orders.
          </p>
        </div>

        {/* Quick Date Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-2xs">
          <Calendar className="w-4 h-4 text-indigo-500" />
          <span className="font-medium">October 2026 Reporting Cycle</span>
        </div>
      </div>

      {/* Error State Banner with Retry */}
      {error && (
        <ErrorState
          title="API Request Failed"
          message={error}
          onRetry={fetchDashboard}
        />
      )}

      {/* Summary KPI Cards */}
      <KpiCards kpis={data?.kpis} isLoading={isLoading} />

      {/* Primary Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Revenue Line/Area Chart (2 columns on large screens) */}
        <div className="lg:col-span-2">
          <RevenueChart
            data={data?.revenueTrend}
            isLoading={isLoading}
            timeframe={timeframe}
          />
        </div>

        {/* Chart 2: Traffic Channels Donut Chart (1 column) */}
        <div className="lg:col-span-1">
          <TrafficDonutChart
            data={data?.trafficSources}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Secondary Charts & Regional Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Category Sales Bar Chart */}
        <CategoryBarChart
          data={data?.categorySales}
          isLoading={isLoading}
        />

        {/* Regional Performance Metrics */}
        <RegionalPerformance
          data={data?.regionalPerformance}
          isLoading={isLoading}
        />
      </div>

      {/* Sortable & Searchable Data Table with Pagination & CSV Export */}
      <div>
        <DataTable
          data={transactions}
          isLoading={isLoading}
          title="Recent Transactions & Orders"
          description="Real-time order audit trail with client-side sorting, search, filtering, and pagination."
          onRefresh={fetchDashboard}
        />
      </div>
    </div>
  );
}
