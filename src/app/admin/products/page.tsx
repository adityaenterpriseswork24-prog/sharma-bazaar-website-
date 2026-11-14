'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { formatINR, calculateSavings } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('sharma_admin_products', JSON.stringify(updated));
  };

  const handleToggleActive = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    saveProducts(updated);
    setNotification({ message: 'Product visibility status updated successfully.', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalogue?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
      setNotification({ message: `"${name}" removed from inventory.`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset catalogue back to initial verified showroom models?')) {
      saveProducts(INITIAL_PRODUCTS);
      setNotification({ message: 'Catalogue reset to default showroom items.', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filtered = products.filter((p) => {
    const matchesCat = category === 'all' || p.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.modelNumber.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">Product Inventory</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Create, modify prices, update specifications, and toggle showroom display units.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Reset to default models"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, model..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 bg-white"
          >
            <option value="all">All Categories ({products.length})</option>
            {ELECTRONICS_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Brand &amp; Model</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Showroom Price</th>
                <th className="py-3.5 px-4">MRP &amp; Savings</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const { savingsAmount, discountPercent, hasSavings } = calculateSavings(
                  p.mrpPrice,
                  p.ourPrice
                );
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Item Image & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="max-w-[220px]">
                          <p className="font-bold text-slate-900 truncate">{p.name}</p>
                          <Link
                            href={`/electronics/${p.slug}`}
                            target="_blank"
                            className="text-[11px] text-brand-blue hover:underline inline-flex items-center gap-1"
                          >
                            <span>Preview Live Page</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      </div>
                    </td>

                    {/* Brand & Model */}
                    <td className="py-3 px-4 font-medium">
                      <p className="text-slate-900 font-semibold">{p.brand}</p>
                      <p className="text-slate-400 font-mono text-[11px]">{p.modelNumber}</p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 capitalize text-slate-600 font-medium">
                      {p.category.replace('-', ' ')}
                    </td>

                    {/* Our Price */}
                    <td className="py-3 px-4 font-black text-brand-navy text-sm">
                      {formatINR(p.ourPrice)}
                    </td>

                    {/* MRP & Savings */}
                    <td className="py-3 px-4">
                      <p className="text-slate-400 line-through text-[11px]">
                        MRP {formatINR(p.mrpPrice)}
                      </p>
                      {hasSavings && (
                        <p className="text-emerald-700 font-bold text-[11px]">
                          Save {formatINR(savingsAmount)} ({discountPercent}%)
                        </p>
                      )}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(p.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                          p.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle visibility"
                      >
                        {p.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-slate-400" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-brand-blue hover:bg-slate-100 transition-colors"
                          title="Edit product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
