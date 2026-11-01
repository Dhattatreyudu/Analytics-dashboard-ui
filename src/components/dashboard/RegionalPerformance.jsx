import React from 'react';
import { Globe, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function RegionalPerformance({ data = [], isLoading }) {
  if (isLoading || !data.length) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-500" />
            Regional Distribution
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Geographic revenue and growth vectors
          </p>
        </div>
      </div>

      <div className="space-y-4 my-auto">
        {data.map(item => (
          <div key={item.region} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-700 dark:text-slate-200">{item.region}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">
                  {formatCurrency(item.revenue)}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center text-[11px]">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {item.growth}
                </span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${item.share}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
