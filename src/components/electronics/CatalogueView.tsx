'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MessageCircle,
  X,
  SlidersHorizontal,
  ArrowRight,
  Filter,
  Tv,
  Layers,
  RotateCw,
  Wind,
  Flame,
  Droplets,
  ChevronDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Product } from '@/types';
import { ELECTRONICS_CATEGORIES, SITE_CONFIG } from '@/data/site-config';
import { ProductCard } from '@/components/ui/ProductCard';
import { buildWhatsAppUrl } from '@/lib/utils';
import { db, isFirebaseConfigured } from '@/lib/firebase/client';
import { collection, getDocs } from 'firebase/firestore';

interface CatalogueViewProps {
  initialProducts: Product[];
  initialCategory?: string;
  initialSearch?: string;
}

/**
 * Intelligent Multi-Token Search with Synonyms
 * Enables natural user queries such as:
 * - "32 inch tv" -> finds 32-inch smart televisions
 * - "55 inch 4k" -> finds 55-inch 4K Google/Smart TVs
 * - "double door fridge" -> finds frost-free double door refrigerators
 * - "front load washer" -> finds front load washing machines
 * - "1.5 ton ac" -> finds 1.5 ton split air conditioners
 */
function matchMultiTokenQuery(product: Product, query: string): boolean {
  if (!query.trim()) return true;

  const SYNONYM_MAP: Record<string, string[]> = {
    tv: ['televisions', 'television', 'smart tv', 'led', 'oled', 'qled', 'bravia', '4k'],
    tvs: ['televisions', 'television', 'smart tv', 'led', '4k'],
    television: ['televisions', 'tv', 'smart tv', 'led'],
    televisions: ['tv', 'smart tv', 'led'],
    fridge: ['refrigerators', 'refrigerator', 'frost free', 'direct cool', 'double door', 'single door'],
    fridges: ['refrigerators', 'refrigerator', 'frost free', 'direct cool'],
    refrigerator: ['refrigerators', 'fridge'],
    refrigerators: ['fridge'],
    wm: ['washing-machines', 'washing machine', 'washer', 'front load', 'top load', 'semi-automatic'],
    washer: ['washing-machines', 'washing machine', 'wm', 'front load', 'top load'],
    washers: ['washing-machines', 'washing machine'],
    washing: ['washing-machines', 'washing machine', 'washer'],
    ac: ['air-conditioners', 'air conditioner', 'split ac', 'inverter ac', 'window ac', '1.5 ton', '1 ton', '2 ton'],
    acs: ['air-conditioners', 'air conditioner', 'split ac', 'inverter ac'],
    aircon: ['air-conditioners', 'air conditioner'],
    microwave: ['microwaves', 'microwave oven', 'convection', 'grill', 'solo', 'charcoal'],
    microwaves: ['microwaves', 'microwave oven', 'convection'],
    oven: ['microwaves', 'microwave oven', 'convection'],
    cooler: ['water-dispensers', 'water cooler', 'air-conditioners'],
    dispenser: ['water-dispensers', 'water dispenser', 'bottom loading', 'cooling cabinet'],
    dispensers: ['water-dispensers', 'water dispenser'],
    water: ['water-dispensers', 'water dispenser', 'purifier'],
  };

  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

  const specText = product.specifications
    ? Object.entries(product.specifications)
        .map(([k, v]) => `${k} ${v}`)
        .join(' ')
    : '';

  const searchableText = [
    product.name || '',
    product.brand || '',
    product.modelNumber || '',
    product.category || '',
    product.subcategory || '',
    product.description || '',
    specText,
  ]
    .join(' ')
    .toLowerCase();

  return tokens.every((token) => {
    // 1. Direct match
    if (searchableText.includes(token)) return true;

    // 2. Synonym match
    const synonyms = SYNONYM_MAP[token];
    if (synonyms && synonyms.some((syn) => searchableText.includes(syn))) {
      return true;
    }

    return false;
  });
}

interface QuickSearchTag {
  label: string;
  query: string;
  icon: React.ComponentType<{ className?: string }>;
}

