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
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { CHART_COLOR_ARRAY } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';
import { ChartTooltip } from '../ui/ChartTooltip';

export function SalaryByPosition({ year }) {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  if (loading) {
    return (
      <Card title={t('charts.salaryByPosition')} icon={ChartIcons.position}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const stats = getYearStats(year, filters);
  if (!stats?.byPosition) {
    return (
      <Card title={t('charts.salaryByPosition')} icon={ChartIcons.position}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  const data = Object.entries(stats.byPosition)
    .map(([position, posStats]) => ({
      position: position.replace(' Developer', '').replace(' Engineer', ''),
      median: Math.round(posStats.median),
      average: Math.round(posStats.average),
      count: posStats.count,
      p25: Math.round(posStats.p25),
      p75: Math.round(posStats.p75),
    }))
    .sort((a, b) => b.median - a.median)
    .slice(0, 8);

  return (
    <Card title={t('charts.salaryByPosition')} icon={ChartIcons.position}>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
            <XAxis
              type="number"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              stroke="var(--text-secondary)"
              fontSize={11}
            />
            <YAxis
              type="category"
              dataKey="position"
              stroke="var(--text-secondary)"
              fontSize={11}
              width={95}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip showPercentile />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="median"
              name={t('charts.median')}
              fill={CHART_COLOR_ARRAY[0]}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
