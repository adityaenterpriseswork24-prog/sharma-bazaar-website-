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
    const { email, password } = body;

    if (!password || !String(password).trim()) {
      return NextResponse.json(
        { error: 'Administrator password is required.' },
        { status: 400 }
      );
    }

    const trimmedPassword = String(password).trim();
    const normalizedEmail = email ? String(email).trim().toLowerCase() : 'adityaenterprises.work24@gmail.com';

    // 2. Verify single authorized admin account
    const singleAdmin = AUTHORIZED_ACCOUNTS[0]; // adityaenterprises.work24@gmail.com

    if (
      normalizedEmail &&
      normalizedEmail !== singleAdmin.email.toLowerCase() &&
      normalizedEmail !== 'admin' &&
      normalizedEmail !== 'admin@sharmabazaar.com'
    ) {
      return NextResponse.json(
        {
          error: 'Access denied: Only the primary showroom administrator is authorized to access this portal.',
          code: 'UNAUTHORIZED_ACCOUNT',
        },
        { status: 401 }
      );
    }

    // 3. Verify exact administrator password
    const isPasswordValid = trimmedPassword === singleAdmin.passwordHash;

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: 'Incorrect administrator password. Access denied.',
          code: 'INVALID_CREDENTIALS',
        },
        { status: 401 }
      );
    }

    // 4. Build authenticated admin profile
    const authenticatedUser: UserAccount = {
      uid: 'admin-owner',
      email: singleAdmin.email,
      name: singleAdmin.name,
      role: 'admin',
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
    };

    const response = NextResponse.json(
      {
        success: true,
        user: authenticatedUser,
        message: 'Administrator authentication successful.',
      },
      { status: 200 }
    );

    // 5. Set session cookie (cleared when browser session ends)
    const sessionCookieValue = encodeURIComponent(JSON.stringify(authenticatedUser));
    response.cookies.set('sharma_admin_session', sessionCookieValue, {
      path: '/',
      httpOnly: false,
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
