'use client';

import { useState, useMemo } from 'react';
import { Search, RotateCcw, MessageCircle, X } from 'lucide-react';
import { Product } from '@/types';
import { ELECTRONICS_CATEGORIES, SITE_CONFIG } from '@/data/site-config';
import { ProductCard } from '@/components/ui/ProductCard';
import { buildWhatsAppUrl } from '@/lib/utils';

interface CatalogueViewProps {
  initialProducts: Product[];
  initialCategory?: string;
  initialSearch?: string;
}

export function CatalogueView({
  initialProducts,
  initialCategory = 'all',
  initialSearch = '',
}: CatalogueViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Extract all unique brands dynamically
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [initialProducts]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      result = result.filter(
        (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.modelNumber.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.ourPrice - b.ourPrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.ourPrice - a.ourPrice);
    } else if (sortBy === 'savings-desc') {
      result.sort((a, b) => (b.mrpPrice - b.ourPrice) - (a.mrpPrice - a.ourPrice));
    } else {
      // featured first
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [initialProducts, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    searchQuery.trim().length > 0 ||
    sortBy !== 'featured';

  const customRequestWhatsAppUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hi Sharma Electronics, I am looking for a specific model that is not listed on your catalogue: ${searchQuery ? `"${searchQuery}"` : 'electronics model'}. Can you arrange it and share your best showroom price?`
  );

  return (
    <div className="space-y-8">
      {/* Search & Sort Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
          {/* Search input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand, TV size, AC tonnage, model number..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Brand select */}
          <div className="md:col-span-3">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="all">All Brands ({availableBrands.length})</option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Sort select */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="savings-desc">Maximum Savings</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Categories ({initialProducts.length})
          </button>
          {ELECTRONICS_CATEGORIES.map((cat) => {
            const count = initialProducts.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Filter Summary Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing <strong>{filteredProducts.length}</strong> matching products
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-brand-blue hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Direct Matches Found</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We maintain limited display stock but can quickly arrange any model from our authorized distributor network in Delhi NCR.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold"
            >
              Clear Search &amp; Filters
            </button>
            <a
              href={customRequestWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-sm font-bold flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
              <span>Request Model on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Model On Demand Notice */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Can&apos;t find the exact model or size you need?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            We procure specific OLED/QLED TVs, large side-by-side refrigerators, and heavy inverter ACs directly from distributors on demand.
          </p>
        </div>
        <a
          href={customRequestWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Ask Store Manager</span>
        </a>
      </div>
    </div>
  );
}
