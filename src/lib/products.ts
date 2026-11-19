import fs from 'fs';
import path from 'path';
import { Product, ProductCategory } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { isFirebaseConfigured, db } from './firebase/client';
import { collection, getDocs, query, where } from 'firebase/firestore';

export interface ProductFilterOptions {
  category?: string;
  brand?: string;
  search?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'savings-desc';
  limitCount?: number;
  featuredOnly?: boolean;
}

export { HOMEPAGE_SHOWCASE_CATEGORIES, computeShowcaseProducts } from './showcase';
import { HOMEPAGE_SHOWCASE_CATEGORIES, computeShowcaseProducts } from './showcase';

function getStoredOrInitialProducts(): Product[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'stored-products.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return [...INITIAL_PRODUCTS];
}

/**
 * Fetch all active products with in-memory caching and fallback to seed data
 */
export async function getActiveProducts(options: ProductFilterOptions = {}): Promise<Product[]> {
  let products: Product[] = getStoredOrInitialProducts();

  // If running in browser and Firebase is configured, attempt fetching from Firestore
  if (typeof window !== 'undefined' && isFirebaseConfigured && db) {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('isActive', '==', true));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const firestoreProducts: Product[] = [];
        querySnapshot.forEach((docSnap) => {
          firestoreProducts.push({ id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) });
        });
        if (firestoreProducts.length > 0) {
          products = firestoreProducts;
        }
      }
    } catch (error) {
      console.warn('Firestore fetch failed, using fallback catalogue:', error);
    }
  }

  // Filter only active
  products = products.filter((p) => p.isActive);

  // Filter by featured
  if (options.featuredOnly) {
    products = products.filter((p) => p.isFeatured);
  }

  // Filter by category
  if (options.category && options.category !== 'all') {
    products = products.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
  }

  // Filter by brand
  if (options.brand && options.brand !== 'all') {
    products = products.filter((p) => p.brand.toLowerCase() === options.brand?.toLowerCase());
  }

  // Filter by search keyword (name, model, brand, description)
  if (options.search && options.search.trim()) {
    const term = options.search.toLowerCase().trim();
    products = products.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.brand && p.brand.toLowerCase().includes(term)) ||
        (p.modelNumber && p.modelNumber.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(term))
    );
  }

  // Sort
  if (options.sortBy === 'price-asc') {
    products.sort((a, b) => a.ourPrice - b.ourPrice);
  } else if (options.sortBy === 'price-desc') {
    products.sort((a, b) => b.ourPrice - a.ourPrice);
  } else if (options.sortBy === 'savings-desc') {
    products.sort((a, b) => {
      const savingsB = Math.max(0, (b.mrpPrice || b.ourPrice) - b.ourPrice);
      const savingsA = Math.max(0, (a.mrpPrice || a.ourPrice) - a.ourPrice);
      return savingsB - savingsA;
    });
  } else {
    // Default featured first, then newest
    products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  // Limit
  if (options.limitCount && options.limitCount > 0) {
    products = products.slice(0, options.limitCount);
  }

  return products;
}

/**
 * Fetch category showcase models for the homepage (1 hero product per category)
 */
export async function getHomepageShowcaseProducts(): Promise<Product[]> {
  const allActive = await getActiveProducts();
  return computeShowcaseProducts(allActive);
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const allProducts = getStoredOrInitialProducts();
  const localMatch = allProducts.find((p) => p.slug === slug || p.id === slug);
  if (localMatch) return localMatch;

  if (isFirebaseConfigured && db) {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return { id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) };
      }
    } catch (e) {
      console.warn('Error fetching product by slug from Firestore:', e);
    }
  }

  return null;
}

/**
 * Fetch related products from the same category
 */
export async function getRelatedProducts(productId: string, category: ProductCategory, limit = 3): Promise<Product[]> {
  const allInCat = await getActiveProducts({ category });
  return allInCat.filter((p) => p.id !== productId).slice(0, limit);
}

/**
 * Extract unique brand list from active products
 */
export function getUniqueBrands(products: Product[]): string[] {
  const brandsSet = new Set<string>();
  products.forEach((p) => {
    if (p.brand) brandsSet.add(p.brand);
  });
  return Array.from(brandsSet).sort();
}
