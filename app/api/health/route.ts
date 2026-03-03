import { NextResponse } from 'next/server';
import { isFailHealthEnabled, logChaosError } from '@/lib/chaos';
import { logInfo } from '@/lib/logger';

/**
 * Health check endpoint for load balancers and monitoring.
 * When FAIL_HEALTH=true, returns HTTP 500 for chaos testing; otherwise 200.
 */
export async function GET() {
  if (isFailHealthEnabled()) {
    logChaosError({
      message:
        'FAIL_HEALTH enabled: health check returning 500 for CI/CD and root cause analysis testing',
      fail_health: true,
    });
    return NextResponse.json(
      {
        status: 'unhealthy',
        message: 'Health check failure (FAIL_HEALTH=true)',
      },
      { status: 500 }
    );
  }

  logInfo('Health check passed', { endpoint: '/api/health', status: 'ok' });
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
