'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
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

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('sharma_admin_products', JSON.stringify(updated));
  };

  const handleToggleActive = (id: string) => {
    let changedProduct: Product | undefined;
    const updated = products.map((p) => {
      if (p.id === id) {
        changedProduct = { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString() };
        return changedProduct;
      }
      return p;
    });
    saveProducts(updated);
    if (changedProduct) {
      try {
        fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(changedProduct),
        }).catch((e) => console.warn('API sync notice:', e));
      } catch {
        // ignore
      }
    }
    setNotification({ message: 'Product visibility status updated successfully.', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalogue?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
      try {
        fetch(`/api/products?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        }).catch((e) => console.warn('API sync notice:', e));
      } catch {
        // ignore
      }
      setNotification({ message: `"${name}" removed from inventory.`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset catalogue back to initial verified showroom models?')) {
      saveProducts(INITIAL_PRODUCTS);
      try {
        fetch('/api/products', {
          method: 'PUT',
        }).catch((e) => console.warn('API sync notice:', e));
      } catch {
        // ignore
      }
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
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Inventory Database
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
            Product Inventory
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Modify pricing, specifications, model numbers, and public visibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetToDefaults}
            className="px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-medium rounded-sm flex items-center gap-1.5 transition-colors border border-neutral-200"
            title="Reset defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
            <span>Reset Defaults</span>
          </button>

          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-sm bg-neutral-900 text-white text-xs font-mono flex items-center justify-between shadow-subtle">
          <span>{notification.message}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="p-4 bg-white border border-neutral-200 rounded-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, brand, or model number..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy font-sans"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono text-neutral-700 focus:outline-none focus:border-brand-navy"
          >
            <option value="all">All Departments</option>
            {ELECTRONICS_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* High-Precision Data Table */}
      <div className="border border-neutral-200 rounded-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                <th className="py-3.5 px-4">Product &amp; Model</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4 font-mono text-right">Showroom Price</th>
                <th className="py-3.5 px-4 font-mono text-right">MRP</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filtered.map((product) => {
                const { savingsAmount, hasSavings } = calculateSavings(product.mrpPrice, product.ourPrice);
                return (
                  <tr key={product.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-neutral-50 border border-neutral-200 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="max-w-xs sm:max-w-md">
                          <p className="font-semibold text-neutral-900 truncate">{product.name}</p>
                          <p className="font-mono text-[10px] text-neutral-400">
                            {product.brand} · {product.modelNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                      {product.category.replace('-', ' ')}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-brand-navy">
                      {formatINR(product.ourPrice)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-neutral-400 line-through">
                      {product.mrpPrice > 0 ? formatINR(product.mrpPrice) : '—'}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono">
                      <button
                        onClick={() => handleToggleActive(product.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                          product.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-neutral-100 text-neutral-500 border border-neutral-200 hover:bg-neutral-200'
                        }`}
                        title="Click to toggle visibility"
                      >
                        {product.isActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/electronics/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-neutral-400 hover:text-brand-navy transition-colors rounded-sm hover:bg-neutral-100"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-neutral-600 hover:text-brand-navy transition-colors rounded-sm hover:bg-neutral-100"
                          title="Edit product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors rounded-sm hover:bg-rose-50"
                          title="Delete from catalogue"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>Total records: {filtered.length}</span>
          <span>Sharma Bazaar Inventory Registry</span>
        </div>
      </div>
    </div>
  );
}
