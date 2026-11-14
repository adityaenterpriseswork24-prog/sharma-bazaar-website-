'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Tv,
  AlertCircle
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { isFirebaseConfigured } from '@/lib/firebase/client';

function AdminNavigation({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [loading, user, pathname, router]);

  // If on /admin/login, don't show the dashboard sidebar wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold">
            {loading ? 'Verifying Staff Authorization...' : 'Redirecting to Staff Login...'}
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Product Inventory', href: '/admin/products', icon: Package },
    { label: 'Add New Product', href: '/admin/products/new', icon: PlusCircle },
    { label: 'Staff & Roles', href: '/admin/employees', icon: Users, adminOnly: true },
    { label: 'Showroom Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Brand Logo in Admin */}
          <div className="p-6 border-b border-slate-800">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-extrabold text-white">Sharma Staff</span>
                <span className="block text-[10px] text-slate-400">Inventory &amp; Operations</span>
              </div>
            </Link>
          </div>

          {/* User Badge */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{user.email}</p>
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                user.role === 'admin'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}
            >
              {user.role === 'admin' ? 'Admin' : 'Shop Mgr'}
            </span>
          </div>

          {/* Nav Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null;
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.adminOnly && (
                    <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </span>
          </Link>

          <button
            onClick={async () => {
              await logout();
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {!isFirebaseConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Firebase Configuration Notice</p>
              <p className="text-amber-700 mt-0.5">
                Firebase keys are not yet set in `.env.local`. Running in seamless internal evaluation mode.
                All product mutations, status toggles, and catalog management function live in the active session.
              </p>
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminNavigation>{children}</AdminNavigation>
    </AuthProvider>
  );
}
