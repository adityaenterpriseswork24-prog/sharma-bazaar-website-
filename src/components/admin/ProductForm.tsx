'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  AlertCircle,
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

    const stored = localStorage.getItem('sharma_admin_products');
    let currentList: Product[] = stored ? JSON.parse(stored) : [...INITIAL_PRODUCTS];

    if (isEdit) {
      currentList = currentList.map((p) => (p.id === productPayload.id ? productPayload : p));
    } else {
      currentList.unshift(productPayload);
    }

    localStorage.setItem('sharma_admin_products', JSON.stringify(currentList));

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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-white border border-neutral-200 text-neutral-600 hover:text-brand-navy rounded-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-navy">
              {isEdit ? 'Edit Showroom Product' : 'Add New Electronics Product'}
            </h1>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">
              Configure showroom pricing, verified specifications, and display inventory.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{submitting ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      {notification && (
        <div
          className={`p-3.5 rounded-sm text-xs font-mono flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-neutral-900 text-white'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Fieldset 1: General Info */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
          01 · Product Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Brand <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Sony, Daikin, Samsung, LG"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Model Number
            </label>
            <input
              type="text"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              placeholder="e.g. KD-55X74L"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Department Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy"
            >
              {ELECTRONICS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Subcategory Tag
            </label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="e.g. 55-inch 4K TV, 1.5 Ton 5-Star AC"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Product Overview &amp; Key Features
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description for customers visiting showroom or online catalogue..."
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy font-sans"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Fieldset 2: Pricing & Margins */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
          02 · Showroom Pricing &amp; Savings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Our Showroom Price (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              value={ourPrice || ''}
              onChange={(e) => setOurPrice(Number(e.target.value))}
              placeholder="e.g. 52990"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono font-bold text-brand-navy focus:outline-none focus:border-brand-navy"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Manufacturer MRP (₹)
            </label>
            <input
              type="number"
              value={mrpPrice || ''}
              onChange={(e) => setMrpPrice(Number(e.target.value))}
              placeholder="e.g. 59900"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
            />
          </div>
        </div>

        {hasSavings && (
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-500">Calculated Customer Savings:</span>
            <span className="font-bold text-emerald-700">
              Save {formatINR(savingsAmount)} ({discountPercent}% discount)
            </span>
          </div>
        )}
      </div>

      {/* Fieldset 3: Media */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
          03 · Imagery &amp; Photography
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Product Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
            />
          </div>

          {imageUrl && (
            <div className="flex items-center gap-4 p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
              <div className="w-16 h-16 bg-white border border-neutral-200 rounded-sm overflow-hidden p-1 shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
              </div>
              <span className="font-mono text-[11px] text-neutral-400">
                Live image frame verified
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Fieldset 4: Specifications */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            04 · Technical Specifications
          </h3>
          <button
            type="button"
            onClick={handleAddSpec}
            className="text-xs font-mono text-brand-navy hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Attribute</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {specs.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Specification (e.g. Screen Size)"
                value={item.key}
                onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                className="w-1/3 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-sm font-mono text-xs focus:outline-none focus:border-brand-navy"
              />
              <input
                type="text"
                placeholder="Value (e.g. 55 Inches / 4K UHD)"
                value={item.value}
                onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                className="flex-grow px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpec(idx)}
                className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
                title="Remove spec"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fieldset 5: Inventory Flags */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
          05 · Showroom Visibility &amp; Flags
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <label className="flex items-center gap-2.5 p-3 bg-neutral-50 border border-neutral-200 rounded-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded-sm text-brand-navy"
            />
            <span className="font-semibold text-neutral-800">Public Visible</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 bg-neutral-50 border border-neutral-200 rounded-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded-sm text-brand-navy"
            />
            <span className="font-semibold text-neutral-800">Featured Deal</span>
          </label>

          <div>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
              className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
            >
              <option value="in-stock">In-Stock Showroom</option>
              <option value="available-on-order">24h Dealer Order</option>
              <option value="limited-stock">Limited Display Stock</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Link
          href="/admin/products"
          className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-medium rounded-sm transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{submitting ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>
    </form>
  );
}
