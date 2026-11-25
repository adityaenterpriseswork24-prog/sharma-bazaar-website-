'use client';

import { ShieldCheck, UserCheck, Lock } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminEmployeesPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      {/* Top Header */}
      <div className="pb-6 border-b border-neutral-200">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Access Control & Administration
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
          Showroom Administrator
        </h1>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Single Administrator Mode Active · All staff roles disabled
        </p>
      </div>

      {/* Security Status Card */}
      <div className="p-5 bg-white border border-neutral-200 rounded-sm space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-emerald-800 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Single-Admin Enforcement Active</span>
        </div>
        <p className="text-neutral-600 text-xs font-sans leading-relaxed">
          Per showroom security policy, multi-user staff logins have been disabled. All administrative operations,
          catalog updates, pricing revisions, and inventory controls are restricted exclusively to the primary
          showroom administrator.
        </p>
      </div>

      {/* Administrator Profile Card */}
      <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden">
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-800">
            <UserCheck className="w-4 h-4 text-brand-navy" />
            <span>Authorized Administrator Account</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold uppercase">
            Executive Admin
          </span>
        </div>

        <div className="p-6 space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm">
              <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Administrator Name</span>
              <span className="text-sm font-bold text-neutral-900 block mt-0.5">
                {user?.name || 'Aditya Enterprises (Showroom Admin)'}
              </span>
            </div>
            <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm">
              <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Authorized Email</span>
              <span className="text-sm font-bold text-neutral-900 block mt-0.5">
                {user?.email || 'adityaenterprises.work24@gmail.com'}
              </span>
            </div>
          </div>

          <div className="p-4 border border-neutral-200 rounded-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-neutral-600" />
            </div>
            <div>
              <p className="font-bold text-neutral-800 text-xs">Password Protected Vault</p>
              <p className="text-[11px] text-neutral-500 font-sans">
                Access requires manual password entry (<code className="text-brand-navy font-mono">Sharma@2026</code>) on each session. Automatic bypass and one-click logins are disabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
