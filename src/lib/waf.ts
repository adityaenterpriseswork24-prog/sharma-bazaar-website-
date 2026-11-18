import { NextRequest } from 'next/server';

// ============================================================================
// 1. IN-APP WEB APPLICATION FIREWALL (WAF) ENGINE
// ============================================================================

// Malicious User-Agent signatures (common automated vulnerability scanners)
const BLOCKED_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /acunetix/i,
  /gobuster/i,
  /dirbuster/i,
  /masscan/i,
  /wpscan/i,
  /nessus/i,
  /nmap/i,
  /zgrab/i,
  /havij/i,
  /paros/i,
  /arachni/i,
];

// Malicious payload signatures (SQLi, XSS, Path Traversal, Command Injection)
const BLOCKED_PATTERNS = [
  // SQL Injection patterns
  /(%27)|(')|(--)|(%23)|(#)/i, // Basic single quote and SQL comments in sensitive contexts
  /(union\s+select)/i,
  /(select\s+.*\s+from)/i,
  /(insert\s+into)/i,
  /(drop\s+(table|database))/i,
  /(update\s+.*\s+set)/i,
  /(sleep\(\s*\d+\s*\))/i,
  /(benchmark\(\s*\d+\s*,)/i,

  // Cross-Site Scripting (XSS) patterns
  /(<script\b[^>]*>)/i,
  /(<\/script>)/i,
  /(javascript:\s*)/i,
  /(onerror\s*=\s*)/i,
  /(onload\s*=\s*)/i,
  /(document\.cookie)/i,
  /(alert\(\s*.*?\s*\))/i,
  /(<svg\b[^>]*onload=)/i,
  /(<img\b[^>]*onerror=)/i,

  // Path Traversal / Directory Traversal patterns
  /(\.\.\/|\.\.\\)/i, // ../ or ..\
  /(\/etc\/passwd)/i,
  /(\/etc\/shadow)/i,
  /(win\.ini|boot\.ini)/i,

  // Remote / Command Execution patterns
  /(;\s*(cat|ls|rm|dir|whoami|id|curl|wget)\b)/i,
  /(\$\(curl)/i,
  /(eval\(\s*base64_decode)/i,
];

export interface WafCheckResult {
  blocked: boolean;
  reason?: string;
  category?: 'MALICIOUS_USER_AGENT' | 'SQLI' | 'XSS' | 'PATH_TRAVERSAL' | 'COMMAND_INJECTION';
}

function safeDecode(val: string): string {
  try {
    return decodeURIComponent(val);
  } catch {
    return val;
  }
}

/**
 * Inspects request URL, query parameters, and headers against known attack vectors.
 */
export function inspectRequestWithWaf(request: NextRequest): WafCheckResult {
  const userAgent = request.headers.get('user-agent') || '';

  // 1. Check User Agent
  for (const agentPattern of BLOCKED_USER_AGENTS) {
    if (agentPattern.test(userAgent)) {
      return {
        blocked: true,
        reason: `Blocked scanner user-agent: ${userAgent.slice(0, 30)}`,
        category: 'MALICIOUS_USER_AGENT',
      };
    }
  }

  // 2. Check Request URL path and query string (inspect both raw and decoded)
  const rawUrl = request.nextUrl.pathname + request.nextUrl.search;
  const decodedUrl = safeDecode(rawUrl);

  // Check path traversal
  if (
    /(\.\.\/|\.\.\\)/.test(rawUrl) ||
    /(\.\.\/|\.\.\\)/.test(decodedUrl) ||
    /(\/etc\/passwd|\/etc\/shadow|win\.ini|boot\.ini)/i.test(decodedUrl)
  ) {
    return {
      blocked: true,
      reason: 'Directory traversal attempt detected.',
      category: 'PATH_TRAVERSAL',
    };
  }

  // Check XSS
  if (
    /(<script|<svg|<img\b.*onerror|javascript:|document\.cookie|alert\(|onload=)/i.test(
      decodedUrl
    ) ||
    /(%3Cscript|%3Csvg|javascript%3A)/i.test(rawUrl)
  ) {
    return {
      blocked: true,
      reason: 'Cross-Site Scripting (XSS) payload detected in request URL.',
      category: 'XSS',
    };
  }

  // Check SQLi (UNION SELECT, SELECT FROM, DROP TABLE, SLEEP, etc.)
  if (
    /(union(\s+|\+)+select|select\b.*\bfrom|insert\b.*\binto|drop\b.*\b(table|database)|sleep\(\s*\d+\s*\)|benchmark\(\s*\d+\s*,|--|\bor\b\s+['"\d]+=['"\d]+)/i.test(
      decodedUrl
    ) ||
    /(union(%20|\+)+select)/i.test(rawUrl)
  ) {
    return {
      blocked: true,
      reason: 'SQL Injection payload detected in request URL.',
      category: 'SQLI',
    };
  }

  // Check Command Injection
  if (
    /(;\s*(cat|rm|dir|whoami|curl|wget)\b|\$\(curl|`id`)/i.test(decodedUrl)
  ) {
    return {
      blocked: true,
      reason: 'Command injection payload detected in request URL.',
      category: 'COMMAND_INJECTION',
    };
  }

  return { blocked: false };
}

// ============================================================================
// 2. SLIDING-WINDOW IP RATE LIMITER & BRUTE-FORCE SHIELD
// ============================================================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory sliding window stores (IP -> record)
const publicRateMap = new Map<string, RateLimitRecord>();
const apiRateMap = new Map<string, RateLimitRecord>();
const authRateMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    publicRateMap.forEach((rec, ip) => {
      if (now > rec.resetAt) publicRateMap.delete(ip);
    });
    apiRateMap.forEach((rec, ip) => {
      if (now > rec.resetAt) apiRateMap.delete(ip);
    });
    authRateMap.forEach((rec, ip) => {
      if (now > rec.resetAt) authRateMap.delete(ip);
    });
  }, 5 * 60 * 1000);
  if (typeof cleanupTimer === 'object' && cleanupTimer !== null && 'unref' in cleanupTimer) {
    (cleanupTimer as NodeJS.Timeout).unref();
  }
}

export type RateLimitTier = 'public' | 'api' | 'auth';

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

const TIER_CONFIG: Record<RateLimitTier, { limit: number; windowMs: number }> = {
  public: { limit: 150, windowMs: 60 * 1000 }, // 150 requests per min for general pages
  api: { limit: 40, windowMs: 60 * 1000 }, // 40 requests per min for API endpoints
  auth: { limit: 8, windowMs: 60 * 1000 }, // 8 login attempts per min to block brute-force
};

/**
 * Checks client IP rate limit with sliding window counter.
 */
export function checkRateLimit(clientIp: string, tier: RateLimitTier): RateLimitResult {
  const config = TIER_CONFIG[tier];
  const map = tier === 'auth' ? authRateMap : tier === 'api' ? apiRateMap : publicRateMap;

  const now = Date.now();
  let record = map.get(clientIp);

  if (!record || now > record.resetAt) {
    record = { count: 1, resetAt: now + config.windowMs };
    map.set(clientIp, record);
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetSeconds: Math.ceil(config.windowMs / 1000),
    };
  }

  record.count += 1;
  const remaining = Math.max(0, config.limit - record.count);
  const resetSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));

  return {
    allowed: record.count <= config.limit,
    limit: config.limit,
    remaining,
    resetSeconds,
  };
}

/**
 * Extracts best client IP from request headers (supports proxies, Cloudflare, standard x-forwarded-for).
 */
export function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  return '127.0.0.1';
}

// ============================================================================
// 3. AUTHORIZED STAFF & CREDENTIAL DIRECTORY
// ============================================================================

export interface AuthorizedAccount {
  email: string;
  name: string;
  role: 'admin' | 'shop_manager';
  isSuperAdmin: boolean;
  passwordHash: string; // Plaintext or hash verified on server
}

// Authoritative Showroom Accounts
export const AUTHORIZED_ACCOUNTS: AuthorizedAccount[] = [
  {
    email: 'adityaenterprises.work24@gmail.com',
    name: 'Aditya Enterprises (Showroom Owner)',
    role: 'admin',
    isSuperAdmin: true,
    passwordHash: 'Sharma@2026',
  },
  {
    email: 'manager@sharmabazaar.com',
    name: 'Vasant Kunj Showroom Manager',
    role: 'shop_manager',
    isSuperAdmin: false,
    passwordHash: 'Manager@2026',
  },
  {
    email: 'inventory@sharmabazaar.com',
    name: 'Electronics Procurement Lead',
    role: 'shop_manager',
    isSuperAdmin: false,
    passwordHash: 'Inventory@2026',
  },
];
