'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { computeShowcaseProducts } from '@/lib/showcase';
import { db, isFirebaseConfigured } from '@/lib/firebase/client';
import { collection, getDocs } from 'firebase/firestore';

interface FeaturedShowcaseSectionProps {
  initialProducts: Product[];
}

export function FeaturedShowcaseSection({ initialProducts }: FeaturedShowcaseSectionProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    let isMounted = true;

    async function syncHomepageShowcase() {
      // 1. Fetch live products from Cloud Firestore
      if (isFirebaseConfigured && db) {
        try {
          const snap = await getDocs(collection(db, 'products'));
          if (!snap.empty && isMounted) {
            const fsProducts: Product[] = [];
            snap.forEach((d) => {
              fsProducts.push({ id: d.id, ...(d.data() as Omit<Product, 'id'>) });
            });
            if (fsProducts.length > 0) {
              const liveShowcase = computeShowcaseProducts(fsProducts);
              setProducts(liveShowcase);
              try {
                localStorage.setItem('sharma_admin_products', JSON.stringify(fsProducts));
              } catch {}
              return;
            }
          }
        } catch (e) {
          console.warn('FeaturedShowcaseSection Firestore sync note:', e);
        }
      }

      // 2. Fallback to localStorage if available
      try {
        const stored = localStorage.getItem('sharma_admin_products');
        if (stored && isMounted) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const localShowcase = computeShowcaseProducts(parsed);
            setProducts(localShowcase);
            return;
          }
        }
      } catch {}

      // 3. Fallback to initialProducts
      if (isMounted) {
        setProducts(computeShowcaseProducts(initialProducts));
      }
    }

    syncHomepageShowcase();

    // Listen for real-time inventory updates across tabs or admin edits
    const handleUpdate = () => syncHomepageShowcase();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('sharma_products_updated', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('sharma_products_updated', handleUpdate);
    };
  }, [initialProducts]);

  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Verified Inventory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy mt-1">
              Featured Showroom Models
            </h2>
          </div>
          <Link
            href="/electronics"
            className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-navy hover:underline flex items-center gap-1.5"
          >
            <span>Explore All Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-neutral-50 border border-neutral-200 rounded-sm space-y-3">
            <p className="text-sm text-neutral-600 font-mono">
              No showcase models currently active for homepage display.
            </p>
            <Link
              href="/electronics"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
            >
              <span>Explore All Products in Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
