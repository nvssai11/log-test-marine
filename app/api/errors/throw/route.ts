import { logError } from '@/lib/logger';

/** Trigger an unhandled runtime error (for testing). */
export async function GET() {
  logError('Intentional runtime error triggered', { endpoint: '/api/errors/throw' });
  throw new Error('Intentional runtime error for testing');
}
