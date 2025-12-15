import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/', '/ads', '/orders', '/customers', '/analytics', '/chat', '/settings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const isAuthenticated = !!sessionCookie;

  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !isAuthenticated && pathname !== '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  if (pathname === '/login' && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Rewrite /products to /ads
  if (pathname.startsWith('/products')) {
    const newPathname = pathname.replace('/products', '/ads');
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
