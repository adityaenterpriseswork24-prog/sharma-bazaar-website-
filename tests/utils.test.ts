import test from 'node:test';
import assert from 'node:assert/strict';
import { formatINR, calculateSavings, buildWhatsAppUrl, generateProductWhatsAppMessage, cn } from '../src/lib/utils.ts';
import { SITE_CONFIG, ELECTRONICS_CATEGORIES } from '../src/data/site-config.ts';

test('formatINR formats currency to Indian Rupees correctly', () => {
  assert.equal(formatINR(0).replace(/\s+/g, ' '), '₹0');
  assert.equal(formatINR(1000).replace(/\s+/g, ' '), '₹1,000');
  assert.equal(formatINR(52990).replace(/\s+/g, ' '), '₹52,990');
  assert.equal(formatINR(125000).replace(/\s+/g, ' '), '₹1,25,000');
  // Edge cases
  assert.equal(formatINR(NaN), '₹0');
  // @ts-expect-error testing invalid input
  assert.equal(formatINR('invalid'), '₹0');
  // @ts-expect-error testing null input
  assert.equal(formatINR(null), '₹0');
});

test('calculateSavings accurately calculates discount and savings amount', () => {
  // Regular case
  const res1 = calculateSavings(60000, 50000);
  assert.equal(res1.hasSavings, true);
  assert.equal(res1.savingsAmount, 10000);
  assert.equal(res1.discountPercent, 17);

  // Equal price (no savings)
  const res2 = calculateSavings(50000, 50000);
  assert.equal(res2.hasSavings, false);
  assert.equal(res2.savingsAmount, 0);
  assert.equal(res2.discountPercent, 0);

  // MRP lower than our price (invalid / promo price)
  const res3 = calculateSavings(40000, 50000);
  assert.equal(res3.hasSavings, false);
  assert.equal(res3.savingsAmount, 0);
  assert.equal(res3.discountPercent, 0);

  // Zero or undefined
  // @ts-expect-error testing edge cases
  const res4 = calculateSavings(0, 50000);
  assert.equal(res4.hasSavings, false);
});

test('buildWhatsAppUrl cleans phone number and encodes message query parameter', () => {
  const url1 = buildWhatsAppUrl('+91 70650 09006', 'Hello Sharma Bazaar');
  assert.ok(url1.startsWith('https://wa.me/917065009006?text='));
  assert.ok(url1.includes('Hello%20Sharma%20Bazaar'));

  const url2 = buildWhatsAppUrl('917065009006', 'Test');
  assert.equal(url2, 'https://wa.me/917065009006?text=Test');
});

test('generateProductWhatsAppMessage builds a formatted inquiry message', () => {
  const msg = generateProductWhatsAppMessage('Sony Bravia 55 Inch TV', 'KD-55X74L', 52990);
  assert.ok(msg.includes('Sony Bravia 55 Inch TV'));
  assert.ok(msg.includes('KD-55X74L'));
  assert.ok(msg.includes('52,990'));
  assert.ok(msg.includes('Sharma Bazaar'));
});

test('cn merges class names properly', () => {
  assert.equal(cn('px-2', 'py-1'), 'px-2 py-1');
  assert.equal(cn('px-2', false && 'hidden', 'py-1'), 'px-2 py-1');
  assert.equal(cn('p-4', 'p-2'), 'p-2'); // twMerge override
});
