'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth-context';

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
      <div className="min-h-screen flex items-center justify-center bg-brand-navy text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            {loading ? 'Verifying Staff Authorization...' : 'Redirecting to Login...'}
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
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar: Linear / Stripe style */}
      <aside className="w-full md:w-64 bg-brand-navy text-neutral-300 flex flex-col justify-between shrink-0 border-r border-neutral-800">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-black overflow-hidden flex items-center justify-center border border-white/15 shrink-0 relative">
                <Image
                  src="/images/sharma-bazaar-badge.png"
                  alt="Sharma Bazaar Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  Operations Vault
                </span>
                <span className="text-[10px] font-mono text-neutral-400 block">
                  Sharma Bazaar
                </span>
              </div>
            </Link>
          </div>

          {/* User Status Bar */}
          <div className="p-4 mx-3 my-4 rounded-sm bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs">
            <div className="truncate max-w-[130px]">
              <p className="font-bold text-white text-[11px] truncate">{user.name}</p>
              <p className="text-[10px] text-neutral-400 truncate">{user.email}</p>
            </div>
            <span
              className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold ${
                user.role === 'admin'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}
            >
              {user.role === 'admin' ? 'Admin' : 'Shop Mgr'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 font-mono text-xs">
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null;
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-bold border-l-2 border-white'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.adminOnly && (
                    <span className="text-[9px] text-neutral-500 uppercase">
                      Admin
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 font-mono text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Showroom</span>
            </span>
          </Link>

          <button
            onClick={async () => {
              await logout();
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-neutral-400 hover:text-rose-400 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-grow p-6 sm:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
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
