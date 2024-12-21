import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

const ignoredRoutes = ['/api/healthcheck', '/api/feedback', '/api/visitor-counter', '/api/whatsapp-click-counter', '/api/supabase-activity'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', '*')

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  const url = request.nextUrl.pathname;

  if (ignoredRoutes.includes(url)) {
    return NextResponse.next();
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    // Apply middleware to all API routes except for those you want to ignore
    '/api/:path*)',
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api/:path*|_next/static|_next/image|favicon.ico|healthcheck|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};