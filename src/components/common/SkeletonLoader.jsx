import React from 'react';

export function KpiSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
      <div className="mt-4 h-8 w-36 bg-slate-300 dark:bg-slate-700 rounded"></div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800/60 rounded"></div>
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 'h-80' }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs animate-pulse ${height} flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800/80 rounded-lg"></div>
      </div>
      <div className="flex-1 flex items-end gap-3 pt-6 pb-2">
        {[40, 65, 30, 85, 55, 75, 45, 90, 60, 70, 80, 50].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-t"
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-9 w-48 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800/60 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
