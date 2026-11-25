'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  LogOut,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminLoginPage() {
  const [email] = useState('adityaenterprises.work24@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, loading, login, logout } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your administrator password.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        window.location.href = '/admin';
      } else {
        setError('Access denied: Incorrect administrator password. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      setError('Connection error during authentication. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-xs font-mono tracking-widest uppercase text-neutral-400">
            Verifying Administrator Session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-neutral-900 font-sans relative">
      {/* Left Column: Showroom Brand Identity */}
      <div className="lg:w-1/2 bg-brand-navy text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-900 relative">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>

          <div className="space-y-4 max-w-md">
            <div className="w-12 h-12 rounded-sm bg-black overflow-hidden flex items-center justify-center border border-white/15 shrink-0 shadow-sm relative">
              <Image
                src="/images/sharma-bazaar-badge.png"
                alt="Sharma Bazaar Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                Single Administrator Portal
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                Sharma Bazaar Admin Vault
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Secure operations vault for physical showroom inventory, real-time distributor pricing,
              homepage hero configurations, and store management.
            </p>
          </div>
        </div>

        {/* Facility Details */}
        <div className="pt-12 space-y-4">
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <p className="text-neutral-400 text-[10px] uppercase">SHOWROOM FACILITY</p>
              <p className="text-white font-bold mt-0.5">Physical Showroom</p>
              <p className="text-neutral-400 text-[10px]">Serving South Delhi</p>
            </div>
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <p className="text-neutral-400 text-[10px] uppercase">LOCATION</p>
              <p className="text-white font-bold mt-0.5">Dairy Farm, 80-B, Masoodpur, G/F</p>
              <p className="text-neutral-400 text-[10px]">Vasant Kunj, Delhi</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Strict Single-Admin Access Control Enforced</span>
          </div>
        </div>
      </div>

      {/* Right Column: Secure Password Sign-in */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="space-y-6">
          {/* Active Session Notice (If already logged in in this session) */}
          {user && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Authenticated Session Active</span>
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-emerald-200 text-emerald-900 font-mono text-[10px] font-bold uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-emerald-800 text-xs">
                You are currently signed in as <strong>{user.name}</strong> ({user.email}).
              </p>
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="/admin"
                  className="px-3.5 py-2 bg-brand-navy hover:bg-black text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 transition-colors shadow-subtle"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    window.location.reload();
                  }}
                  className="px-3.5 py-2 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-sm bg-brand-navy text-white flex items-center justify-center shrink-0">
                <KeyRound className="w-4 h-4 text-amber-300" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-brand-navy">
                Admin Authentication
              </h2>
            </div>
            <p className="text-xs text-neutral-500 font-sans">
              Enter the showroom administrator password to unlock operations.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Admin Account Identity Box */}
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm font-mono text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-neutral-400 block font-semibold">
                Authorized Administrator
              </span>
              <span className="font-semibold text-neutral-900 text-xs block">
                Aditya Enterprises
              </span>
              <span className="text-[11px] text-neutral-500 block">
                adityaenterprises.work24@gmail.com
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-sm bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase">
              Single Admin
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-600 font-semibold mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-3 bg-white border border-neutral-300 rounded-sm focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'View password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-brand-navy" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating Password...' : 'Unlock Operations Vault'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>Protected by In-App WAF Shield</span>
            <span>Rate-Limited Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
