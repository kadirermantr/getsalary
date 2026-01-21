import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { CHART_COLOR_ARRAY } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';
import { ChartWrapper } from './ChartWrapper';

export function SalaryByCity({ year }) {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  if (loading) {
    return (
      <Card title={t('charts.salaryByCity')} icon={ChartIcons.city}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const stats = getYearStats(year, filters);
  if (!stats?.byCity) {
    return (
      <Card title={t('charts.salaryByCity')} icon={ChartIcons.city}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  // Şehir çevirileri (özel durumlar için)
  const cityKeyMap = {
    Diğer: 'other',
  };

  const data = Object.entries(stats.byCity)
    .map(([city, cityStats]) => ({
      city,
      // Dinamik çeviri: özel durumlar için çeviri, diğerleri için orijinal değer
      label: cityKeyMap[city]
        ? t(`cities.${cityKeyMap[city]}`, { defaultValue: city })
        : city,
      median: Math.round(cityStats.median),
      count: cityStats.count,
    }))
    .sort((a, b) => {
      // "Diğer/Other" her zaman sonda
      if (a.city === 'Diğer') return 1;
      if (b.city === 'Diğer') return -1;
      return b.median - a.median;
    });

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const item = payload[0].payload;

    return (
      <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--text-primary)] mb-2">{item.label}</p>
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
    <Card title={t('charts.salaryByCity')} icon={ChartIcons.city}>
      <ChartWrapper height="h-80">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
          <XAxis
            dataKey="label"
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <YAxis
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            stroke="var(--text-secondary)"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar
            dataKey="median"
            name={t('charts.median')}
            fill={CHART_COLOR_ARRAY[2]}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartWrapper>
    </Card>
  );
}
