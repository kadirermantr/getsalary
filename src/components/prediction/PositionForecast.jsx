import { useMemo, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { formatSalary } from '../../utils/calculations';

const CHAR_WIDTH = 6.5;
const AXIS_PADDING = 16;
const MAX_LABEL_CHARS = 28;
const BAR_HEIGHT = 36;

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
      <p className="text-blue-400">{formatSalary(data.predicted, i18n.language)}</p>
      <p className="text-xs text-[var(--text-secondary)]">R²: {data.rSquared}</p>
    </div>
  );
}

export function PositionForecast({ predictions, year, selectedPosition }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      const w = containerRef.current.getBoundingClientRect().width;
      if (w > 0) setContainerWidth(Math.floor(w));
    };
    const timer = setTimeout(update, 50);
    const observer = new ResizeObserver(update);
    observer.observe(containerRef.current);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const data = Object.entries(predictions)
    .map(([name, { predicted, rSquared }]) => ({
      name,
      predicted: Math.round(predicted),
      rSquared,
      fill: selectedPosition
        ? (name === selectedPosition ? 'url(#selectedGradient)' : 'url(#defaultGradient)')
        : 'url(#defaultGradient)',
    }));

  const axisWidth = useMemo(() => {
    const maxLen = Math.min(
      Math.max(...data.map((d) => d.name.length)),
      MAX_LABEL_CHARS,
    );
    return Math.round(maxLen * CHAR_WIDTH) + AXIS_PADDING;
  }, [data]);

  const chartHeight = data.length * BAR_HEIGHT + 40;

  return (
    <div ref={containerRef} className="max-h-96 overflow-y-auto">
      {containerWidth > 0 && (
        <BarChart data={data} width={containerWidth} height={chartHeight} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="defaultGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="selectedGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
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
      )}
    </div>
  );
}
