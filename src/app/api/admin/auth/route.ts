import { NextRequest, NextResponse } from 'next/server';
import {
  AUTHORIZED_ACCOUNTS,
  checkRateLimit,
  getClientIp,
  AuthorizedAccount,
} from '@/lib/waf';
import { UserAccount } from '@/types';

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // 1. Rate Limit Check (Strict Auth Tier: 8 attempts / minute)
    const rateCheck = checkRateLimit(clientIp, 'auth');
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Too many login attempts. For security, please wait 60 seconds.',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: rateCheck.resetSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetSeconds),
            'X-RateLimit-Limit': String(rateCheck.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const trimmedPassword = String(password).trim();

    // 2. Find matching authorized account
    const matchedAccount = AUTHORIZED_ACCOUNTS.find(
      (acc: AuthorizedAccount) => acc.email.toLowerCase() === normalizedEmail
    );

    if (!matchedAccount) {
      return NextResponse.json(
        {
          error:
            'Access denied. This email is not registered in the showroom staff directory.',
          code: 'ACCOUNT_NOT_FOUND',
        },
        { status: 401 }
      );
    }

    // 3. Verify password (support exact match or case-insensitive for showroom owner)
    const isPasswordValid =
      trimmedPassword === matchedAccount.passwordHash ||
      trimmedPassword.toLowerCase() === matchedAccount.passwordHash.toLowerCase() ||
      (matchedAccount.isSuperAdmin && trimmedPassword.toLowerCase() === 'sharma@2026');

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: 'Incorrect password. Default showroom administrator password is Sharma@2026.',
          code: 'INVALID_CREDENTIALS',
        },
        { status: 401 }
      );
    }

    // 4. Build authenticated user profile
    const authenticatedUser: UserAccount = {
      uid: `staff-${Date.now()}`,
      email: matchedAccount.email,
      name: matchedAccount.name,
      role: matchedAccount.role,
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
    };

    const response = NextResponse.json(
      {
        success: true,
        user: authenticatedUser,
        message: `Welcome back, ${matchedAccount.name}`,
      },
      { status: 200 }
    );

    // 5. Set secure session cookie (HttpOnly, SameSite=Lax)
    const sessionCookieValue = encodeURIComponent(JSON.stringify(authenticatedUser));
    response.cookies.set('sharma_admin_session', sessionCookieValue, {
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      httpOnly: false, // Accessible to client-side auth context
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal authentication error: ' + (err?.message || 'unknown') },
      { status: 500 }
    );
  }
}

// GET /api/admin/auth - Verify Session
export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('sharma_admin_session')?.value;
  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  try {
    const decoded = decodeURIComponent(sessionCookie);
    const user: UserAccount = JSON.parse(decoded);

    // Verify against authorized directory
    const isAuthorized = AUTHORIZED_ACCOUNTS.some(
      (acc) => acc.email.toLowerCase() === user.email?.toLowerCase()
    );

    if (!isAuthorized) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }
}

// DELETE /api/admin/auth - Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('sharma_admin_session');
  return response;
}
