'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, MessageCircle, X, SlidersHorizontal, ArrowRight } from 'lucide-react';
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  useEffect(() => {
    let combined = initialProducts;
    try {
      const stored = localStorage.getItem('sharma_admin_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const serverIds = new Set(initialProducts.map((p) => p.id));
          const localOnly = parsed.filter((p: Product) => !serverIds.has(p.id));
          const localMap = new Map(parsed.map((p: Product) => [p.id, p]));
          const mergedServer = initialProducts.map((sp) => localMap.get(sp.id) || sp);
          combined = [...localOnly, ...mergedServer];
        }
      }
    } catch {
      // ignore
    }
    setProducts(combined);
  }, [initialProducts]);

  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.isActive);

    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedBrand !== 'all') {
      result = result.filter(
        (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.modelNumber && p.modelNumber.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.ourPrice - b.ourPrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.ourPrice - a.ourPrice);
    } else if (sortBy === 'savings-desc') {
      result.sort((a, b) => {
        const savingsB = Math.max(0, (b.mrpPrice || b.ourPrice) - b.ourPrice);
        const savingsA = Math.max(0, (a.mrpPrice || a.ourPrice) - a.ourPrice);
        return savingsB - savingsA;
      });
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

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
    `Hi Sharma Bazaar, I am looking for a specific model that is not listed on your catalogue: ${searchQuery ? `"${searchQuery}"` : 'electronics model'}. Can you arrange it and share your best showroom price?`
  );

  return (
    <div className="space-y-8">
      {/* Category Tabs Bar */}
      <div className="border-b border-neutral-200 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 sm:gap-8 pb-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap min-w-max">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`transition-colors pb-1 relative ${
              selectedCategory === 'all'
                ? 'text-brand-navy font-bold'
                : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <span>All Categories ({products.length})</span>
            {selectedCategory === 'all' && (
              <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-brand-navy"></span>
            )}
          </button>

          {ELECTRONICS_CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`transition-colors pb-1 relative ${
                  isSelected
                    ? 'text-brand-navy font-bold'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <span>{cat.name} ({count})</span>
                {isSelected && (
                  <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-brand-navy"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Controls Toolbar */}
      <div className="p-4 sm:p-5 bg-neutral-50/80 border border-neutral-200 rounded-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Field */}
          <div className="md:col-span-6 relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand, TV size, tonnage, model number..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-neutral-200 text-sm sm:text-xs text-neutral-900 rounded-sm focus:outline-none focus:border-brand-navy transition-colors font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-2.5 px-3 bg-white border border-neutral-200 text-sm sm:text-xs font-mono text-neutral-700 rounded-sm focus:outline-none focus:border-brand-navy"
            >
              <option value="all">All Brands ({availableBrands.length})</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 bg-white border border-neutral-200 text-sm sm:text-xs font-mono text-neutral-700 rounded-sm focus:outline-none focus:border-brand-navy"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Sort: Price (Lowest First)</option>
              <option value="price-desc">Sort: Price (Highest First)</option>
              <option value="savings-desc">Sort: Highest Savings</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs font-mono text-neutral-500">
          <div>
            Showing <span className="font-bold text-brand-navy">{filteredProducts.length}</span> of {products.length} models
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-neutral-600 hover:text-brand-navy hover:underline inline-flex items-center gap-1 text-[11px]"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
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
        <div className="p-12 text-center bg-white border border-neutral-200 rounded-sm space-y-4 max-w-xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            No exact display models match &quot;{searchQuery}&quot;
          </p>
          <h3 className="text-xl font-bold text-brand-navy">
            We Can Arrange Any Model Within 24 Hours
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Our showroom procures directly from regional distributor networks. Send us the model number or online link and we will provide our best counter-price.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={customRequestWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-brand-whatsapp hover:bg-brand-whatsappDark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Request Model on WhatsApp</span>
            </a>
            <button
              onClick={resetFilters}
              className="px-4 py-3 text-xs font-mono text-neutral-600 hover:text-brand-navy"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
