import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES, METRO_DIRECTIONS } from '../src/data/site-config';

test('SITE_CONFIG has correct brand identity and single contact information', () => {
  // Brand name and tagline
  assert.equal(SITE_CONFIG.businessName, 'Sharma Bazaar');
  assert.equal(SITE_CONFIG.tagline, 'Your Home Appliance Destination.');

  // Strict Phone & WhatsApp
  assert.equal(SITE_CONFIG.phone, '+91 70650 09006');
  assert.equal(SITE_CONFIG.whatsapp, '917065009006');

  // Strict Address components
  assert.equal(SITE_CONFIG.address, 'Dairy Farm, 80-B, Masoodpur, G/F');
  assert.equal(SITE_CONFIG.area, 'Vasant Kunj');
  assert.equal(SITE_CONFIG.city, 'New Delhi');
  assert.equal(SITE_CONFIG.pincode, '110070');
  assert.ok(SITE_CONFIG.landmark.includes('Dairy Farm, 80-B, Masoodpur, G/F'));
  assert.ok(SITE_CONFIG.googleMapsDirectionsUrl.includes('13603464623438628551') || SITE_CONFIG.googleMapsDirectionsUrl.includes('Dairy+Farm'));

  // Verified Google Business Listing Coordinates
  assert.equal(SITE_CONFIG.coordinates.latitude, 28.5304135);
  assert.equal(SITE_CONFIG.coordinates.longitude, 77.1510591);
});

test('ELECTRONICS_CATEGORIES has all 6 core categories with non-empty descriptions', () => {
  assert.equal(ELECTRONICS_CATEGORIES.length, 6);
  const expectedCategoryIds = [
    'televisions',
    'air-conditioners',
    'refrigerators',
    'washing-machines',
    'microwaves',
    'water-dispensers',
  ];

  for (const id of expectedCategoryIds) {
    const cat = ELECTRONICS_CATEGORIES.find((c) => c.id === id);
    assert.ok(cat, `Category ${id} must exist`);
    assert.ok(cat.name.length > 0, `Category ${id} must have a name`);
    assert.ok(cat.tagline.length > 0, `Category ${id} must have a tagline`);
    assert.ok(cat.shortDescription.length > 0, `Category ${id} must have a shortDescription`);
  }
});

test('METRO_DIRECTIONS guides to the correct Masoodpur showroom address', () => {
  assert.equal(METRO_DIRECTIONS.length, 3);
  for (const dir of METRO_DIRECTIONS) {
    assert.ok(dir.route.includes('Dairy Farm, 80-B, Masoodpur, G/F'));
  }
});
