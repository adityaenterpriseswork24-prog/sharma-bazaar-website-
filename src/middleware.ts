import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  inspectRequestWithWaf,
  checkRateLimit,
  getClientIp,
  RateLimitTier,
} from '@/lib/waf';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIp = getClientIp(request);

  // ============================================================================
  // 1. IN-APP WAF INSPECTION (SQLi, XSS, Path Traversal, Malicious Scanners)
  // ============================================================================
  const wafCheck = inspectRequestWithWaf(request);
  if (wafCheck.blocked) {
    return NextResponse.json(
      {
        error: 'Access blocked by Sharma Bazaar WAF security shield.',
        reason: wafCheck.reason,
        code: 'WAF_ATTACK_DETECTED',
        category: wafCheck.category,
      },
      {
        status: 403,
        headers: {
          'X-WAF-Status': 'BLOCKED',
          'X-WAF-Reason': wafCheck.category || 'MALICIOUS_INPUT',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  }

  // ============================================================================
  // 2. IP RATE LIMITING & BRUTE FORCE SHIELD
  // ============================================================================
  let rateTier: RateLimitTier = 'public';
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
    rateTier = 'auth';
  } else if (pathname.startsWith('/api/')) {
    rateTier = 'api';
  }

  const rateResult = checkRateLimit(clientIp, rateTier);
  if (!rateResult.allowed) {
    return NextResponse.json(
      {
        error: 'Request rate limit exceeded. Please slow down and try again.',
        code: 'TOO_MANY_REQUESTS',
        retryAfter: rateResult.resetSeconds,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateResult.resetSeconds),
          'X-RateLimit-Limit': String(rateResult.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateResult.resetSeconds),
        },
      }
    );
  }

  // ============================================================================
  // 3. ADMIN ACCESS CONTROL (Protects all /admin pages except /admin/login)
  // ============================================================================
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('sharma_admin_session')?.value;
    let isAuthenticated = false;

    if (sessionCookie) {
      try {
        const decoded = decodeURIComponent(sessionCookie);
        const parsed = JSON.parse(decoded);
        if (
          parsed &&
          (parsed.role === 'admin' || parsed.role === 'shop_manager') &&
          parsed.email
        ) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('sharma_admin_session');
      return response;
    }
  }

  // ============================================================================
  // 4. HARDENED SECURITY HEADERS
  // ============================================================================
  const response = NextResponse.next();

  // WAF and Rate Limit telemetry
  response.headers.set('X-WAF-Status', 'ACTIVE');
  response.headers.set('X-RateLimit-Limit', String(rateResult.limit));
  response.headers.set('X-RateLimit-Remaining', String(rateResult.remaining));

  // Anti-clickjacking & framing
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Legacy XSS filter protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer & Permissions policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Strict Transport Security (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public showroom images)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
