import { lazy } from 'react';

// ----------------------------------------------------------------------
// lazy load do react-apexcharts
const Chart = lazy(() => import('react-apexcharts'));

// ----------------------------------------------------------------------
// reexportações
export { default as StyledChart } from './styles';
export { default as useChart } from './useChart';
export default Chart;
