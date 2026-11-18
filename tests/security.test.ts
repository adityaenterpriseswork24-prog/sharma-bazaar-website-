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

// WAF & Threat Protection Tests
import { inspectRequestWithWaf, checkRateLimit } from '../src/lib/waf';

test('WAF blocks automated vulnerability scanners like sqlmap and nikto', () => {
  const req1 = new NextRequest('http://localhost:3000/electronics', {
    headers: { 'user-agent': 'sqlmap/1.6.12#stable (https://sqlmap.org)' },
  });
  const check1 = inspectRequestWithWaf(req1);
  assert.strictEqual(check1.blocked, true);
  assert.strictEqual(check1.category, 'MALICIOUS_USER_AGENT');

  const req2 = new NextRequest('http://localhost:3000/', {
    headers: { 'user-agent': 'Nikto/2.1.6' },
  });
  const check2 = inspectRequestWithWaf(req2);
  assert.strictEqual(check2.blocked, true);
});

test('WAF blocks XSS attacks in URL query parameters', () => {
  const req = new NextRequest('http://localhost:3000/electronics?search=%3Cscript%3Ealert(1)%3C/script%3E');
  const check = inspectRequestWithWaf(req);
  assert.strictEqual(check.blocked, true);
  assert.strictEqual(check.category, 'XSS');
});

test('WAF blocks SQL injection attempts in query strings', () => {
  const req = new NextRequest('http://localhost:3000/api/products?id=1%20UNION%20SELECT%20username,password%20FROM%20users');
  const check = inspectRequestWithWaf(req);
  assert.strictEqual(check.blocked, true);
  assert.strictEqual(check.category, 'SQLI');
});

test('WAF blocks Path Traversal attempts', () => {
  const req = new NextRequest('http://localhost:3000/api/download?file=..%2F..%2Fetc%2Fpasswd');
  const check = inspectRequestWithWaf(req);
  assert.strictEqual(check.blocked, true);
  assert.strictEqual(check.category, 'PATH_TRAVERSAL');
});

test('Rate Limiter allows legitimate traffic and enforces threshold on abusive bursts', () => {
  const testIp = '198.51.100.99';
  // Auth tier limit is 8 requests per minute
  for (let i = 0; i < 8; i++) {
    const res = checkRateLimit(testIp, 'auth');
    assert.strictEqual(res.allowed, true);
  }
  // 9th request should be throttled
  const throttled = checkRateLimit(testIp, 'auth');
  assert.strictEqual(throttled.allowed, false);
  assert.strictEqual(throttled.remaining, 0);
});

