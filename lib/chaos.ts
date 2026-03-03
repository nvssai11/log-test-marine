/**
 * Chaos / failure injection config for CI/CD monitoring and root cause analysis testing.
 * All flags are read from environment variables. Application behaves normally when flags are false/unset.
 */

function envTruthy(key: string): boolean {
  const v = process.env[key];
  return v === 'true' || v === '1';
}

/** When true, application intentionally crashes on startup (for chaos testing). */
export function isChaosModeEnabled(): boolean {
  return envTruthy('CHAOS_MODE');
}

/** When true, health check endpoint returns HTTP 500 (for chaos testing). */
export function isFailHealthEnabled(): boolean {
  return envTruthy('FAIL_HEALTH');
}

export interface ChaosLogPayload {
  level: 'error';
  message: string;
  timestamp: string;
  chaos_mode?: boolean;
  fail_health?: boolean;
  env: string;
}

/** Emit a structured error log for chaos/failure scenarios. */
export function logChaosError(payload: Omit<ChaosLogPayload, 'level' | 'timestamp' | 'env'>): void {
  const full: ChaosLogPayload = {
    level: 'error',
    timestamp: new Date().toISOString(),
    env: 'chaos_test',
    ...payload,
  };
  console.error(JSON.stringify(full));
}
