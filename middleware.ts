import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logInfo } from '@/lib/logger';

export function middleware(request: NextRequest) {
  const { method, nextUrl } = request;
  const path = nextUrl.pathname;

  logInfo('Incoming request', {
    method,
    path,
    user_agent: request.headers.get('user-agent')?.slice(0, 80) ?? undefined,
  });

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|ico|svg)).*)',
  ],
};
