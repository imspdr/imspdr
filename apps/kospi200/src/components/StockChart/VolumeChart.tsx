import { FC } from 'react';

import {
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartTooltip } from './ChartTooltip';

interface VolumeChartProps {
  data: any[];
  syncId: string;
  startIndex: number;
  endIndex: number;
  onBrushChange: (e: any) => void;
}

export const VolumeChartIndex: FC<VolumeChartProps> = ({
  data,
  syncId,
  startIndex,
  endIndex,
  onBrushChange,
}) => {
  return (
    <div style={{ height: '30%', width: '100%' }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
          syncId={syncId}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="date"
            tickFormatter={(value: string) => value.slice(5)}
            minTickGap={30}
            style={{ fontSize: '11px' }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            yAxisId="volume"
            orientation="right"
            tickFormatter={(value: number) =>
              value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value.toLocaleString()
            }
            width={60}
            style={{ fontSize: '11px' }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar yAxisId="volume" dataKey="amount" fill="#cfcfcf" barSize={20} opacity={0.5} />
          <Brush
            dataKey="date"
            height={30}
            stroke="#8884d8"
            startIndex={startIndex}
            endIndex={endIndex}
            onChange={onBrushChange}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
