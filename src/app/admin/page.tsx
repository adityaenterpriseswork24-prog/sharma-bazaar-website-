'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  CheckCircle2,
  XCircle,
  PlusCircle,
  TrendingUp,
  Layers,
  Sparkles
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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Operational Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy mt-1">
            Welcome back, {user?.name || 'Staff Member'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage showroom display units, distributor catalogue prices, and product availability.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-blue-400" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Products</p>
            <p className="text-2xl font-black text-brand-navy">{totalProducts}</p>
            <p className="text-[10px] text-slate-400">In Showroom Database</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Displayed</p>
            <p className="text-2xl font-black text-emerald-700">{activeProducts}</p>
            <p className="text-[10px] text-emerald-600">Visible to Public</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Inactive / Archived</p>
            <p className="text-2xl font-black text-slate-700">{inactiveProducts}</p>
            <p className="text-[10px] text-slate-400">Hidden from Website</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Featured Best Sellers</p>
            <p className="text-2xl font-black text-amber-600">{featuredProducts}</p>
            <p className="text-[10px] text-slate-400">Homepage Spotlight</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown & Recently Updated Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              <span>Category Inventory</span>
            </h2>
            <Link href="/admin/products" className="text-xs font-semibold text-brand-blue hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {categoryStats.map((cat) => (
              <div key={cat.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{cat.name}</span>
                <span className="font-bold text-brand-navy bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {cat.count} models
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Updated Products */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Recently Updated Models</span>
            </h2>
            <Link href="/admin/products" className="text-xs font-semibold text-brand-blue hover:underline">
              Manage Catalogue
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Product Name</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Our Price</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-slate-900 max-w-[200px] truncate">
                      <Link href={`/admin/products/${p.id}/edit`} className="hover:text-brand-blue">
                        {p.name}
                      </Link>
                    </td>
                    <td className="py-3 text-slate-500 capitalize">{p.category.replace('-', ' ')}</td>
                    <td className="py-3 font-black text-brand-navy">{formatINR(p.ourPrice)}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
