import { NextResponse } from 'next/server';
import { logInfo } from '@/lib/logger';

/**
 * Health check endpoint for load balancers and monitoring.
 */
export async function GET() {
  logInfo('Health check passed', { endpoint: '/api/health', status: 'ok' });
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
