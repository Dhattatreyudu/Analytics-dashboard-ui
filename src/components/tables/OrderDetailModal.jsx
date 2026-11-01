import React from 'react';
import { X, CheckCircle, Clock, AlertTriangle, Receipt, Printer, Download } from 'lucide-react';
import { StatusBadge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function OrderDetailModal({ transaction, onClose }) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Transaction Details
              </h3>
              <p className="text-xs text-slate-500 font-mono">{transaction.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Amount and Status Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Total Transaction Amount
              </span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(transaction.amount)}
              </div>
            </div>
            <StatusBadge status={transaction.status} />
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Customer</span>
              <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                {transaction.customer}
              </div>
              <div className="text-slate-500 truncate">{transaction.email}</div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Payment Method</span>
              <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                {transaction.paymentMethod}
              </div>
              <div className="text-slate-500">Processed securely</div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Timestamp</span>
              <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                {formatDate(transaction.date)} at {transaction.time || '12:00'}
              </div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Items Count</span>
              <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                {transaction.itemsCount || 1} license(s)
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <span className="text-xs text-slate-400 font-medium">Product / Service</span>
            <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {transaction.product}
                </div>
                <div className="text-slate-500 text-[11px]">InfioneX Cloud Services</div>
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
