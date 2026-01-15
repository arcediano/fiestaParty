import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/landing',
    '/login',
    '/register',
    '/api/auth',
    '/pricing',
    '/terms',
    '/privacy'
  ]

  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )

  // API routes that don't require authentication
  const publicApiRoutes = [
    '/api/auth',
    '/api/public'
  ]

  const isPublicApiRoute = publicApiRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Redirect authenticated users away from auth pages
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect private routes
  if (!token && !isPublicPath && !isPublicApiRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check subscription for premium routes
  if (token && pathname.startsWith('/dashboard/premium')) {
    const response = await fetch(new URL('/api/user/subscription', request.url), {
      headers: {
        'Cookie': request.headers.get('cookie') || ''
      }
    })

    if (response.ok) {
      const { subscription } = await response.json()
      
      if (!subscription || subscription.status !== 'active' || subscription.plan.name !== 'premium') {
        return NextResponse.redirect(new URL('/pricing', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}