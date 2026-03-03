/**
 * Structured JSON logger for application and request logs.
 * Keeps AKS/log aggregation varied and parseable (level, message, timestamp, context).
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

function emit(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  const payload: LogPayload = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
  };
  const line = JSON.stringify(payload);
  if (level === 'error') {
    console.error(line);
  } else {
    console.log(line);
  }
}

export function logInfo(message: string, context?: Record<string, unknown>): void {
  emit('info', message, context);
}

export function logWarn(message: string, context?: Record<string, unknown>): void {
  emit('warn', message, context);
}

export function logError(message: string, context?: Record<string, unknown>): void {
  emit('error', message, context);
}

export function logDebug(message: string, context?: Record<string, unknown>): void {
  emit('debug', message, context);
}
