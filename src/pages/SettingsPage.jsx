import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { mockApi } from '../services/mockApi';
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  AlertTriangle,
  Server,
  CheckCircle,
  Mail,
  Shield,
  FileText,
} from 'lucide-react';

export function SettingsPage() {
  const { theme, setTheme, isDark } = useTheme();
  const [errorSimulated, setErrorSimulated] = useState(mockApi.getErrorSimulation());
  const [saveToast, setSaveToast] = useState(false);

  const handleToggleError = () => {
    const nextVal = !errorSimulated;
    setErrorSimulated(nextVal);
    mockApi.setErrorSimulation(nextVal);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Settings className="w-3 h-3" />
            Configuration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Preferences & System Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure application interface, theme preferences, and mock API simulation environments.
        </p>
      </div>

      {saveToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Settings updated successfully!
        </div>
      )}

      {/* Theme Settings Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            Appearance & Theme
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select your preferred display mode. Seamlessly changes background, card surfaces, and chart typography.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => setTheme('light')}
            className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-xs font-semibold transition-all ${
              theme === 'light'
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <span>Light Mode</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-xs font-semibold transition-all ${
              theme === 'dark'
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Moon className="w-5 h-5 text-indigo-400" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Mock REST API Diagnostic Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-500" />
            Mock REST API Diagnostics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test the project's error handling and skeleton loading states as required by the InfioneX problem statement.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              Simulate 500 / 503 Server Error
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              When enabled, all subsequent API fetches will fail and render the error recovery view.
            </p>
          </div>

          <button
            onClick={handleToggleError}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 shadow-xs ${
              errorSimulated
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200'
            }`}
          >
            {errorSimulated ? 'Error Active (Turn OFF)' : 'Simulate Error (Turn ON)'}
          </button>
        </div>
      </div>

      {/* Internship Project Details Card */}
      <div className="bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent border border-indigo-200/60 dark:border-indigo-900/40 rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
          <FileText className="w-4 h-4" />
          InfioneX Internship 2026 Deliverables Checklist
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            Dashboard layout with sidebar, top bar & summary cards
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            3+ chart types (Area/Line, Bar, Donut/Pie) via Recharts
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            Sortable & searchable data table with pagination
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            Light / dark theme toggle with persistence
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            Mock REST API with loading skeletons & error states
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            Export table to CSV & itemized receipt modal
          </li>
        </ul>

        <div className="pt-3 border-t border-indigo-100 dark:border-indigo-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>Final Submission Contact:</span>
          <a
            href="mailto:admin@infionex.com"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            admin@infionex.com
          </a>
        </div>
      </div>
    </div>
  );
}
