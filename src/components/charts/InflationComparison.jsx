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
import macroData from '../../data/macroeconomic.json';

// Build USD/TRY lookup from macroeconomic data
const usdTryByYear = Object.fromEntries(
  macroData.data.map((d) => [d.year, d.usdTryAvg]),
);

export function InflationComparison() {
  const { t, i18n } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  // Annual inflation rates (TÜFE)
  const inflationRates = Object.fromEntries(
    macroData.data.map((d) => [d.year, d.cpiInflation]),
  );

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

  // Build data with USD median for all years
  const data = allYearsStats.map((yearStats, index) => {
    const prevStats = index > 0 ? allYearsStats[index - 1] : null;
    const salaryGrowth = prevStats?.medianSalary
      ? ((yearStats.medianSalary - prevStats.medianSalary) / prevStats.medianSalary) * 100
      : null;
    const inflation = inflationRates[yearStats.year] || 0;
    const realGrowth = salaryGrowth !== null ? salaryGrowth - inflation : null;

    const usdRate = usdTryByYear[yearStats.year];
    const medianUsd = usdRate ? Math.round(yearStats.medianSalary / usdRate) : null;

    return {
      year: yearStats.year,
      salaryGrowth: salaryGrowth !== null ? Math.round(salaryGrowth * 10) / 10 : null,
      inflation,
      realGrowth: realGrowth !== null ? Math.round(realGrowth * 10) / 10 : null,
      medianSalary: yearStats.medianSalary,
      medianUsd,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const item = data.find((d) => d.year === label);

    return (
      <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
        {item?.salaryGrowth !== null && (
          <p className="text-sm" style={{ color: CHART_COLOR_ARRAY[1] }}>
            {t('charts.salaryGrowth')}: {formatPercentage(item?.salaryGrowth, 1, i18n.language)}
          </p>
        )}
        <p className="text-sm" style={{ color: CHART_COLOR_ARRAY[3] }}>
          {t('charts.inflation')}: {formatPercentage(item?.inflation, 1, i18n.language)}
        </p>
        {item?.realGrowth !== null && (
          <p className="text-sm font-semibold" style={{ color: item?.realGrowth >= 0 ? CHART_COLOR_ARRAY[1] : CHART_COLOR_ARRAY[3] }}>
            {t('charts.realGrowth')}: {formatPercentage(item?.realGrowth, 1, i18n.language)}
          </p>
        )}
        <div className="border-t border-[var(--border)] mt-1.5 pt-1.5">
          <p className="text-sm text-[var(--text-secondary)]">
            {t('charts.median')}: {formatSalary(item?.medianSalary, i18n.language)}
          </p>
          {item?.medianUsd && (
            <p className="text-sm font-semibold" style={{ color: CHART_COLOR_ARRAY[6] }}>
              USD: ${item.medianUsd.toLocaleString('en-US')}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card title={t('charts.inflationComparison')} icon={ChartIcons.inflation}>
      <ChartWrapper height="h-72">
        <ComposedChart data={data} margin={{ top: 20, right: 10, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
          <XAxis
            dataKey="year"
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <YAxis
            yAxisId="percent"
            tickFormatter={(value) => `${value}%`}
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <YAxis
            yAxisId="usd"
            orientation="right"
            tickFormatter={(value) => `$${value}`}
            stroke={CHART_COLOR_ARRAY[6]}
            fontSize={11}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          <Bar
            yAxisId="percent"
            dataKey="salaryGrowth"
            name={t('charts.salaryGrowth')}
            fill={CHART_COLOR_ARRAY[1]}
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="percent"
            type="monotone"
            dataKey="inflation"
            name={t('charts.inflation')}
            stroke={CHART_COLOR_ARRAY[3]}
            strokeWidth={3}
            dot={{ fill: CHART_COLOR_ARRAY[3], strokeWidth: 2, r: 5 }}
          />
          <Line
            yAxisId="usd"
            type="monotone"
            dataKey="medianUsd"
            name={t('charts.medianUsd')}
            stroke={CHART_COLOR_ARRAY[6]}
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ fill: CHART_COLOR_ARRAY[6], strokeWidth: 2, r: 4 }}
          />
        </ComposedChart>
      </ChartWrapper>
      <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
        {t('charts.inflationDesc')}
      </p>
    </Card>
  );
}
