import { useTranslation } from 'react-i18next';
import { formatSalary } from '../../utils/calculations';

export function ChartTooltip({ active, payload, label, showPercentile = false }) {
  const { t } = useTranslation();

  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload;

  return (
    <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-xl min-w-[180px]">
      <p className="font-semibold text-[var(--text-primary)] mb-2 pb-2 border-b border-[var(--bg-secondary)]">
        {label || data?.name || data?.position || data?.level || data?.city || data?.mode || data?.tech}
      </p>

      <div className="space-y-1.5">
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between items-center gap-4">
            <span className="text-sm text-[var(--text-secondary)]">{entry.name}:</span>
            <span className="text-sm font-medium" style={{ color: entry.color || 'var(--text-primary)' }}>
              {formatSalary(entry.value)}
            </span>
          </div>
        ))}

        {data?.count && (
          <div className="flex justify-between items-center gap-4 pt-1 border-t border-[var(--bg-secondary)] mt-2">
            <span className="text-xs text-[var(--text-secondary)]">{t('charts.participants')}:</span>
            <span className="text-xs font-medium text-[var(--text-primary)]">
              {data.count.toLocaleString('tr-TR')}
            </span>
          </div>
        )}

        {showPercentile && data?.p25 && data?.p75 && (
          <div className="flex justify-between items-center gap-4">
            <span className="text-xs text-[var(--text-secondary)]">25-75%:</span>
            <span className="text-xs text-[var(--text-primary)]">
              {formatSalary(data.p25)} - {formatSalary(data.p75)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ComparisonTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-xl">
      <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-[var(--text-secondary)]">{entry.name}:</span>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {typeof entry.value === 'number'
                ? entry.value > 1000
                  ? formatSalary(entry.value)
                  : `${entry.value.toFixed(1)}${entry.unit || ''}`
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
