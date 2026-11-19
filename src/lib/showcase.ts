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
 * For each canonical category, it selects the product explicitly marked with isCategoryHero === true.
 * If no product in that category is marked as hero (or if the category has no active inventory),
 * that category is omitted, giving the admin total control to add or remove showcase models.
 */
export function computeShowcaseProducts(products: Product[]): Product[] {
  const allActive = products.filter((p) => p.isActive);
  const showcase: Product[] = [];

  for (const cat of HOMEPAGE_SHOWCASE_CATEGORIES) {
    const productsInCat = allActive.filter(
      (p) => p.category.toLowerCase() === cat.toLowerCase()
    );
    if (productsInCat.length === 0) continue;

    // Pick designated category hero if set
    const hero = productsInCat.find((p) => p.isCategoryHero === true);
    if (hero) {
      showcase.push(hero);
    }
  }

  return showcase;
}
