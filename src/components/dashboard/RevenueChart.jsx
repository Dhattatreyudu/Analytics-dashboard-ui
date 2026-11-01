import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { ChartSkeleton } from '../common/SkeletonLoader';
import { formatCurrency } from '../../utils/formatters';

export function RevenueChart({ data = [], isLoading, timeframe = 'monthly' }) {
  const { isDark } = useTheme();
  const [activeSeries, setActiveSeries] = useState({
    revenue: true,
    profit: true,
    expenses: false,
  });

  if (isLoading || !data.length) {
    return <ChartSkeleton height="h-96" />;
  }

  const toggleSeries = key => {
    setActiveSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-lg text-xs space-y-1.5">
          <div className="font-semibold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-1">
            {label} 2026
          </div>
          {payload.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Revenue & Profit Growth
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Financial performance analytics breakdown ({timeframe})
          </p>
        </div>

        {/* Legend / Toggles */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => toggleSeries('revenue')}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
              activeSeries.revenue
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800'
                : 'text-slate-400 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Revenue
          </button>
          <button
            onClick={() => toggleSeries('profit')}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
              activeSeries.profit
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800'
                : 'text-slate-400 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Net Profit
          </button>
          <button
            onClick={() => toggleSeries('expenses')}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
              activeSeries.expenses
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800'
                : 'text-slate-400 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Expenses
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#1e293b' : '#f1f5f9'}
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke={isDark ? '#64748b' : '#94a3b8'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke={isDark ? '#64748b' : '#94a3b8'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={val => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
            />

            <Tooltip content={<CustomTooltip />} />

            {activeSeries.revenue && (
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            )}

            {activeSeries.profit && (
              <Area
                type="monotone"
                dataKey="profit"
                name="Net Profit"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            )}

            {activeSeries.expenses && (
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorExp)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
