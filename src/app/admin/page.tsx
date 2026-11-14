'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { formatINR } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    const cached = localStorage.getItem('sharma_admin_products');
    if (cached) {
      try {
        setProducts(JSON.parse(cached));
      } catch {
        // ignore
      }
    } else {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
          if (data?.products && Array.isArray(data.products)) {
            setProducts(data.products);
          }
        })
        .catch(() => {});
    }
  }, []);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const inactiveProducts = totalProducts - activeProducts;
  const featuredProducts = products.filter((p) => p.isFeatured).length;

  const categoryStats = ELECTRONICS_CATEGORIES.map((cat) => ({
    name: cat.name,
    id: cat.id,
    count: products.filter((p) => p.category === cat.id).length,
  }));

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Operations Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
            Dashboard Overview
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Logged in as {user?.name} · {user?.role === 'admin' ? 'Executive Administrator' : 'Showroom Manager'}
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-subtle shrink-0"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-5 bg-white border border-neutral-200 rounded-sm space-y-1">
          <p className="text-neutral-400 text-[10px] uppercase">TOTAL INVENTORY</p>
          <p className="text-2xl font-bold text-brand-navy font-sans">{totalProducts}</p>
          <p className="text-neutral-500 text-[11px]">Showroom Models</p>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-sm space-y-1">
          <p className="text-neutral-400 text-[10px] uppercase">ACTIVE ON DISPLAY</p>
          <p className="text-2xl font-bold text-emerald-700 font-sans">{activeProducts}</p>
          <p className="text-neutral-500 text-[11px]">Visible to Customers</p>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-sm space-y-1">
          <p className="text-neutral-400 text-[10px] uppercase">HIDDEN / ARCHIVED</p>
          <p className="text-2xl font-bold text-neutral-500 font-sans">{inactiveProducts}</p>
          <p className="text-neutral-400 text-[11px]">Out of Stock</p>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-sm space-y-1">
          <p className="text-neutral-400 text-[10px] uppercase">FEATURED DEALS</p>
          <p className="text-2xl font-bold text-amber-700 font-sans">{featuredProducts}</p>
          <p className="text-neutral-500 text-[11px]">Homepage Spotlight</p>
        </div>
      </div>

      {/* Split Grid: Category Breakdown + Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Breakdown */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy font-mono">
              Category Distribution
            </h2>
            <Link href="/admin/products" className="text-xs font-mono text-neutral-500 hover:text-brand-navy hover:underline">
              Inventory &rarr;
            </Link>
          </div>

          <div className="space-y-2 pt-2">
            {categoryStats.map((cat) => (
              <div
                key={cat.id}
                className="p-3 bg-neutral-50 border border-neutral-100 rounded-sm flex items-center justify-between text-xs font-mono"
              >
                <span className="font-semibold text-neutral-800 font-sans">{cat.name}</span>
                <span className="font-bold text-brand-navy bg-white px-2 py-0.5 rounded-sm border border-neutral-200">
                  {cat.count} units
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Updated Products */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy font-mono">
              Recently Synchronized Models
            </h2>
            <Link href="/admin/products" className="text-xs font-mono text-neutral-500 hover:text-brand-navy hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="border border-neutral-200 rounded-sm divide-y divide-neutral-200 text-xs">
            {recentProducts.map((p) => (
              <div key={p.id} className="p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div className="space-y-0.5 max-w-sm">
                  <p className="font-semibold text-neutral-900 truncate font-sans">{p.name}</p>
                  <p className="text-[11px] font-mono text-neutral-400">
                    {p.brand} · Model: {p.modelNumber}
                  </p>
                </div>
                <div className="text-right font-mono">
                  <p className="font-bold text-brand-navy">{formatINR(p.ourPrice)}</p>
                  <span
                    className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm font-semibold ${
                      p.isActive
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-neutral-500 bg-neutral-100'
                    }`}
                  >
                    {p.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
