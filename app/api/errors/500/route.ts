import { NextResponse } from 'next/server';
import { logError } from '@/lib/logger';

/** Trigger a 500 server error response (for testing). */
export async function GET() {
  logError('Intentional 500 triggered', { endpoint: '/api/errors/500', status: 500 });
  return NextResponse.json(
    { error: 'Internal Server Error', message: 'Intentional 500 for testing' },
    { status: 500 }
  );
}
