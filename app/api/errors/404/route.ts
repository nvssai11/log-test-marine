import { NextResponse } from 'next/server';
import { logError } from '@/lib/logger';

/** Trigger a 404 not found response (for testing). */
export async function GET() {
  logError('Intentional 404 triggered', { endpoint: '/api/errors/404', status: 404 });
  return NextResponse.json(
    { error: 'Not Found', message: 'Intentional 404 for testing' },
    { status: 404 }
  );
}
