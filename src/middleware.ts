import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from './actions/auth'

const protectedRoutes: string[] = []
const publicRoutes: string[] = ['/login', '/signup']

export async function middleware(req: NextRequest) {
  // check current route if public or private
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const session = await getSession()

  // redirect to login if user is not authenticated
  if (isProtectedRoute && !session.id)
    return NextResponse.redirect(new URL('/login', req.nextUrl))

  // redirect to home if user is already authenticated
  if (isPublicRoute && session.id)
    return NextResponse.redirect(new URL('/', req.nextUrl))

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}