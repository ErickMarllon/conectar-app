import { lazy, Suspense } from 'react';

const ApexChart = lazy(() => import('react-apexcharts'));

interface ChartProps {
  options: any;
  series: any[];
  type?:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar';
  width?: string | number;
  height?: string | number;
}

export default function Chart(props: ChartProps) {
  return (
    <Suspense fallback={<div style={{ height: props.height || '400px' }}>Loading chart...</div>}>
      <ApexChart {...props} />
    </Suspense>
  );
}
