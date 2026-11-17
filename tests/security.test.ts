import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { verifyStaffSession, verifyAdminSession } from '../src/lib/server-auth';

test('verifyStaffSession rejects requests with no session cookie or header', () => {
  const req = new NextRequest('http://localhost:3000/api/products', {
    method: 'POST',
  });
  const res = verifyStaffSession(req);
  assert.strictEqual(res.authenticated, false);
  assert.strictEqual(res.user, null);
});

test('verifyStaffSession accepts valid staff session cookie', () => {
  const mockUser = {
    uid: 'staff-1',
    email: 'manager@sharmabazaar.com',
    name: 'Showroom Manager',
    role: 'shop_manager',
    createdAt: new Date().toISOString(),
  };

  const req = new NextRequest('http://localhost:3000/api/products', {
    method: 'POST',
    headers: {
      cookie: `sharma_admin_session=${encodeURIComponent(JSON.stringify(mockUser))}`,
    },
  });

  const res = verifyStaffSession(req);
  assert.strictEqual(res.authenticated, true);
  assert.strictEqual(res.user?.email, 'manager@sharmabazaar.com');
  assert.strictEqual(res.user?.role, 'shop_manager');
});

test('verifyAdminSession rejects shop_manager for admin-only operations', () => {
  const mockManager = {
    uid: 'staff-2',
    email: 'manager@sharmabazaar.com',
    name: 'Showroom Manager',
    role: 'shop_manager',
    createdAt: new Date().toISOString(),
  };

  const req = new NextRequest('http://localhost:3000/api/products', {
    method: 'PUT',
    headers: {
      cookie: `sharma_admin_session=${encodeURIComponent(JSON.stringify(mockManager))}`,
    },
  });

  const res = verifyAdminSession(req);
  assert.strictEqual(res.authenticated, false);
  assert.match(res.error || '', /Administrator/i);
});

test('verifyAdminSession grants access to verified administrator', () => {
  const mockAdmin = {
    uid: 'staff-admin',
    email: 'admin@sharmabazaar.com',
    name: 'Senior Administrator',
    role: 'admin',
    createdAt: new Date().toISOString(),
  };

  const req = new NextRequest('http://localhost:3000/api/products', {
    method: 'PUT',
    headers: {
      cookie: `sharma_admin_session=${encodeURIComponent(JSON.stringify(mockAdmin))}`,
    },
  });

  const res = verifyAdminSession(req);
  assert.strictEqual(res.authenticated, true);
  assert.strictEqual(res.user?.role, 'admin');
});
