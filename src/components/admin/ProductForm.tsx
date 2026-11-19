'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  X,
  FileCheck,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { Product, ProductCategory, AvailabilityStatus } from '@/types';
import { ELECTRONICS_CATEGORIES } from '@/data/site-config';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { formatINR, calculateSavings } from '@/lib/utils';
import { db, isFirebaseConfigured } from '@/lib/firebase/client';
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';

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
      '/images/showroom/sharma-bazaar-showroom-interior.jpg'
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
  const [isCategoryHero, setIsCategoryHero] = useState<boolean>(
    initialProduct !== undefined ? Boolean(initialProduct.isCategoryHero) : false
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP, AVIF).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Include auth headers
      const headers: Record<string, string> = {};
      try {
        const stored = localStorage.getItem('sharma_admin_session');
        if (stored) headers['Authorization'] = `Bearer ${encodeURIComponent(stored)}`;
      } catch {}

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Server upload failed');
      }

      setImageUrl(data.url);
    } catch (err: unknown) {
      console.warn('Direct upload server fallback to compressed base64:', err);
      // High performance client-side compression fallback via HTML5 canvas
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 900;
            const MAX_HEIGHT = 900;
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              setImageUrl(canvas.toDataURL('image/jpeg', 0.82));
            } else {
              setImageUrl(e.target?.result as string);
            }
          };
          img.onerror = () => {
            if (e.target?.result) setImageUrl(e.target.result as string);
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } catch {
        // ignore
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setNotification(null);

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
      gallery:
        initialProduct?.gallery && initialProduct.gallery.length > 0
          ? initialProduct.gallery.includes(imageUrl)
            ? initialProduct.gallery
            : [imageUrl, ...initialProduct.gallery.filter((g) => g !== imageUrl)]
          : [imageUrl],
      isActive: isCategoryHero ? true : isActive,
      isFeatured,
      isCategoryHero,
      availability,
      createdAt: initialProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // 1. Persist to localStorage immediately so user input is NEVER lost
      try {
        const stored = localStorage.getItem('sharma_admin_products');
        let currentList: Product[] = stored ? JSON.parse(stored) : [...INITIAL_PRODUCTS];

        // If setting this product as Category Hero, unset hero on any other product in the same category
        if (isCategoryHero) {
          currentList = currentList.map((p) => {
            if (
              p.category.toLowerCase() === productPayload.category.toLowerCase() &&
              p.id !== productPayload.id
            ) {
              return { ...p, isCategoryHero: false };
            }
            return p;
          });
        }

        if (isEdit) {
          currentList = currentList.map((p) => (p.id === productPayload.id ? productPayload : p));
        } else {
          currentList = [productPayload, ...currentList.filter((p) => p.id !== productPayload.id)];
        }
        localStorage.setItem('sharma_admin_products', JSON.stringify(currentList));
        window.dispatchEvent(new Event('sharma_products_updated'));
      } catch (localErr) {
        console.warn('LocalStorage save warning:', localErr);
      }

      // 2. Prepare auth headers
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      try {
        const storedSession = localStorage.getItem('sharma_admin_session');
        if (storedSession) {
          headers['Authorization'] = `Bearer ${encodeURIComponent(storedSession)}`;
        }
      } catch {}

      // 3. Attempt server sync
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify(productPayload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.warn('Server sync note:', errData.error || 'Server running in read-only mode');
        }
      } catch (serverErr) {
        console.warn('Server sync offline note:', serverErr);
      }

      // 4. Save directly to Google Cloud Firestore (Permanent Cloud Sync)
      if (isFirebaseConfigured && db) {
        try {
          if (isCategoryHero) {
            // Unset previous hero for this category in Firestore
            const heroQuery = query(
              collection(db, 'products'),
              where('category', '==', productPayload.category),
              where('isCategoryHero', '==', true)
            );
            const heroSnap = await getDocs(heroQuery);
            for (const docSnap of heroSnap.docs) {
              if (docSnap.id !== productPayload.id) {
                await setDoc(doc(db, 'products', docSnap.id), {
                  ...docSnap.data(),
                  isCategoryHero: false,
                  updatedAt: new Date().toISOString(),
                });
              }
            }
          }
          await setDoc(doc(db, 'products', productPayload.id), productPayload);
          console.log('Product synchronized with Google Cloud Firestore!');
        } catch (fsErr) {
          console.warn('Firestore write warning:', fsErr);
        }
      }

      setNotification({
        message: isEdit ? 'Product updated successfully.' : 'Product published to showroom catalogue.',
        type: 'success',
      });

      setTimeout(() => {
        router.push('/admin/products');
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving product.';
      setNotification({ message: msg, type: 'error' });
      setSubmitting(false);
    }
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
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            03 · Imagery &amp; Product Photography
          </h3>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-mono text-neutral-500 hover:text-brand-navy underline"
          >
            {showUrlInput ? 'Hide manual path/URL' : 'Or paste image URL / local path'}
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Direct Device Upload Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-sm p-6 text-center transition-all cursor-pointer select-none ${
              isDragging
                ? 'border-brand-navy bg-neutral-100'
                : 'border-neutral-300 hover:border-brand-navy bg-neutral-50/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-4 space-y-2">
                <Loader2 className="w-8 h-8 text-brand-navy animate-spin" />
                <p className="font-semibold text-brand-navy text-sm">Uploading photo from device...</p>
                <p className="text-[11px] text-neutral-500">Saving to /public/images/products/</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-subtle flex items-center justify-center text-brand-navy mb-1">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-brand-navy">
                    Click to upload photo directly from your device
                  </p>
                  <p className="text-[11px] text-neutral-500 font-normal">
                    Select from phone gallery / camera or browse files on computer (JPG, PNG, WEBP up to 10MB)
                  </p>
                  <span className="inline-block mt-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-emerald-200">
                    Auto-saved to public/images/products/
                  </span>
                </div>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Optional Manual URL Input */}
          {showUrlInput && (
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1.5">
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Direct Image Path or External URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/products/example.jpg or https://..."
                className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
              />
            </div>
          )}

          {/* Active Image Preview Card */}
          {imageUrl && (
            <div className="flex items-center justify-between p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-16 h-16 bg-white border border-neutral-200 rounded-sm overflow-hidden p-1 shrink-0 flex items-center justify-center shadow-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-brand-navy truncate text-xs">
                      Active Product Photography
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-neutral-500 truncate max-w-xs sm:max-w-md">
                    {imageUrl}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 bg-white border border-neutral-200 hover:border-brand-navy text-[11px] font-semibold text-brand-navy rounded-sm transition-colors"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl('/images/showroom/sharma-bazaar-showroom-interior.jpg')}
                  className="p-1.5 text-neutral-400 hover:text-red-600 rounded-sm transition-colors"
                  title="Reset to default showroom image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
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

          <label className="flex items-center gap-2.5 p-3 bg-neutral-50 border border-neutral-200 rounded-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isCategoryHero}
              onChange={(e) => {
                setIsCategoryHero(e.target.checked);
                if (e.target.checked) setIsActive(true);
              }}
              className="rounded-sm text-amber-600"
            />
            <div className="flex items-center gap-1.5">
              <Star
                className={`w-3.5 h-3.5 ${
                  isCategoryHero ? 'fill-amber-500 text-amber-500' : 'text-neutral-400'
                }`}
              />
              <span className="font-semibold text-neutral-800">Homepage Hero</span>
            </div>
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
