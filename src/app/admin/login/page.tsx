'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  LogOut,
  Zap,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('adityaenterprises.work24@gmail.com');
  const [password, setPassword] = useState('Sharma@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const { user, loading, login, logout } = useAuth();

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPassword?: string) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const targetEmail = (customEmail || email).trim();
    const targetPassword = (customPassword || password).trim();

    try {
      const success = await login(targetEmail, targetPassword);
      if (success) {
        window.location.href = '/admin';
      } else {
        setError(
          'Access denied: Incorrect password or unauthorized email. Please verify your showroom credentials.'
        );
        setIsSubmitting(false);
      }
    } catch {
      setError('Connection error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleQuickLoginOwner = () => {
    setEmail('adityaenterprises.work24@gmail.com');
    setPassword('Sharma@2026');
    handleLogin(undefined, 'adityaenterprises.work24@gmail.com', 'Sharma@2026');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-xs font-mono tracking-widest uppercase text-neutral-400">
            Verifying Security Session...
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
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Showroom Operations Suite
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                Sharma Bazaar Staff Portal
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Manage live showroom inventory, homepage hero models, promotional counter quotes,
              and physical store display settings.
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
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
            <span>Authorized Showroom Administrators Only</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean, Friction-Free Sign-in */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="space-y-6">
          {/* Active Session Notice (If already logged in) */}
          {user && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Already Authenticated</span>
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
                  <span>Go to Operations Dashboard</span>
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
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy">
              Sign In
            </h2>
            <p className="text-xs text-neutral-500 font-sans">
              Enter your showroom credentials to access the management dashboard.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick One-Click Owner Login Button */}
          <button
            type="button"
            onClick={handleQuickLoginOwner}
            disabled={isSubmitting}
            className="w-full py-2.5 px-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 rounded-sm text-xs font-medium text-brand-navy flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="text-left">
                <span className="font-semibold block text-[11px] text-neutral-900">
                  Quick Access: Showroom Owner
                </span>
                <span className="font-mono text-[10px] text-neutral-500">
                  adityaenterprises.work24@gmail.com
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-brand-navy font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Sign In <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-neutral-200 w-full"></div>
            <span className="bg-white px-2.5 font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
              Or enter credentials
            </span>
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
                  placeholder="adityaenterprises.work24@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-200 rounded-sm focus:outline-none focus:border-brand-navy transition-colors font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="font-mono text-[10px] text-brand-navy hover:underline flex items-center gap-1 font-semibold"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Show Credentials</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-neutral-200 rounded-sm focus:outline-none focus:border-brand-navy transition-colors font-mono text-xs"
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

            {/* In-page Credential Helper Card */}
            {showHelp && (
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1.5 font-mono text-[11px] animate-in fade-in duration-150">
                <p className="font-bold text-neutral-800">Showroom Administrator Credentials:</p>
                <div className="space-y-0.5 text-neutral-600">
                  <p>• Email: <strong className="text-neutral-900">adityaenterprises.work24@gmail.com</strong></p>
                  <p>• Password: <strong className="text-neutral-900">Sharma@2026</strong></p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('adityaenterprises.work24@gmail.com');
                    setPassword('Sharma@2026');
                  }}
                  className="mt-1 text-xs text-brand-navy font-bold hover:underline"
                >
                  Autofill these credentials
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-subtle"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Enter Operations Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
