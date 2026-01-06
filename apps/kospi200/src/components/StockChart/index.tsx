import React, { useMemo } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Analysis } from '../../hooks/useKospiData';
import { ChartContainer } from './styled';

interface StockChartProps {
  data: Analysis[];
  showBollinger: boolean;
}

const CandlestickShape = (props: any) => {
  const { x, y, width, payload, yAxis } = props;
  const { start, end, high, low } = payload;
  const isRising = end > start;
  const isFalling = end < start;
  const color = isRising ? '#e23d29' : isFalling ? '#1e75d0' : '#999999';

  if (!yAxis) return null;

  const yHigh = yAxis.scale(high);
  const yLow = yAxis.scale(low);
  const yOpen = yAxis.scale(start);
  const yClose = yAxis.scale(end);

  const bodyTop = Math.min(yOpen, yClose);
  const bodyBottom = Math.max(yOpen, yClose);
  const bodyHeight = Math.max(1, bodyBottom - bodyTop);

  return (
    <g>
      <line
        x1={x + width / 2}
        y1={yHigh}
        x2={x + width / 2}
        y2={bodyTop}
        stroke={color}
        strokeWidth={1}
      />
      <line
        x1={x + width / 2}
        y1={bodyBottom}
        x2={x + width / 2}
        y2={yLow}
        stroke={color}
        strokeWidth={1}
      />
      <rect x={x} y={bodyTop} width={width} height={bodyHeight} fill={color} stroke={color} />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as Analysis;
    const isRising = data.end > data.start;
    const isFalling = data.end < data.start;
    const color = isRising ? '#e23d29' : isFalling ? '#1e75d0' : '#999999';
    return (
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#333',
        }}
      >
        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{data.date}</p>
        <p style={{ color }}>Close: {data.end.toLocaleString()}</p>
        <p>Open: {data.start.toLocaleString()}</p>
        <p>High: {data.high.toLocaleString()}</p>
        <p>Low: {data.low.toLocaleString()}</p>
        <p>Vol: {data.amount.toLocaleString()}</p>
        <p>MA5: {data.ma5.toLocaleString()}</p>
        <p>MA20: {data.ma20.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const StockChart: React.FC<StockChartProps> = ({ data, showBollinger }) => {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      upperBand: Number(d.upperBand),
      lowerBand: Number(d.lowerBand),
      middleBand: Number(d.middleBand),
    }));
  }, [data]);

  const { minPrice, maxPrice } = useMemo(() => {
    const prices = chartData.flatMap((d: any) =>
      [d.low, d.high, d.upperBand, d.lowerBand].filter((v: number) => v > 0),
    );
    if (prices.length === 0) return { minPrice: 0, maxPrice: 100 };

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    // Add 5% padding
    return { minPrice: min * 0.95, maxPrice: max * 1.05 };
  }, [chartData]);

  return (
    <ChartContainer>
      {chartData.length > 0 ? (
        <ResponsiveContainer>
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis
              dataKey="date"
              tickFormatter={(value: string) => value.slice(5)}
              minTickGap={30}
              style={{ fontSize: '11px' }}
            />
            <YAxis
              yAxisId="price"
              domain={[minPrice, maxPrice]}
              tickFormatter={(value: number) => value.toLocaleString()}
              width={60}
              orientation="right"
              scale="linear"
              style={{ fontSize: '11px' }}
              allowDataOverflow
            />
            <YAxis
              yAxisId="volume"
              orientation="left"
              tick={false}
              axisLine={false}
              height={100}
              domain={[0, 'dataMax * 4']}
            />

            <Tooltip content={<CustomTooltip />} />

            {showBollinger && (
              <defs>
                <linearGradient id="bollingerFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            )}

            {showBollinger && (
              <Area
                yAxisId="price"
                dataKey={(data: any) => [data.lowerBand, data.upperBand]}
                stroke="none"
                fill="#8884d8"
                fillOpacity={0.15}
              />
            )}

            {showBollinger && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="upperBand"
                stroke="#ccc"
                dot={false}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )}
            {showBollinger && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="lowerBand"
                stroke="#ccc"
                dot={false}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )}

            <Line
              yAxisId="price"
              type="monotone"
              dataKey="ma5"
              stroke="#ff9f43"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="ma20"
              stroke="#feca57"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
            />

            <Bar yAxisId="volume" dataKey="amount" fill="#cfcfcf" barSize={20} opacity={0.5} />

            <Bar
              yAxisId="price"
              dataKey="end"
              shape={<CandlestickShape />}
              barSize={12}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
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
      )}
    </ChartContainer>
  );
};
