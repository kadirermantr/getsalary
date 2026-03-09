import { useTranslation } from 'react-i18next';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { formatSalary } from '../../utils/calculations';

function CustomTooltip({ active, payload, label }) {
  const { i18n } = useTranslation();
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold text-[var(--text-primary)] mb-1">{label}</p>
      {payload.map((entry, i) => {
        if (entry.dataKey === 'ciBand' || entry.dataKey === 'ciLower') return null;
        return (
          <p key={i} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {formatSalary(entry.value, i18n.language)}
          </p>
        );
      })}
      {payload.find((p) => p.payload.ciLower) && (
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          {formatSalary(payload[0]?.payload.ciLower, i18n.language)} — {formatSalary(payload[0]?.payload.ciUpper, i18n.language)}
        </p>
      )}
    </div>
  );
}

export function PredictionChart({ data, width, height, lastTrainingYear }) {
  const { t } = useTranslation();

  // Transform data for stacked area confidence band
  const chartData = data.map((d) => ({
    ...d,
    ciLower: d.ciLower || null,
    ciBand: d.ciUpper && d.ciLower ? d.ciUpper - d.ciLower : null,
  }));

  return (
    <ComposedChart data={chartData} width={width} height={height} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
      <XAxis
        dataKey="year"
        stroke="var(--text-secondary)"
        fontSize={12}
        tickLine={false}
      />
      <YAxis
        stroke="var(--text-secondary)"
        fontSize={11}
        tickLine={false}
        tickFormatter={(v) => `${Math.round(v / 1000)}K`}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend
        wrapperStyle={{ fontSize: '12px' }}
        formatter={(value) => <span style={{ color: 'var(--text-secondary)' }}>{value}</span>}
      />

      {/* Reference line at transition point */}
      {lastTrainingYear && (
        <ReferenceLine
          x={lastTrainingYear}
          stroke="var(--text-muted)"
          strokeDasharray="4 4"
          strokeWidth={1}
        />
      )}

      {/* Confidence band: invisible lower area + visible band */}
      <Area
        type="monotone"
        dataKey="ciLower"
        stackId="confidence"
        stroke="none"
        fill="transparent"
        legendType="none"
        tooltipType="none"
      />
      <Area
        type="monotone"
        dataKey="ciBand"
        stackId="confidence"
        stroke="none"
        fill="#f59e0b"
        fillOpacity={0.12}
        name={t('prediction.confidenceBand')}
        legendType="none"
        tooltipType="none"
      />

      {/* Actual salary line */}
      <Line
        type="monotone"
        dataKey="actual"
        stroke="#3b82f6"
        strokeWidth={2.5}
        dot={{ r: 4, fill: '#3b82f6' }}
        name={t('prediction.actual')}
        connectNulls={false}
      />

      {/* Predicted salary line (dashed for future) */}
      <Line
        type="monotone"
        dataKey="predicted"
        stroke="#f59e0b"
        strokeWidth={2}
        strokeDasharray="8 4"
        dot={{ r: 4, fill: '#f59e0b', strokeDasharray: '' }}
        name={t('prediction.predicted')}
        connectNulls={true}
      />
    </ComposedChart>
  );
}
