/**
 * Next.js instrumentation hook. Runs once when the Node.js server starts.
 * Used for CHAOS_MODE: intentional crash for CI/CD and root cause analysis testing.
 */

import { isChaosModeEnabled, logChaosError } from '@/lib/chaos';

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  if (isChaosModeEnabled()) {
    logChaosError({
      message:
        'CHAOS_MODE enabled: intentional process exit for CI/CD monitoring and AI root cause analysis testing',
      chaos_mode: true,
    });
    process.exit(1);
  }
}
