import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { StatusBadge } from '../common/Badge';
import { TableSkeleton } from '../common/SkeletonLoader';
import { OrderDetailModal } from './OrderDetailModal';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { exportToCsv } from '../../utils/exportCsv';

export function DataTable({
  data = [],
  isLoading,
  title = 'Recent Transactions',
  description = 'Live operational records and order fulfillment',
  onRefresh,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Filter & Sort computation
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search check
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.customer.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.product.toLowerCase().includes(query);

      // Status check
      const matchesStatus =
        statusFilter === 'all' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      // Payment check
      const matchesPayment =
        paymentFilter === 'all' ||
        item.paymentMethod.toLowerCase() === paymentFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [data, search, statusFilter, paymentFilter]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'amount') {
        valA = Number(valA);
        valB = Number(valB);
      } else if (sortField === 'date') {
        valA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        valB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Pagination slice
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validPage = Math.min(currentPage, totalPages);
  const paginatedData = useMemo(() => {
    const start = (validPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, validPage, pageSize]);

  // Handle sort header click
  const handleSort = field => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = field => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
    );
  };

  const handleExport = () => {
    const headers = [
      { key: 'id', label: 'Transaction ID' },
      { key: 'customer', label: 'Customer Name' },
      { key: 'email', label: 'Email' },
      { key: 'product', label: 'Product' },
      { key: 'amount', label: 'Amount ($)' },
      { key: 'date', label: 'Date' },
      { key: 'status', label: 'Status' },
      { key: 'paymentMethod', label: 'Payment Method' },
    ];
    exportToCsv('InfioneX_Transactions', sortedData, headers);
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setCurrentPage(1);
  };

  if (isLoading) {
    return <TableSkeleton rows={pageSize} />;
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors">
        {/* Table Header Section */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {description}
              </p>
            </div>

            {/* Actions: Export & Refresh */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
                title="Export filtered table as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Reload table"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search and Filters Toolbar */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by ID, customer name, email, or product..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-all appearance-none cursor-pointer"
              >
                <option value="all">Status: All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Payment Method Filter */}
            <div className="relative">
              <select
                value={paymentFilter}
                onChange={e => {
                  setPaymentFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition-all appearance-none cursor-pointer"
              >
                <option value="all">Payment: All</option>
                <option value="credit card">Credit Card</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="apple pay">Apple Pay</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th
                  onClick={() => handleSort('id')}
                  className="py-3 px-4 sm:px-6 cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Order ID</span>
                    {getSortIcon('id')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('customer')}
                  className="py-3 px-4 cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Customer</span>
                    {getSortIcon('customer')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('product')}
                  className="py-3 px-4 cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100 transition-colors hidden md:table-cell"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Product / Service</span>
                    {getSortIcon('product')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('date')}
                  className="py-3 px-4 cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Date</span>
                    {getSortIcon('date')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('amount')}
                  className="py-3 px-4 cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Amount</span>
                    {getSortIcon('amount')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-3 px-4 cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="py-3 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="max-w-xs mx-auto space-y-3">
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        No transactions match your current filters.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 hover:underline"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedTxn(item)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    {/* Order ID */}
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-medium text-indigo-600 dark:text-indigo-400">
                      {item.id}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.customer}
                          className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div className="truncate max-w-[150px] sm:max-w-[200px]">
                          <div className="font-semibold text-slate-900 dark:text-white truncate">
                            {item.customer}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="truncate max-w-[220px] text-slate-700 dark:text-slate-300">
                        {item.product}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                      {formatCurrency(item.amount)}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-6 text-right" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedTxn(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View transaction invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-4 sm:px-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Showing{' '}
              <strong className="text-slate-800 dark:text-slate-200">
                {totalItems === 0 ? 0 : (validPage - 1) * pageSize + 1}
              </strong>{' '}
              to{' '}
              <strong className="text-slate-800 dark:text-slate-200">
                {Math.min(validPage * pageSize, totalItems)}
              </strong>{' '}
              of <strong className="text-slate-800 dark:text-slate-200">{totalItems}</strong> entries
            </span>

            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200 dark:border-slate-700">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 border-none focus:outline-hidden"
              >
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={validPage <= 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                  validPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={validPage >= totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedTxn && (
        <OrderDetailModal
          transaction={selectedTxn}
          onClose={() => setSelectedTxn(null)}
        />
      )}
    </>
  );
}
