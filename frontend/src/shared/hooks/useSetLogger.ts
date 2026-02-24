import { useOptimisticMutation } from './useOptimisticMutation';
import { apiRequest } from '../api/client';
import type { SetLog } from '../models/domain';
import { endSetLogLatencyTrace, startSetLogLatencyTrace } from '../observability/performance';
import { logInfo } from '../observability/logger';

const setLogsKey = ['setLogs'];

export function useSetLogger() {
  return useOptimisticMutation<SetLog[], Omit<SetLog, 'id' | 'createdAt' | 'updatedAt'>, Record<string, never>>(
    setLogsKey,
    async (payload) => {
      startSetLogLatencyTrace();
      const created = await apiRequest<SetLog>('/api/sets', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      const durationMs = endSetLogLatencyTrace();
      logInfo('set.log.latency', { durationMs, exerciseId: payload.exerciseId });
      return [created];
    },
    (previous = [], payload) => {
      const optimistic: SetLog = {
        ...payload,
        id: `optimistic-${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return [...previous, optimistic];
    }
  );
}
