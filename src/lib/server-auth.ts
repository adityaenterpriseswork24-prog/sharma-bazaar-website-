import { NextRequest } from 'next/server';
import { UserAccount, UserRole } from '@/types';

export interface AuthVerificationResult {
  authenticated: boolean;
  user: UserAccount | null;
  error?: string;
}

/**
 * Validates staff session from request cookies or headers.
 * Protects internal mutation APIs and admin endpoints.
 */
export function verifyStaffSession(request: NextRequest): AuthVerificationResult {
  try {
    const sessionCookie = request.cookies.get('sharma_admin_session')?.value;

    if (!sessionCookie) {
      // Check Authorization Bearer header as secondary fallback
      const authHeader = request.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          const parsed = JSON.parse(decodeURIComponent(token));
          if (parsed && (parsed.role === 'admin' || parsed.role === 'shop_manager')) {
            return { authenticated: true, user: parsed };
          }
        } catch {
          // invalid token
        }
      }
      return { authenticated: false, user: null, error: 'No active session found.' };
    }

    const decoded = decodeURIComponent(sessionCookie);
    const user: UserAccount = JSON.parse(decoded);

    if (!user || !user.role || (user.role !== 'admin' && user.role !== 'shop_manager')) {
      return { authenticated: false, user: null, error: 'Unauthorized role.' };
    }

    return { authenticated: true, user };
  } catch (err) {
    return { authenticated: false, user: null, error: 'Failed to verify session token.' };
  }
}

/**
 * Checks if the request comes from an administrator (highest privilege).
 */
export function verifyAdminSession(request: NextRequest): AuthVerificationResult {
  const result = verifyStaffSession(request);
  if (!result.authenticated || result.user?.role !== 'admin') {
    return {
      authenticated: false,
      user: result.user,
      error: 'Administrator privileges required for this operation.',
    };
  }
  return result;
}
