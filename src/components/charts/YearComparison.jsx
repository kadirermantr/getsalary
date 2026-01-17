import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { YEARS, CHART_COLOR_ARRAY } from '../../data/config';
import { formatSalary, calculateGrowthRate, formatPercentage } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';

export function YearComparison() {
  const { t, i18n } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  // Default to last two years
  const availableYears = [...YEARS].sort((a, b) => b - a);
  const [year1, setYear1] = useState(availableYears[1] || availableYears[0]);
  const [year2, setYear2] = useState(availableYears[0]);

  if (loading) {
    return (
      <Card title={t('yearComparison.title')} icon={ChartIcons.trend}>
        <div className="h-80 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const stats1 = getYearStats(year1, { ...filters, year: year1 });
  const stats2 = getYearStats(year2, { ...filters, year: year2 });

  if (!stats1 || !stats2) {
    return (
      <Card title={t('yearComparison.title')} icon={ChartIcons.trend}>
        <div className="h-80 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  // Compare by position
  const positionData = [];
  const positions = new Set([
    ...Object.keys(stats1.byPosition || {}),
    ...Object.keys(stats2.byPosition || {}),
  ]);

  positions.forEach((position) => {
    const salary1 = stats1.byPosition?.[position]?.median || 0;
    const salary2 = stats2.byPosition?.[position]?.median || 0;

    if (salary1 > 0 && salary2 > 0) {
      const growth = calculateGrowthRate(salary2, salary1);
      positionData.push({
        position: position.replace(' Developer', '').replace(' Engineer', ''),
        [year1]: salary1,
        [year2]: salary2,
        growth,
      });
    }
  });

  // Sort by year2 salary (descending)
  positionData.sort((a, b) => b[year2] - a[year2]);

  // Take top 6
  const chartData = positionData.slice(0, 6);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const item = chartData.find((d) => d.position === label);
    const growthColor = item?.growth >= 0 ? 'text-green-500' : 'text-red-500';

    return (
      <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatSalary(entry.value)}
          </p>
        ))}
        {item && (
          <p className={`text-sm font-medium mt-1 ${growthColor}`}>
            {t('yearComparison.growth')}: {formatPercentage(item.growth, 1, i18n.language)}
          </p>
        )}
      </div>
    );
  };

  // Overall stats comparison
  const overallGrowth = calculateGrowthRate(stats2.medianSalary, stats1.medianSalary);

  return (
    <Card title={t('yearComparison.title')} icon={ChartIcons.trend}>
      {/* Year Selectors */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <select
            value={year1}
            onChange={(e) => setYear1(Number(e.target.value))}
            className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-3 py-1.5 border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
          >
            {availableYears.map((y) => (
              <option key={y} value={y} disabled={y === year2}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <span className="text-sm text-[var(--text-secondary)]">vs</span>

        <div className="flex items-center gap-2">
          <select
            value={year2}
            onChange={(e) => setYear2(Number(e.target.value))}
            className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-3 py-1.5 border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
          >
            {availableYears.map((y) => (
              <option key={y} value={y} disabled={y === year1}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Overall Growth Badge */}
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            overallGrowth >= 0
              ? 'bg-green-500/10 text-green-500'
              : 'bg-red-500/10 text-red-500'
          }`}
        >
          {t('charts.median')}: {formatPercentage(overallGrowth, 1, i18n.language)}
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
            <XAxis dataKey="position" stroke="var(--text-secondary)" fontSize={11} />
            <YAxis
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              stroke="var(--text-secondary)"
              fontSize={11}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value) => <span style={{ color: 'var(--text-secondary)' }}>{value}</span>}
            />
            <Bar dataKey={year1} name={String(year1)} fill={CHART_COLOR_ARRAY[4]} radius={[4, 4, 0, 0]} />
            <Bar dataKey={year2} name={String(year2)} fill={CHART_COLOR_ARRAY[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
