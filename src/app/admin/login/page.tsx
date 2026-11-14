'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tv, Lock, Mail, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@sharmaelectronics.com');
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
      // Use hard redirect or replace to ensure fresh layout state
      window.location.href = '/admin';
    } else {
      setError('Invalid credentials or configuration. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (quickRole: UserRole) => {
    const quickEmail =
      quickRole === 'admin'
        ? 'admin@sharmaelectronics.com'
        : 'manager@sharmaelectronics.com';
    setEmail(quickEmail);
    setRole(quickRole);
    handleLogin(undefined, quickRole, quickEmail);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold">Checking Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="bg-brand-navy p-8 text-white text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Tv className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Staff Portal Login</h1>
          <p className="text-xs text-slate-300">
            Sharma Electronics Showroom Operations
          </p>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Quick Demo Login Buttons */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Instant 1-Click Access</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Select your role below to immediately enter the dashboard without typing:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                disabled={isSubmitting}
                className="py-2.5 px-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>⚡ Admin Login</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('shop_manager')}
                disabled={isSubmitting}
                className="py-2.5 px-3 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>⚡ Shop Manager</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="h-px bg-slate-200 w-full absolute"></span>
            <span className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Or Manual Sign In
            </span>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Staff Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Enter Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500">
              Masoodpur Dairy, Vasant Kunj · Authorized Store Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
