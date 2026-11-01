import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { StatusBadge } from '../components/common/Badge';
import { TableSkeleton } from '../components/common/SkeletonLoader';
import { Users, Building, ShieldCheck, Mail, MapPin } from 'lucide-react';

export function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      setIsLoading(true);
      try {
        const res = await mockApi.getCustomers();
        setCustomers(res.data);
      } finally {
        setIsLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
            <Users className="w-3 h-3" />
            Audience & Accounts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Client Directory & Accounts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage key enterprise partners, account tiers, and contract statuses.
        </p>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Primary Enterprise Clients
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {customers.length} Accounts
          </span>
        </div>

        {isLoading ? (
          <TableSkeleton rows={4} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6">Customer / Contact</th>
                  <th className="py-3 px-4">Organization</th>
                  <th className="py-3 px-4">Account Tier</th>
                  <th className="py-3 px-4">Lifetime Value</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {customers.map(c => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {c.name}
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {c.email}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {c.company}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        <ShieldCheck className="w-3 h-3" />
                        {c.tier}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                      {c.spent}
                    </td>
                    <td className="py-4 px-4 text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {c.location}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
