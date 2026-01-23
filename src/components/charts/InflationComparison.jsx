import { useTranslation } from 'react-i18next';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { CHART_COLOR_ARRAY, YEARS } from '../../data/config';
import { formatSalary, formatPercentage } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';
import { ChartWrapper } from './ChartWrapper';

export function InflationComparison() {
  const { t, i18n } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  // Annual inflation rates (TÜFE - approximate year-end values)
  const inflationRates = {
    2021: 36.1,
    2022: 64.3,
    2023: 64.8,
    2024: 44.4,
    2025: 30.0, // Estimated
  };

  if (loading) {
    return (
      <Card title={t('charts.inflationComparison')} icon={ChartIcons.inflation}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const allYearsStats = YEARS.map((year) => getYearStats(year, filters)).filter(Boolean);

  if (!allYearsStats || allYearsStats.length < 2) {
    return (
      <Card title={t('charts.inflationComparison')} icon={ChartIcons.inflation}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  // Calculate year-over-year salary growth
  const data = allYearsStats.slice(1).map((yearStats, index) => {
    const prevStats = allYearsStats[index];
    const salaryGrowth = prevStats.medianSalary
      ? ((yearStats.medianSalary - prevStats.medianSalary) / prevStats.medianSalary) * 100
      : 0;
    const inflation = inflationRates[yearStats.year] || 0;
    const realGrowth = salaryGrowth - inflation;

    return {
      year: yearStats.year,
      salaryGrowth: Math.round(salaryGrowth * 10) / 10,
      inflation: inflation,
      realGrowth: Math.round(realGrowth * 10) / 10,
      medianSalary: yearStats.medianSalary,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const item = data.find((d) => d.year === label);

    return (
      <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
        <p className="text-sm" style={{ color: CHART_COLOR_ARRAY[1] }}>
          {t('charts.salaryGrowth')}: {formatPercentage(item?.salaryGrowth, 1, i18n.language)}
        </p>
        <p className="text-sm" style={{ color: CHART_COLOR_ARRAY[3] }}>
          {t('charts.inflation')}: {formatPercentage(item?.inflation, 1, i18n.language)}
        </p>
        <p className="text-sm font-semibold" style={{ color: item?.realGrowth >= 0 ? CHART_COLOR_ARRAY[1] : CHART_COLOR_ARRAY[3] }}>
          {t('charts.realGrowth')}: {formatPercentage(item?.realGrowth, 1, i18n.language)}
        </p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('charts.median')}: {formatSalary(item?.medianSalary, i18n.language)}
        </p>
      </div>
    );
  };

  return (
    <Card title={t('charts.inflationComparison')} icon={ChartIcons.inflation}>
      <ChartWrapper height="h-72">
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
          <XAxis
            dataKey="year"
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Legend />
          <Bar
            dataKey="salaryGrowth"
            name={t('charts.salaryGrowth')}
            fill={CHART_COLOR_ARRAY[1]}
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="inflation"
            name={t('charts.inflation')}
            stroke={CHART_COLOR_ARRAY[3]}
            strokeWidth={3}
            dot={{ fill: CHART_COLOR_ARRAY[3], strokeWidth: 2, r: 5 }}
          />
        </ComposedChart>
      </ChartWrapper>
      <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
        {t('charts.inflationDesc')}
      </p>
    </Card>
  );
}
