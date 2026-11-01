import React, { useEffect, useState } from 'react';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { CategoryBarChart } from '../components/dashboard/CategoryBarChart';
import { TrafficDonutChart } from '../components/dashboard/TrafficDonutChart';
import { RegionalPerformance } from '../components/dashboard/RegionalPerformance';
import { mockApi } from '../services/mockApi';
import { formatCurrency } from '../utils/formatters';
import { BarChart3, TrendingUp, Zap, Target, Layers } from 'lucide-react';

export function AnalyticsPage({ timeframe = 'monthly' }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await mockApi.getDashboardOverview(timeframe);
        setData(res.data);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [timeframe]);

  const metrics = [
    { label: 'Gross Margin', value: '62.4%', change: '+3.2%', icon: Target },
    { label: 'Customer Lifetime Value', value: '$4,120', change: '+12.5%', icon: TrendingUp },
    { label: 'Net MRR Expansion', value: '$18,940', change: '+8.1%', icon: Zap },
    { label: 'Customer Retention Rate', value: '94.8%', change: '+1.6%', icon: Layers },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <BarChart3 className="w-3 h-3" />
            Deep Analytics
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          In-Depth Performance Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Granular reporting on revenue growth, customer acquisition costs, and service lines.
        </p>
      </div>

      {/* Advanced Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-medium">{m.label}</span>
                <Icon className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {m.value}
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="space-y-6">
        <RevenueChart
          data={data?.revenueTrend}
          isLoading={isLoading}
          timeframe={timeframe}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBarChart
            data={data?.categorySales}
            isLoading={isLoading}
          />
          <TrafficDonutChart
            data={data?.trafficSources}
            isLoading={isLoading}
          />
        </div>

        <RegionalPerformance
          data={data?.regionalPerformance}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
