import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { CHART_COLOR_ARRAY, YEARS } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';
import { ChartWrapper } from './ChartWrapper';

export function MinWageMultiplier() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  if (loading) {
    return (
      <Card title={t('charts.minWageMultiplier')} icon={ChartIcons.multiplier}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const allYearsStats = YEARS.map((year) => getYearStats(year, filters)).filter(Boolean);

  if (!allYearsStats || allYearsStats.length === 0) {
    return (
      <Card title={t('charts.minWageMultiplier')} icon={ChartIcons.multiplier}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  const data = allYearsStats.map((yearStats) => ({
    year: yearStats.year,
    multiplier: yearStats.multiplier?.toFixed(2) || 0,
    medianSalary: yearStats.medianSalary,
    minWage: yearStats.minWage,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const item = data.find((d) => d.year === label);

    return (
      <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
        <p className="text-sm" style={{ color: CHART_COLOR_ARRAY[0] }}>
          {t('charts.multiplier')}: {item?.multiplier}x
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {t('charts.median')}: {formatSalary(item?.medianSalary, locale)}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {t('charts.minWage')}: {formatSalary(item?.minWage, locale)}
        </p>
      </div>
    );
  };

  return (
    <Card title={t('charts.minWageMultiplier')} icon={ChartIcons.multiplier}>
      <ChartWrapper height="h-72">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
          <XAxis
            dataKey="year"
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <YAxis
            domain={[0, 'auto']}
            tickFormatter={(value) => `${value}x`}
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Legend />
          <ReferenceLine
            y={1}
            stroke="var(--text-secondary)"
            strokeDasharray="3 3"
            label={{ value: t('charts.minWageLabel'), fill: 'var(--text-secondary)', fontSize: 10 }}
          />
          <Line
            type="monotone"
            dataKey="multiplier"
            name={t('charts.salaryToMinWage')}
            stroke={CHART_COLOR_ARRAY[0]}
            strokeWidth={3}
            dot={{ fill: CHART_COLOR_ARRAY[0], strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ChartWrapper>
      <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
        {t('charts.minWageTrendDesc')}
      </p>
    </Card>
  );
}
