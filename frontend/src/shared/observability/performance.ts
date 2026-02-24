const SET_LOG_MARKER = 'set-log';

export function startSetLogLatencyTrace(): void {
  performance.mark(`${SET_LOG_MARKER}-start`);
}

export function endSetLogLatencyTrace(): number {
  const endMark = `${SET_LOG_MARKER}-end`;
  const measureName = `${SET_LOG_MARKER}-latency`;
  performance.mark(endMark);
  performance.measure(measureName, `${SET_LOG_MARKER}-start`, endMark);

  const measurement = performance
    .getEntriesByName(measureName)
    .at(-1);

  return measurement?.duration ?? 0;
}
