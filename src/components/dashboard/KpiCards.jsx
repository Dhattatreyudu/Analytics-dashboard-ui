import React from 'react';
import {
  DollarSign,
  Users,
  ShoppingCart,
  Percent,
  TrendingUp,
  TrendingDown,
  Activity,
  Smile,
} from 'lucide-react';
import { KpiSkeleton } from '../common/SkeletonLoader';

const KPI_CONFIG = {
  revenue: {
    icon: DollarSign,
    color: 'from-blue-600 to-indigo-600',
    lightBg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  },
  users: {
    icon: Users,
    color: 'from-violet-600 to-purple-600',
    lightBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
  },
  orders: {
    icon: ShoppingCart,
    color: 'from-emerald-600 to-teal-600',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
  },
  conversion: {
    icon: Percent,
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
  },
  avgOrderValue: {
    icon: Activity,
    color: 'from-cyan-600 to-blue-600',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400',
  },
  satisfaction: {
    icon: Smile,
    color: 'from-rose-500 to-pink-500',
    lightBg: 'bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400',
  },
};

export function KpiCards({ kpis, isLoading }) {
  if (isLoading || !kpis) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <KpiSkeleton key={i} />
        ))}
      </div>
    );
  }

  const items = [
    { key: 'revenue', ...kpis.revenue },
    { key: 'orders', ...kpis.orders },
    { key: 'users', ...kpis.users },
    { key: 'conversion', ...kpis.conversion },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map(item => {
        const conf = KPI_CONFIG[item.key] || KPI_CONFIG.revenue;
        const Icon = conf.icon;
        const isPositive = item.isPositive;

        return (
          <div
            key={item.key}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.title}
              </span>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${conf.lightBg}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Metric Value */}
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {item.formatted}
              </div>
            </div>

            {/* Bottom comparison and trend pill */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span
                className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${
                  isPositive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                    : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {isPositive ? `+${item.change}%` : `${item.change}%`}
              </span>
              <span className="text-slate-400 dark:text-slate-500 truncate">
                {item.comparison}
              </span>
            </div>

            {/* Subtle bottom gradient line */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${conf.color} opacity-0 group-hover:opacity-100 transition-opacity`}
            />
          </div>
        );
      })}
    </div>
  );
}
