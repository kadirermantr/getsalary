import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { formatSalary } from '../../utils/calculations';

const CHAR_WIDTH = 6.5; // Approximate width per character at fontSize 11
const AXIS_PADDING = 16; // Extra padding for tick marks
const MAX_LABEL_CHARS = 28;

function truncateLabel(text, maxChars) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 1).trimEnd() + '…';
}

function CustomYTick({ x, y, payload }) {
  const label = truncateLabel(payload.value, MAX_LABEL_CHARS);
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor="end"
      fill="var(--text-secondary)"
      fontSize={11}
    >
      {label}
    </text>
  );
}

function CustomTooltip({ active, payload }) {
  const { i18n } = useTranslation();
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold text-[var(--text-primary)]">{data.name}</p>
      <p className="text-amber-400">{formatSalary(data.predicted, i18n.language)}</p>
      <p className="text-xs text-[var(--text-secondary)]">R²: {data.rSquared}</p>
    </div>
  );
}

export function PositionForecast({ predictions, year, width, height, selectedPosition }) {
  const { t } = useTranslation();

  const data = Object.entries(predictions)
    .slice(0, 10)
    .map(([name, { predicted, rSquared }]) => ({
      name,
      predicted: Math.round(predicted),
      rSquared,
      fill: selectedPosition ? (name === selectedPosition ? '#f59e0b' : '#6366f1') : '#f59e0b',
    }));

  // Calculate YAxis width dynamically based on longest label
  const axisWidth = useMemo(() => {
    const maxLen = Math.min(
      Math.max(...data.map((d) => d.name.length)),
      MAX_LABEL_CHARS,
    );
    return Math.round(maxLen * CHAR_WIDTH) + AXIS_PADDING;
  }, [data]);

  return (
    <BarChart data={data} width={width} height={height} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} horizontal={false} />
      <XAxis
        type="number"
        stroke="var(--text-secondary)"
        fontSize={11}
        tickLine={false}
        tickFormatter={(v) => `${Math.round(v / 1000)}K`}
      />
      <YAxis
        type="category"
        dataKey="name"
        tickLine={false}
        width={axisWidth}
        tick={<CustomYTick />}
      />
      <Tooltip content={<CustomTooltip />} cursor={false} />
      <Bar
        dataKey="predicted"
        radius={[0, 4, 4, 0]}
        name={`${year} ${t('prediction.predicted')}`}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
}
