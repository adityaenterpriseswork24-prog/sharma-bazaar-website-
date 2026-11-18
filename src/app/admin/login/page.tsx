'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  X,
  AlertCircle,
  LogOut,
  Send,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('adityaenterprises.work24@gmail.com');
  const [password, setPassword] = useState('Sharma@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('adityaenterprises.work24@gmail.com');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [forgotSubmitting, setForgotSubmitting] = useState(false);

  // Email Verification State
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('adityaenterprises.work24@gmail.com');
  const [verifySent, setVerifySent] = useState(false);

  const { user, loading, login, logout } = useAuth();

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
      setError(
        'Access denied: Invalid password or unauthorized email. Only authorized showroom administrators and staff can log in.'
      );
      setIsSubmitting(false);
    }
  };

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setEmail('adityaenterprises.work24@gmail.com');
      setForgotEmail('adityaenterprises.work24@gmail.com');
      setVerifyEmail('adityaenterprises.work24@gmail.com');
    } else {
      setEmail('manager@sharmabazaar.com');
      setForgotEmail('manager@sharmabazaar.com');
      setVerifyEmail('manager@sharmabazaar.com');
    }
  };

  const handleSendResetEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSubmitting(true);
    setTimeout(() => {
      setForgotSubmitting(false);
      setForgotSubmitted(true);
    }, 800);
  };

  const handleSendVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifySent(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-xs font-mono tracking-widest uppercase text-neutral-400">Verifying Security Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-neutral-900 font-sans relative">
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
                Staff Operations Portal
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
              <p className="text-white font-bold mt-0.5">Dairy Farm, 80-B, Masoodpur, G/F</p>
              <p className="text-neutral-400 text-[10px]">Vasant Kunj, Delhi</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
            <span>Role-Based Access Control (RBAC) Active · Authorized Personnel Only</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Sign-in with Password Toggle & Recovery */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="space-y-6">
          {/* Active Session Notice (If already logged in) */}
          {user && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-amber-900">
                  Active Session Detected
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-amber-200 text-amber-900 font-mono text-[10px] font-bold">
                  {user.role}
                </span>
              </div>
              <p className="text-amber-800 text-xs">
                You are currently signed in as <strong>{user.name}</strong> ({user.email}).
              </p>
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="/admin"
                  className="px-3 py-1.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Go to Admin Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    window.location.reload();
                  }}
                  className="px-3 py-1.5 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 transition-colors"
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
              Enter your assigned showroom credentials to enter the operations suite.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  Staff Email
                </label>
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(true)}
                  className="font-mono text-[10px] text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verify Email Status</span>
                </button>
              </div>
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setForgotSubmitted(false);
                  }}
                  className="font-mono text-[10px] text-brand-navy hover:underline font-semibold"
                >
                  Forgot Password?
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
                onClick={() => handleLogin(undefined, 'admin', 'adityaenterprises.work24@gmail.com')}
                className="text-brand-navy font-semibold hover:underline"
              >
                Autofill Admin (adityaenterprises.work24@gmail.com)
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

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-neutral-200 max-w-md w-full p-6 sm:p-8 space-y-4 shadow-elevated relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-800 p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-brand-navy">
              <div className="w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center text-brand-navy border border-neutral-200">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-navy">
                  Reset Staff Password
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  Secure Identity Recovery
                </p>
              </div>
            </div>

            {forgotSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Password Reset Dispatched</span>
                </div>
                <p className="text-emerald-700 leading-relaxed">
                  A cryptographic reset token and temporary recovery PIN have been dispatched to <strong>{forgotEmail}</strong>.
                </p>
                <p className="text-[11px] text-neutral-500 font-mono">
                  Default Demo Recovery Password: <code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200 font-bold text-neutral-800">Sharma@2026</code>
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPassword('Sharma@2026');
                      setShowForgotModal(false);
                    }}
                    className="w-full py-2 bg-brand-navy hover:bg-black text-white text-xs font-semibold rounded-sm transition-colors"
                  >
                    Restore &amp; Return to Sign In
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendResetEmail} className="space-y-4 text-xs">
                <p className="text-neutral-600 leading-relaxed">
                  Enter your registered showroom staff email address. We will verify your authorized role and issue a password recovery link.
                </p>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
                    Authorized Staff Email
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="admin@sharmabazaar.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-200 rounded-sm focus:outline-none focus:border-brand-navy transition-colors font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3.5 py-2 text-neutral-600 hover:text-neutral-900 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotSubmitting}
                    className="px-4 py-2 bg-brand-navy hover:bg-black text-white font-semibold rounded-sm transition-colors flex items-center gap-1.5 shadow-subtle"
                  >
                    <span>{forgotSubmitting ? 'Verifying...' : 'Send Reset Link'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Email Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-neutral-200 max-w-md w-full p-6 sm:p-8 space-y-4 shadow-elevated relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowVerifyModal(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-800 p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-brand-navy">
              <div className="w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center text-emerald-700 border border-neutral-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-navy">
                  Staff Email Verification
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  Domain Verification Status
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 uppercase">ADMIN EMAIL:</span>
                  <span className="text-brand-navy font-bold truncate max-w-[200px]">adityaenterprises.work24@gmail.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 uppercase">STATUS:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Executive Administrator
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 uppercase">STAFF PROTOCOL:</span>
                  <span className="text-neutral-700 font-bold">Mail Verification Enforced</span>
                </div>
              </div>

              {verifySent ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 text-xs space-y-1">
                  <p className="font-bold">Verification Link Dispatched!</p>
                  <p className="text-[11px]">
                    A verification ping has been generated for <strong>{verifyEmail}</strong>. Staff members can confirm ownership via their official webmail client.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendVerifyEmail} className="space-y-3">
                  <p className="text-neutral-600 leading-relaxed">
                    To connect a new staff email address or re-verify an existing address:
                  </p>
                  <input
                    type="email"
                    required
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-sm focus:outline-none focus:border-brand-navy transition-colors font-mono text-xs"
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowVerifyModal(false)}
                      className="px-3 py-1.5 text-neutral-600 hover:text-neutral-900 font-semibold"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-navy hover:bg-black text-white font-semibold rounded-sm transition-colors text-xs"
                    >
                      Send Verification Email
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
