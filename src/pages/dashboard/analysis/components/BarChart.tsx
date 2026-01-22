import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';

interface BarChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chart = new Chart({
      container: chartRef.current,
      autoFit: true,
    });

    chart.data(data);
    chart.coordinate({ transform: [{ type: 'transpose' }] });
    chart
      .interval()
      .encode('x', 'name')
      .encode('y', 'value')
      .encode('color', 'name');
    chart.legend(false);
    chart.axis('y', { labelFormatter: '~s' });
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <div ref={chartRef} style={{ height: 400 }} />;
};

export default BarChart;
