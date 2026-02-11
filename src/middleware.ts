import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 1. EXCLUDE STATIC FILES AND SEO FILES FROM REDIRECTION
    if (
        pathname.startsWith('/sitemap.xml') ||
        pathname.startsWith('/robots.txt') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/images/') ||
        pathname.includes('.') ||
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/')
    ) {
        return;
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale (except for the root path which can be served directly)
    if (pathnameIsMissingLocale && pathname !== '/') {
        const locale = defaultLocale;

        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - api (API routes)
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - images (public images)
        // - favicon.ico (favicon file)
        // - sitemap.xml (SEO)
        // - robots.txt (SEO)
        '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
