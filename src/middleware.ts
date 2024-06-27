import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '3600s'),
});

export async function middleware(request: NextRequest) {
  if (request.method === 'POST' && process.env.NODE_ENV === 'production') {
    const ip = request.ip ?? '127.0.0.1';
    const { limit, reset, remaining } = await ratelimit.limit(ip);

    if (remaining === 0) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  let locales = ['en', 'pl'];
  let headers = { 'accept-language': 'en-US,en;q=0.5' };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = 'en';

  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (
    pathnameHasLocale ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/images')
  )
    return;

  const locale = match(languages, locales, defaultLocale);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next).*)'],
  runtime: 'experimental-edge',
};
