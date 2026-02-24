export function logInfo(message: string, context?: Record<string, unknown>): void {
  // centralized client logging sink; can be replaced by Sentry/Datadog later
  console.info(`[client] ${message}`, context ?? {});
}

export function logError(message: string, error: unknown, context?: Record<string, unknown>): void {
  console.error(`[client] ${message}`, { error, ...(context ?? {}) });
}
