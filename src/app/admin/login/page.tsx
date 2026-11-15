'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@sharmabazaar.com');
  const [password, setPassword] = useState('Sharma@2026');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading, login } = useAuth();
  const router = useRouter();

  // If already logged in, redirect straight to /admin
  useEffect(() => {
    if (!loading && user) {
      router.replace('/admin');
    }
  }, [loading, user, router]);

  const handleLogin = async (e?: React.FormEvent, customRole?: UserRole, customEmail?: string) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const targetEmail = customEmail || email;
    const targetRole = customRole || role;

    const success = await login(targetEmail, password, targetRole);
    if (success) {
      window.location.href = '/admin';
    } else {
      setError('Invalid credentials or configuration. Please check your staff records.');
      setIsSubmitting(false);
    }
  };

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setEmail('admin@sharmabazaar.com');
    } else {
      setEmail('manager@sharmabazaar.com');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-xs font-mono tracking-widest uppercase text-neutral-400">Verifying Security Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-neutral-900">
      {/* Left Column: Architectural Showroom Brand Identity */}
      <div className="lg:w-1/2 bg-brand-navy text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-900 relative">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>

          <div className="space-y-4 max-w-md">
            <div className="w-12 h-12 rounded-sm bg-black overflow-hidden flex items-center justify-center border border-white/15 shrink-0 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sharma-bazaar-badge.png"
                alt="Sharma Bazaar Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Staff Authentication
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                Sharma Bazaar Operations Vault
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Internal showroom administration for catalog synchronization, distributor pricing adjustments, employee access governance, and physical store display units.
            </p>
          </div>
        </div>

        {/* Facility Spec Matrix */}
        <div className="pt-12 space-y-4">
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <p className="text-neutral-400 text-[10px] uppercase">SHOWROOM FACILITY</p>
              <p className="text-white font-bold mt-0.5">Physical Showroom</p>
              <p className="text-neutral-400 text-[10px]">Serving South Delhi</p>
            </div>
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <p className="text-neutral-400 text-[10px] uppercase">LOCATION</p>
              <p className="text-white font-bold mt-0.5">Masoodpur Dairy</p>
              <p className="text-neutral-400 text-[10px]">Vasant Kunj, Delhi</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
            <span>Role-Based Access Control (RBAC) Active · Authorized Personnel Only</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Minimalist Sign-in */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy">
              Sign In
            </h2>
            <p className="text-xs text-neutral-500 font-sans">
              Enter your assigned showroom credentials to enter the operations suite.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Role Segmented Controller */}
          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Select Clearance Level
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-sm border border-neutral-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className={`py-2 px-3 rounded-sm transition-all text-center ${
                  role === 'admin'
                    ? 'bg-brand-navy text-white font-bold shadow-subtle'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Administrator
              </button>
              <button
                type="button"
                onClick={() => handleSelectRole('shop_manager')}
                className={`py-2 px-3 rounded-sm transition-all text-center ${
                  role === 'shop_manager'
                    ? 'bg-brand-navy text-white font-bold shadow-subtle'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Shop Manager
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              {role === 'admin'
                ? 'Full administrative control including staff access & inventory.'
                : 'Restricted clearance: inventory & pricing adjustments only.'}
            </p>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-200 rounded-sm focus:outline-none focus:border-brand-navy transition-colors font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-200 rounded-sm focus:outline-none focus:border-brand-navy transition-colors font-mono text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-subtle"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Enter Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick-Fill Shortcuts in Clean Monospace */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>Dev Quick Fill:</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleLogin(undefined, 'admin', 'admin@sharmabazaar.com')}
                className="text-brand-navy font-semibold hover:underline"
              >
                Autofill Admin
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleLogin(undefined, 'shop_manager', 'manager@sharmabazaar.com')}
                className="text-brand-navy font-semibold hover:underline"
              >
                Autofill Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
