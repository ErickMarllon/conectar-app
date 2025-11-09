import { onCLS, onLCP, onTTFB, onFCP, onINP } from 'web-vitals';

export type Metrics = {
  id: string;
  name: string;
  value: number;
  label?: string;
};

export function reportWebVitals(onPerfEntry?: (metric: Metrics) => void) {
  if (!onPerfEntry) return;

  onCLS(onPerfEntry);
  onLCP(onPerfEntry);
  onFCP(onPerfEntry);
  onTTFB(onPerfEntry);
  onINP(onPerfEntry);
}
