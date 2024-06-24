import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

export function middleware(request: NextRequest) {
  let locales = ['en', 'pl'];
  let headers = { 'accept-language': 'en-US,en;q=0.5' };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = 'en';

  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale || pathname.startsWith('/fonts')) return;

  const locale = match(languages, locales, defaultLocale);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
