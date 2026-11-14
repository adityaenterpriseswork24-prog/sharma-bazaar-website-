'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { ProductForm } from '@/components/admin/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!productId) return;

    const stored = localStorage.getItem('sharma_admin_products');
    const allProducts: Product[] = stored ? JSON.parse(stored) : [...INITIAL_PRODUCTS];
    const match = allProducts.find((p) => p.id === productId || p.slug === productId);

    if (match) {
      setProduct(match);
      setLoaded(true);
    } else {
      fetch(`/api/products?id=${encodeURIComponent(productId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.product) {
            setProduct(data.product);
          }
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [productId]);

  if (!loaded) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12 text-center space-y-4 max-w-md mx-auto p-8 bg-white border border-neutral-200 rounded-sm">
        <h2 className="text-xl font-bold text-brand-navy">Product Not Found</h2>
        <p className="text-xs text-neutral-500 font-mono">The product ID &quot;{productId}&quot; does not exist in inventory.</p>
        <button
          onClick={() => router.push('/admin/products')}
          className="px-4 py-2 rounded-sm bg-brand-navy text-white text-xs font-mono uppercase tracking-wider"
        >
          Back to Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <ProductForm initialProduct={product} isEdit={true} />
    </div>
  );
}
