import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { CHART_COLOR_ARRAY, YEARS } from '../../data/config';
import { Card } from '../ui/Card';

export function MinWageMultiplier() {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  if (loading) {
    return (
      <Card title={t('charts.minWageMultiplier')} icon="💰">
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const allYearsStats = YEARS.map((year) => getYearStats(year, filters)).filter(Boolean);

  if (!allYearsStats || allYearsStats.length === 0) {
    return (
      <Card title={t('charts.minWageMultiplier')} icon="💰">
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
          Çarpan: {item?.multiplier}x
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          Medyan: {item?.medianSalary?.toLocaleString('tr-TR')} TL
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          Asgari: {item?.minWage?.toLocaleString('tr-TR')} TL
        </p>
      </div>
    );
  };

  return (
    <Card title={t('charts.minWageMultiplier')} icon="💰">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
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
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine
              y={1}
              stroke="var(--text-secondary)"
              strokeDasharray="3 3"
              label={{ value: '1x (Asgari Ücret)', fill: 'var(--text-secondary)', fontSize: 10 }}
            />
            <Line
              type="monotone"
              dataKey="multiplier"
              name="Maaş / Asgari Ücret"
              stroke={CHART_COLOR_ARRAY[0]}
              strokeWidth={3}
              dot={{ fill: CHART_COLOR_ARRAY[0], strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
        Yıllara göre medyan yazılımcı maaşının asgari ücrete oranı
      </p>
    </Card>
  );
}
