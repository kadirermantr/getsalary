import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { CHART_COLOR_ARRAY } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card } from '../ui/Card';

export function SalaryByCity({ year }) {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();

  if (loading) {
    return (
      <Card title={t('charts.salaryByCity')} icon="🏙️">
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const stats = getYearStats(year);
  if (!stats?.byCity) {
    return (
      <Card title={t('charts.salaryByCity')} icon="🏙️">
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  const data = Object.entries(stats.byCity)
    .map(([city, cityStats]) => ({
      city,
      median: Math.round(cityStats.median),
      count: cityStats.count,
    }))
    .sort((a, b) => b.median - a.median);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const item = data.find((d) => d.city === label);

    return (
      <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
        <p className="text-sm text-[var(--text-secondary)]">
          {t('charts.median')}: {formatSalary(item?.median)}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          n = {item?.count}
        </p>
      </div>
    );
  };

  return (
    <Card title={t('charts.salaryByCity')} icon="🏙️">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
            <XAxis
              dataKey="city"
              stroke="var(--text-secondary)"
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              stroke="var(--text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="median"
              name={t('charts.median')}
              fill={CHART_COLOR_ARRAY[2]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
