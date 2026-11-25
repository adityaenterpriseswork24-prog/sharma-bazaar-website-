import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_PRODUCTS } from '../src/data/initial-products';
import {
  getActiveProducts,
  getHomepageShowcaseProducts,
  computeShowcaseProducts,
  HOMEPAGE_SHOWCASE_CATEGORIES,
} from '../src/lib/products';

test('INITIAL_PRODUCTS has valid structure and required fields for all items', () => {
  assert.ok(INITIAL_PRODUCTS.length >= 10, 'Expected at least 10 initial products');

  for (const product of INITIAL_PRODUCTS) {
    assert.ok(product.id, 'Product must have an id');
    assert.ok(product.slug, 'Product must have a slug');
    assert.ok(product.name, 'Product must have a name');
    assert.ok(product.brand, 'Product must have a brand');
    assert.ok(product.category, 'Product must have a category');
    assert.ok(typeof product.ourPrice === 'number' && product.ourPrice > 0, 'ourPrice must be > 0');
    assert.ok(typeof product.mrpPrice === 'number' && product.mrpPrice >= product.ourPrice, 'mrpPrice must be >= ourPrice');
    assert.ok(product.imageUrl, 'Product must have an imageUrl');
    assert.equal(typeof product.isActive, 'boolean', 'isActive must be boolean');
  }
});

test('getActiveProducts filters and sorts correctly', async () => {
  // Test category filtering
  const tvs = await getActiveProducts({ category: 'televisions' });
  assert.ok(tvs.length > 0, 'Should find televisions');
  for (const tv of tvs) {
    assert.equal(tv.category, 'televisions');
  }

  // Test brand filtering
  const sony = await getActiveProducts({ brand: 'Sony' });
  assert.ok(sony.length > 0, 'Should find Sony products');
  for (const item of sony) {
    assert.equal(item.brand.toLowerCase(), 'sony');
  }

  // Test search filtering across name, brand, model
  const searchResults = await getActiveProducts({ search: 'bravia' });
  assert.ok(searchResults.length > 0, 'Should find bravia in search');
  for (const item of searchResults) {
    const text = `${item.name} ${item.brand} ${item.modelNumber}`.toLowerCase();
    assert.ok(text.includes('bravia'));
  }

  // Test price-asc sorting
  const sortedAsc = await getActiveProducts({ sortBy: 'price-asc' });
  for (let i = 0; i < sortedAsc.length - 1; i++) {
    assert.ok(
      sortedAsc[i].ourPrice <= sortedAsc[i + 1].ourPrice,
      `price-asc sort violation at index ${i}`
    );
  }

  // Test price-desc sorting
  const sortedDesc = await getActiveProducts({ sortBy: 'price-desc' });
  for (let i = 0; i < sortedDesc.length - 1; i++) {
    assert.ok(
      sortedDesc[i].ourPrice >= sortedDesc[i + 1].ourPrice,
      `price-desc sort violation at index ${i}`
    );
  }

  // Test limitCount
  const limited = await getActiveProducts({ limitCount: 3 });
  assert.equal(limited.length, 3);
});

test('getHomepageShowcaseProducts returns exactly 1 hero product per core category', async () => {
  assert.equal(HOMEPAGE_SHOWCASE_CATEGORIES.length, 6, 'Must define 6 canonical categories');

  const showcase = await getHomepageShowcaseProducts();
  assert.equal(showcase.length, 6, 'Homepage showcase must contain exactly 6 products');

  // Verify that each of the 6 canonical categories is represented exactly once
  const categoriesInShowcase = showcase.map((p) => p.category);
  for (const cat of HOMEPAGE_SHOWCASE_CATEGORIES) {
    assert.ok(
      categoriesInShowcase.includes(cat),
      `Expected category "${cat}" to be in homepage showcase`
    );
  }

  // Verify all products in the showcase are active
  for (const product of showcase) {
    assert.equal(product.isActive, true, 'Showcase product must be active');
  }
});

test('computeShowcaseProducts allows removing heroes and handles empty category inventory', () => {
  // If a category has no active inventory, it is omitted
  const noTvHeroList = INITIAL_PRODUCTS.filter((p) => p.category !== 'televisions');
  const showcaseNoTv = computeShowcaseProducts(noTvHeroList);
  assert.equal(showcaseNoTv.length, 5, 'Should have 5 heroes when television inventory is omitted');
  assert.ok(
    !showcaseNoTv.some((p) => p.category === 'televisions'),
    'Televisions must be omitted when category has no inventory'
  );

  // If a new product is marked as isCategoryHero, it becomes the hero
  const customHeroList = INITIAL_PRODUCTS.map((p) => {
    if (p.id === 'lg-43-inch-4k-uhd-43ur7500psc') {
      return { ...p, isCategoryHero: true };
    }
    if (p.category === 'televisions' && p.id !== 'lg-43-inch-4k-uhd-43ur7500psc') {
      return { ...p, isCategoryHero: false };
    }
    return p;
  });
  const customShowcase = computeShowcaseProducts(customHeroList);
  const tvHero = customShowcase.find((p) => p.category === 'televisions');
  assert.equal(tvHero?.id, 'lg-43-inch-4k-uhd-43ur7500psc', 'LG 43 inch should now be the hero');

  // Empty inventory handles gracefully
  const emptyShowcase = computeShowcaseProducts([]);
  assert.equal(emptyShowcase.length, 0, 'Empty products array returns empty showcase');
});
