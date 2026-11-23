import { Product, ProductCategory } from '@/types';

export const HOMEPAGE_SHOWCASE_CATEGORIES: ProductCategory[] = [
  'televisions',
  'air-conditioners',
  'refrigerators',
  'washing-machines',
  'microwaves',
  'water-dispensers',
];

/**
 * Compute homepage showcase products from a list of products.
 * For each canonical category, it selects:
 * 1. The product explicitly marked with isCategoryHero === true
 * 2. Or falls back to isFeatured === true
 * 3. Or falls back to the first available active product in that category
 * This guarantees all 6 categories are always represented on the homepage,
 * while giving the admin instant, full control to change the hero product.
 */
export function computeShowcaseProducts(products: Product[]): Product[] {
  const allActive = products.filter((p) => p.isActive !== false);
  const showcase: Product[] = [];

  for (const cat of HOMEPAGE_SHOWCASE_CATEGORIES) {
    const productsInCat = allActive.filter(
      (p) => p.category && p.category.toLowerCase() === cat.toLowerCase()
    );
    if (productsInCat.length === 0) continue;

    // Pick designated category hero if set, else featured, else first active product
    const hero =
      productsInCat.find((p) => p.isCategoryHero === true) ||
      productsInCat.find((p) => p.isFeatured === true) ||
      productsInCat[0];

    if (hero) {
      showcase.push(hero);
    }
  }

  return showcase;
}
