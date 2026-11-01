import React, { useEffect, useState, useCallback } from 'react';
import { DataTable } from '../components/tables/DataTable';
import { ErrorState } from '../components/common/ErrorState';
import { mockApi } from '../services/mockApi';
import { Receipt, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTxns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await mockApi.getTransactions({ limit: 100 });
      setTransactions(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch transactions list.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTxns();
  }, [fetchTxns]);

  const totalVolume = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const completedCount = transactions.filter(t => t.status === 'Completed').length;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Receipt className="w-3 h-3" />
            Order Ledger
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Transaction Records & Invoicing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search, filter by payment status, sort columns, inspect itemized receipts, and export ledger to CSV.
        </p>
      </div>

      {/* Transaction Summary Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400">Total Volume Settled</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {formatCurrency(totalVolume)}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Completed Orders</span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {completedCount}
            </div>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-500/30" />
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Pending Authorization</span>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
              {pendingCount}
            </div>
          </div>
          <Clock className="w-8 h-8 text-amber-500/30" />
        </div>
      </div>

      {error && (
        <ErrorState
          title="Failed to Load Transactions"
          message={error}
          onRetry={fetchTxns}
        />
      )}

      {/* Main Table */}
      <DataTable
        data={transactions}
        isLoading={isLoading}
        title="All System Transactions"
        description="Full searchable transaction database with live filtering and pagination controls."
        onRefresh={fetchTxns}
      />
    </div>
  );
}
