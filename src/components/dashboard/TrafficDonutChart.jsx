import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartSkeleton } from '../common/SkeletonLoader';

export function TrafficDonutChart({ data = [], isLoading }) {
  if (isLoading || !data.length) {
    return <ChartSkeleton height="h-96" />;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-lg text-xs space-y-1">
          <div className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 dark:text-slate-400">Share:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {item.value}%
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 dark:text-slate-400">Visitors:</span>
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              {item.count}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Traffic Acquisition
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Channel distribution breakdown
          </p>
        </div>
      </div>

      {/* Donut Chart Canvas */}
      <div className="relative w-full h-56 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Stats in Donut Hole */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            100%
          </span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            All Channels
          </span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
        {data.map(item => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-[140px]">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                {item.count}
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 w-8 text-right">
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
