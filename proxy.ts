import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // On va implémenter la protection de routes côté client pour l'instant
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

