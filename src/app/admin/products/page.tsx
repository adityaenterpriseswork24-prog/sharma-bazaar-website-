'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
  Star,
} from 'lucide-react';
import { Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { formatINR, calculateSavings } from '@/lib/utils';
import { db, isFirebaseConfigured } from '@/lib/firebase/client';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [loading, setLoading] = useState(true);

  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    try {
      const stored = localStorage.getItem('sharma_admin_session');
      if (stored) {
        headers['Authorization'] = `Bearer ${encodeURIComponent(stored)}`;
      }
    } catch {
      // ignore
    }
    return headers;
  };

  const loadProducts = async () => {
    try {
      // 1. Populate immediately from localStorage
      let localList: Product[] = [];
      try {
        const stored = localStorage.getItem('sharma_admin_products');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            localList = parsed;
            setProducts(parsed);
          }
        }
      } catch {
        // ignore
      }

      // 2. Fetch authoritative server catalogue from /api/products
      const res = await fetch('/api/products');
      const data = await res.json();
      let authoritativeList: Product[] = [];
      if (data?.products && Array.isArray(data.products) && data.products.length > 0) {
        authoritativeList = data.products;
      } else {
        authoritativeList = [...INITIAL_PRODUCTS];
      }

      // 3. Merge any pending local modifications if present
      if (localList.length > 0) {
        const localMap = new Map(localList.map((p) => [p.id, p]));
        authoritativeList = authoritativeList.map((sp) => localMap.get(sp.id) || sp);
      }

      setProducts(authoritativeList);
      localStorage.setItem('sharma_admin_products', JSON.stringify(authoritativeList));
      setLoading(false);
      return;
    } catch (err) {
      console.warn('API error, using local storage cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleToggleActive = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    const updatedProduct = {
      ...target,
      isActive: !target.isActive,
      updatedAt: new Date().toISOString(),
    };

    // Update state and localStorage immediately
    const updatedList = products.map((p) => (p.id === id ? updatedProduct : p));
    setProducts(updatedList);
    try {
      localStorage.setItem('sharma_admin_products', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('sharma_products_updated'));
    } catch {}

    setNotification({
      message: `"${target.name}" is now ${updatedProduct.isActive ? 'live on display' : 'hidden from public view'}.`,
      type: 'success',
    });

    // Cloud Firestore Sync
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'products', id), updatedProduct);
      } catch (e) {
        console.warn('Firestore toggle note:', e);
      }
    }

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updatedProduct),
      });
    } catch (err) {
      console.warn('Server sync note (saved locally):', err);
    }

    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleCategoryHero = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    const nextHeroState = !target.isCategoryHero;

    // Update list: ensure only 1 hero exists for this category
    const updatedList = products.map((p) => {
      if (p.category.toLowerCase() === target.category.toLowerCase()) {
        if (p.id === target.id) {
          return {
            ...p,
            isCategoryHero: nextHeroState,
            isActive: nextHeroState ? true : p.isActive, // Hero must be active
            updatedAt: new Date().toISOString(),
          };
        } else if (nextHeroState) {
          return {
            ...p,
            isCategoryHero: false,
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return p;
    });

    setProducts(updatedList);
    try {
      localStorage.setItem('sharma_admin_products', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('sharma_products_updated'));
    } catch {}

    const catName = target.category.replace('-', ' ');
    setNotification({
      message: nextHeroState
        ? `⭐ "${target.name}" is now the homepage showcase hero for ${catName}.`
        : `Removed hero designation from "${target.name}".`,
      type: 'success',
    });

    // Cloud Firestore Sync
    if (isFirebaseConfigured && db) {
      try {
        const updatedTarget = updatedList.find((p) => p.id === target.id);
        if (updatedTarget) {
          await setDoc(doc(db, 'products', target.id), updatedTarget);
        }
        if (nextHeroState) {
          const prevHero = products.find(
            (p) =>
              p.category.toLowerCase() === target.category.toLowerCase() &&
              p.isCategoryHero &&
              p.id !== target.id
          );
          if (prevHero) {
            await setDoc(doc(db, 'products', prevHero.id), {
              ...prevHero,
              isCategoryHero: false,
              updatedAt: new Date().toISOString(),
            });
          }
        }
      } catch (e) {
        console.warn('Firestore hero sync note:', e);
      }
    }

    // Server API Sync
    try {
      const updatedTarget = updatedList.find((p) => p.id === target.id);
      if (updatedTarget) {
        await fetch('/api/products', {
          method: 'POST',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify(updatedTarget),
        });
      }
    } catch (err) {
      console.warn('Server sync note:', err);
    }

    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the catalogue?`)) {
      return;
    }

    const updatedList = products.filter((p) => p.id !== id);
    setProducts(updatedList);
    try {
      localStorage.setItem('sharma_admin_products', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('sharma_products_updated'));
    } catch {}

    setNotification({ message: `"${name}" removed from catalogue.`, type: 'success' });

    // Cloud Firestore Delete
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (e) {
        console.warn('Firestore delete note:', e);
      }
    }

    try {
      await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (err) {
      console.warn('Server sync note (removed locally):', err);
    }

    setTimeout(() => setNotification(null), 3000);
  };

  const handleResetToDefaults = async () => {
    if (!confirm('Reset catalogue back to initial verified showroom models? This will restore default items.')) {
      return;
    }

    try {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('sharma_admin_products', JSON.stringify(INITIAL_PRODUCTS));
      window.dispatchEvent(new Event('sharma_products_updated'));

      await fetch('/api/products', {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      setNotification({ message: 'Catalogue reset to default showroom items.', type: 'success' });
    } catch (err: unknown) {
      console.warn('Reset server note:', err);
      setNotification({ message: 'Catalogue reset to default showroom items.', type: 'success' });
    }

    setTimeout(() => setNotification(null), 3500);
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
                <th className="py-3.5 px-4 text-center">Homepage Hero</th>
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
                        <div className="w-10 h-10 rounded-sm bg-neutral-50 border border-neutral-200 overflow-hidden shrink-0 p-1 flex items-center justify-center relative">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={36}
                            height={36}
                            className="object-contain"
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

                    <td className="py-3.5 px-4 text-center font-mono">
                      <button
                        onClick={() => handleToggleCategoryHero(product.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                          product.isCategoryHero
                            ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 shadow-xs'
                            : 'bg-neutral-50 text-neutral-400 border border-neutral-200 hover:text-neutral-700 hover:bg-neutral-100'
                        }`}
                        title={
                          product.isCategoryHero
                            ? `Designated showcase hero for ${product.category.replace('-', ' ')} on homepage`
                            : `Click to make this the homepage showcase model for ${product.category.replace('-', ' ')}`
                        }
                      >
                        <Star
                          className={`w-3 h-3 ${
                            product.isCategoryHero
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-neutral-400'
                          }`}
                        />
                        <span>{product.isCategoryHero ? 'Hero Model' : 'Set Hero'}</span>
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
