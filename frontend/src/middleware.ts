import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ACCESS_TOKEN_COOKIE = 'nova_access_token';

// Route protection for /desktop (blueprint §6, §8). Verifies the access
// token's signature directly here — using `jose` (Edge-runtime
// compatible, unlike the backend's `jsonwebtoken`) with the same
// JWT_ACCESS_SECRET the backend signs with — instead of a network round
// trip to the backend on every navigation.
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/lock', request.url));
  }

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not set for the frontend middleware.');
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/lock', request.url));
  }
}

export const config = {
  matcher: ['/desktop/:path*'],
};