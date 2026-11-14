'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Percent,
} from 'lucide-react';
import Link from 'next/link';
import { Product, ProductCategory, AvailabilityStatus } from '@/types';
import { ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { formatINR, calculateSavings } from '@/lib/utils';

interface ProductFormProps {
  initialProduct?: Product;
  isEdit?: boolean;
}

export function ProductForm({ initialProduct, isEdit = false }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialProduct?.name || '');
  const [brand, setBrand] = useState(initialProduct?.brand || '');
  const [modelNumber, setModelNumber] = useState(initialProduct?.modelNumber || '');
  const [category, setCategory] = useState<ProductCategory>(
    initialProduct?.category || 'televisions'
  );
  const [subcategory, setSubcategory] = useState(initialProduct?.subcategory || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [ourPrice, setOurPrice] = useState<number>(initialProduct?.ourPrice || 0);
  const [mrpPrice, setMrpPrice] = useState<number>(initialProduct?.mrpPrice || 0);
  const [imageUrl, setImageUrl] = useState(
    initialProduct?.imageUrl ||
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
  );
  const [availability, setAvailability] = useState<AvailabilityStatus>(
    initialProduct?.availability || 'in-stock'
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialProduct !== undefined ? initialProduct.isActive : true
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    initialProduct !== undefined ? initialProduct.isFeatured : false
  );

  // Specifications key-value pairs
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
    initialProduct?.specifications
      ? Object.entries(initialProduct.specifications).map(([key, value]) => ({ key, value }))
      : [
          { key: 'Warranty', value: '1 Year Brand Comprehensive Warranty' },
          { key: 'Power / Capacity', value: '' },
        ]
  );

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  // Calculate live savings
  const { savingsAmount, discountPercent, hasSavings } = calculateSavings(mrpPrice, ourPrice);

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', text: string) => {
    const updated = [...specs];
    updated[index][field] = text;
    setSpecs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!name.trim() || !brand.trim() || ourPrice <= 0) {
      setNotification({ message: 'Please complete all required fields.', type: 'error' });
      setSubmitting(false);
      return;
    }

    // Convert specs to map
    const specMap: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim()) {
        specMap[s.key.trim()] = s.value.trim();
      }
    });

    const slug =
      initialProduct?.slug ||
      `${brand}-${name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const productPayload: Product = {
      id: initialProduct?.id || `prod-${Date.now()}`,
      slug,
      name,
      brand,
      modelNumber,
      category,
      subcategory,
      description,
      specifications: specMap,
      ourPrice: Number(ourPrice),
      mrpPrice: Number(mrpPrice),
      imageUrl,
      gallery: [imageUrl],
      isActive,
      isFeatured,
      availability,
      createdAt: initialProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage admin catalogue
    const stored = localStorage.getItem('sharma_admin_products');
    let currentList: Product[] = stored ? JSON.parse(stored) : [...INITIAL_PRODUCTS];

    if (isEdit) {
      currentList = currentList.map((p) => (p.id === productPayload.id ? productPayload : p));
    } else {
      currentList.unshift(productPayload);
    }

    localStorage.setItem('sharma_admin_products', JSON.stringify(currentList));

    // Persist via API to store file
    try {
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload),
      }).catch((e) => console.warn('API sync notice:', e));
    } catch {
      // ignore
    }

    setNotification({
      message: isEdit ? 'Product updated successfully.' : 'Product published to showroom catalogue.',
      type: 'success',
    });

    setTimeout(() => {
      router.push('/admin/products');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-brand-blue"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-brand-navy">
              {isEdit ? 'Edit Showroom Product' : 'Add New Electronics Product'}
            </h1>
            <p className="text-xs text-slate-500">
              Manage product pricing, brand verification and specifications.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <Save className="w-4 h-4 text-emerald-400" />
          <span>{submitting ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Basic Info Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. General Product Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">
              Full Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Brand <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Sony, Daikin, Samsung, LG"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Model Number</label>
            <input
              type="text"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              placeholder="e.g. KD-55X74L"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
            >
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subcategory / Tag</label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="e.g. Inverter Split AC, Google Smart TV"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed sales summary, key technologies, energy efficiency, and warranty features."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Pricing & Savings Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Showroom Pricing &amp; Savings Calculations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Our Showroom Price (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              min={0}
              value={ourPrice || ''}
              onChange={(e) => setOurPrice(Number(e.target.value))}
              placeholder="e.g. 52990"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue font-bold text-base text-brand-navy"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Official MRP Price (₹)
            </label>
            <input
              type="number"
              min={0}
              value={mrpPrice || ''}
              onChange={(e) => setMrpPrice(Number(e.target.value))}
              placeholder="e.g. 79900"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Live Savings Preview Banner */}
          <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Calculated Customer Savings</p>
                <p className="text-xs text-slate-500">
                  {hasSavings
                    ? `Customer saves ${formatINR(savingsAmount)} (${discountPercent}% OFF)`
                    : 'No discount vs MRP calculated'}
                </p>
              </div>
            </div>
            {hasSavings && (
              <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-xs">
                {formatINR(savingsAmount)} OFF
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Image & Availability Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          3. Media &amp; Inventory Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">
              Primary Product Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Showroom Stock Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
            >
              <option value="in-stock">In Stock / Showroom Display</option>
              <option value="on-demand">On Demand (24h Procurement)</option>
              <option value="limited-display">Limited Display Units</option>
            </select>
          </div>

          <div className="flex items-center gap-6 pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-brand-blue"
              />
              <span className="font-semibold text-slate-800">Active (Public)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500"
              />
              <span className="font-semibold text-slate-800">Homepage Spotlight</span>
            </label>
          </div>
        </div>
      </div>

      {/* Specifications Dynamic Builder */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            4. Technical Specifications Table
          </h3>
          <button
            type="button"
            onClick={handleAddSpec}
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Specification Row</span>
          </button>
        </div>

        <div className="space-y-3">
          {specs.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Feature (e.g. Capacity)"
                value={item.key}
                onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                className="w-1/3 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <input
                type="text"
                placeholder="Value (e.g. 1.5 Ton 5-Star)"
                value={item.value}
                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                className="flex-grow px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpec(index)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                title="Remove specification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Link
          href="/admin/products"
          className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md"
        >
          {submitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}
