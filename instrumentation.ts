/**
 * Next.js instrumentation hook. Runs once when the Node.js server starts.
 */

import { logInfo } from '@/lib/logger';

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  logInfo('Application started', {
    runtime: process.env.NEXT_RUNTIME,
    node_version: process.version,
  });
}