const QUICK_SEARCH_TAGS: QuickSearchTag[] = [
  { label: '32" Smart TVs', query: '32 inch tv', icon: Tv },
  { label: '55" 4K Ultra HD', query: '55 inch 4k', icon: Tv },
  { label: 'Double Door', query: 'Double Door', icon: Layers },
  { label: 'Front Load', query: 'Front Load', icon: RotateCw },
  { label: '1.5 Ton Inverter AC', query: '1.5 Ton AC', icon: Wind },
  { label: 'Convection Microwave', query: 'Convection Microwave', icon: Flame },
  { label: 'Water Dispenser', query: 'Water Dispenser', icon: Droplets },
];

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
    let isMounted = true;

    // Purge outdated local storage cache to ensure clean verified server data
    try {
      localStorage.removeItem('sharma_admin_products');
    } catch {}

    async function syncCatalogue() {
      try {
        // 1. Fetch live products from /api/products endpoint (backed by stored-products.json)
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data?.products && Array.isArray(data.products) && data.products.length > 0 && isMounted) {
            setProducts(data.products);
            return;
          }
        }
      } catch (e) {
        console.warn('CatalogueView API sync note:', e);
      }

      // 2. Authoritative fallback to initialProducts passed by Next.js SSR
      if (isMounted) {
        setProducts(initialProducts);
      }
    }

    syncCatalogue();

    const handleUpdate = () => syncCatalogue();
    window.addEventListener('sharma_products_updated', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('sharma_products_updated', handleUpdate);
    };
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
      result = result.filter((p) => matchMultiTokenQuery(p, searchQuery));
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
      result.sort((a, b) => {
        if (b.isCategoryHero && !a.isCategoryHero) return 1;
        if (!b.isCategoryHero && a.isCategoryHero) return -1;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
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
      {/* Category Navigation Pills */}
      <div className="border-b border-neutral-200/80 overflow-x-auto no-scrollbar pb-3">
        <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap min-w-max">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-brand-navy text-white shadow-sm ring-1 ring-brand-navy'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 border border-neutral-200/60'
            }`}
          >
            <span>All Appliances</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                selectedCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-neutral-200/80 text-neutral-700'
              }`}
            >
              {products.length}
            </span>
          </button>

          {ELECTRONICS_CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-brand-navy text-white shadow-sm ring-1 ring-brand-navy'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 border border-neutral-200/60'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200/80 text-neutral-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Luxury Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 bg-white border border-neutral-200/90 rounded-2xl space-y-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Bespoke Concierge Search Bar */}
          <div className="md:col-span-6 relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-4 h-4 stroke-[2]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, brand, or feature (e.g. 55 inch 4k, double door)..."
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-neutral-50/70 hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 hover:border-neutral-300 focus:border-brand-navy rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-brand-navy/5 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Brand Filter with Custom Chevron */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-9 py-2.5 sm:py-3 bg-neutral-50/70 hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 hover:border-neutral-300 focus:border-brand-navy rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-4 focus:ring-brand-navy/5 transition-all cursor-pointer shadow-2xs"
            >
              <option value="all">All Brands ({availableBrands.length})</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
          </div>

          {/* Sort Filter with Custom Chevron */}
          <div className="md:col-span-3 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-9 py-2.5 sm:py-3 bg-neutral-50/70 hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 hover:border-neutral-300 focus:border-brand-navy rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-4 focus:ring-brand-navy/5 transition-all cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured &amp; Showroom Hero</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="savings-desc">Maximum Savings</option>
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
          </div>
        </div>

        {/* Curated Filter Chips with Refined Vector Icons (NO Emojis) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-0.5">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 mr-1 flex items-center gap-1.5 shrink-0">
            <SlidersHorizontal className="w-3 h-3 text-neutral-400 stroke-[2]" />
            Trending:
          </span>
          {QUICK_SEARCH_TAGS.map((tag) => {
            const IconComponent = tag.icon;
            const isActive = searchQuery.toLowerCase() === tag.query.toLowerCase();
            return (
              <button
                key={tag.query}
                onClick={() => setSearchQuery(isActive ? '' : tag.query)}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${
                  isActive
                    ? 'bg-brand-navy text-white border-brand-navy shadow-sm ring-1 ring-brand-navy'
                    : 'bg-neutral-100/70 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 border-neutral-200/70 hover:border-neutral-300 shadow-2xs'
                }`}
              >
                <IconComponent
                  className={`w-3.5 h-3.5 transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-800'
                  }`}
                />
                <span>{tag.label}</span>
                {isActive && <Check className="w-3 h-3 text-white/90 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Reset Bar */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Showroom Inventory
            </span>
            <span className="text-neutral-600 font-medium">
              Showing <strong className="font-bold text-neutral-900">{filteredProducts.length}</strong> of {products.length} models
              {selectedCategory !== 'all' && (
                <span className="text-neutral-400 font-normal">
                  {' '}in <span className="capitalize font-medium text-neutral-800">{selectedCategory.replace('-', ' ')}</span>
                </span>
              )}
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-brand-navy py-1 px-2.5 rounded-full hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
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
        <div className="p-12 text-center bg-white border border-neutral-200 rounded-xl space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <Search className="w-6 h-6" />
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            No exact display models match &quot;{searchQuery}&quot;
          </p>
          <h3 className="text-xl font-bold text-brand-navy">
            We Can Arrange Any Model Within 24 Hours
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-md mx-auto">
            Our showroom procures directly from regional distributor networks. Send us the model number or online link and we will provide our best counter-price.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={customRequestWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Request Model on WhatsApp</span>
            </a>
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 text-xs font-mono text-neutral-600 hover:text-brand-navy hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
