import React, { useMemo, FC } from 'react';
import ReactECharts from 'echarts-for-react';
import { Analysis } from '../../hooks/useKospiData';
import { ChartContainer } from './styled';

interface StockChartProps {
  data: Analysis[];
  showBollinger?: boolean;
}

export const StockChart: FC<StockChartProps> = ({ data, showBollinger = false }) => {
  const chartData = useMemo(() => {
    const dates = data.map((item) => item.date);
    const candleData = data.map((item) => [
      Number(item.start),
      Number(item.end),
      Number(item.low),
      Number(item.high),
    ]);
    const volumes = data.map((item, index) => [
      index,
      Number(item.amount),
      Number(item.end) > Number(item.start) ? 1 : -1,
    ]);

    const upperBands = data.map((item) => Number(item.upperBand));
    const lowerBands = data.map((item) => Number(item.lowerBand));
    const middleBands = data.map((item) => Number(item.middleBand));

    return { dates, candleData, volumes, upperBands, lowerBands, middleBands };
  }, [data]);

  const option = useMemo(() => {
    const series: any[] = [
      {
        name: 'Price',
        type: 'candlestick',
        data: chartData.candleData,
        itemStyle: {
          color: '#e23d29', // Up
          color0: '#1e75d0', // Down
          borderColor: '#e23d29',
          borderColor0: '#1e75d0',
        },
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: chartData.volumes,
        itemStyle: {
          color: (params: any) => {
            return params.data[2] > 0 ? '#e23d29' : '#1e75d0';
          },
          opacity: 0.7,
        },
      },
    ];

    if (showBollinger) {
      series.push(
        {
          name: 'Upper Band',
          type: 'line',
          data: chartData.upperBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.5, width: 1, type: 'dashed' },
          itemStyle: { color: '#8884d8' },
        },
        {
          name: 'Lower Band',
          type: 'line',
          data: chartData.lowerBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.5, width: 1, type: 'dashed' },
          itemStyle: { color: '#8884d8' },
        },
        {
          name: 'Middle Band',
          type: 'line',
          data: chartData.middleBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.3, width: 1 },
          itemStyle: { color: '#8884d8' },
        },
      );
    }

    return {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#333',
        },
        position: (pos: any, params: any, el: any, elRect: any, size: any) => {
          const obj: any = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        },
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all',
          },
        ],
        label: {
          backgroundColor: '#777',
        },
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '60%',
        },
        {
          left: '10%',
          right: '8%',
          top: '75%',
          height: '15%',
        },
      ],
      xAxis: [
        {
          type: 'category',
          data: chartData.dates,
          boundaryGap: true,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100,
          },
        },
        {
          type: 'category',
          gridIndex: 1,
          data: chartData.dates,
          boundaryGap: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true,
          },
          axisLabel: {
            formatter: (value: number) => value.toLocaleString(),
          },
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {
            formatter: (value: number) =>
              value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value.toLocaleString(),
          },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 70,
          end: 100,
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '92%',
          start: 70,
          end: 100,
        },
      ],
      series: series,
    };
  }, [chartData, showBollinger]);

  if (data.length === 0) {
    return (
      <ChartContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          No Data Available
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </ChartContainer>
  );
};
