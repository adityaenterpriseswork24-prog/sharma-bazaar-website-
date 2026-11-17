import test from 'node:test';
import assert from 'node:assert/strict';
import { SOUTH_DELHI_LOCALITIES } from '../src/data/locations';

test('SOUTH_DELHI_LOCALITIES has all delivery localities properly structured', () => {
  assert.ok(SOUTH_DELHI_LOCALITIES.length >= 10, 'Expected at least 10 localities');

  for (const loc of SOUTH_DELHI_LOCALITIES) {
    assert.ok(loc.name, 'Locality must have a name');
    assert.ok(loc.slug, 'Locality must have a slug');
    assert.ok(loc.pincodes.length > 0, 'Locality must have at least one pincode');
    assert.ok(loc.distanceFromShowroom, 'Locality must specify distance');
    assert.ok(loc.deliveryWindow, 'Locality must specify delivery window');
    assert.ok(loc.overview, 'Locality must have an overview');
    assert.ok(loc.landmarkCoverage.length > 0, 'Locality must have landmarks');
    assert.ok(loc.popularAppliances.length > 0, 'Locality must have popular appliances');
  }
});

test('Primary hub locality Vasant Kunj exists and references showroom base correctly', () => {
  const vk = SOUTH_DELHI_LOCALITIES.find((l) => l.slug === 'vasant-kunj');
  assert.ok(vk, 'Vasant Kunj must exist in localities');
  assert.ok(vk.pincodes.includes('110070'), 'Vasant Kunj pincode must be 110070');
  assert.ok(vk.overview.includes('Dairy Farm, 80-B, Masoodpur, G/F'), 'Overview must reference Dairy Farm address');
});
