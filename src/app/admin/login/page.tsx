'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tv, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@sharmaelectronics.com');
  const [password, setPassword] = useState('Sharma@2026');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const success = await login(email, password, role);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid credentials or Firebase configuration missing. Please try again.');
      setIsSubmitting(false);
    }
  };

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

          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
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

            {/* Role Switcher for RBAC Testing */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Select Testing Role (RBAC):
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setRole('admin');
                    setEmail('admin@sharmaelectronics.com');
                  }}
                  className={`py-2 px-3 rounded-lg font-bold border transition-colors ${
                    role === 'admin'
                      ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Admin (Full Access)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('shop_manager');
                    setEmail('manager@sharmaelectronics.com');
                  }}
                  className={`py-2 px-3 rounded-lg font-bold border transition-colors ${
                    role === 'shop_manager'
                      ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Shop Manager
                </button>
              </div>
              <p className="text-[10px] text-slate-500">
                {role === 'admin'
                  ? 'Full administrative control including staff & role management.'
                  : 'Restricted to inventory catalog management. Employee management blocked.'}
              </p>
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
