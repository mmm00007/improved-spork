import { logInfo } from '../observability/logger';

interface RequestOptions extends RequestInit {
  authToken?: string;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.authToken) {
    headers.set('Authorization', `Bearer ${options.authToken}`);
  }

  const requestStart = performance.now();
  const response = await fetch(path, { ...options, headers });
  const latencyMs = performance.now() - requestStart;

  logInfo('api.request', { path, method: options.method ?? 'GET', status: response.status, latencyMs });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Request failed: ${response.status} ${errorBody}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
