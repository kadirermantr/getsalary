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

export function SalaryByExperience({ year }) {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  if (loading) {
    return (
      <Card title={t('charts.salaryByExperience')} icon={ChartIcons.experience}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const stats = getYearStats(year, filters);
  if (!stats?.byExperience) {
    return (
      <Card title={t('charts.salaryByExperience')} icon={ChartIcons.experience}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  // Bilinen seviyeler için sıralama ve key mapping
  const knownLevelOrder = ['Junior', 'Mid-Level', 'Senior'];
  const levelKeyMap = {
    Junior: 'junior',
    'Mid-Level': 'mid',
    Senior: 'senior',
  };

  // Verideki tüm seviyeleri al (dinamik olarak gelebilecek yeni seviyeler dahil)
  const allLevels = Object.keys(stats.byExperience);

  // Bilinen seviyeleri sırayla, bilinmeyenleri sona ekle
  const orderedLevels = [
    ...knownLevelOrder.filter((level) => allLevels.includes(level)),
    ...allLevels.filter((level) => !knownLevelOrder.includes(level)),
  ];

  const data = orderedLevels.map((level) => ({
    level,
    // Dinamik çeviri
    label: t(`experience.${levelKeyMap[level] || level.toLowerCase()}`, { defaultValue: level }),
    median: Math.round(stats.byExperience[level].median),
    p25: Math.round(stats.byExperience[level].p25),
    p75: Math.round(stats.byExperience[level].p75),
    count: stats.byExperience[level].count,
  }));

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
          25-75%: {formatSalary(item?.p25)} - {formatSalary(item?.p75)}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          n = {item?.count}
        </p>
      </div>
    );
  };

  return (
    <Card title={t('charts.salaryByExperience')} icon={ChartIcons.experience}>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
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
              fill={CHART_COLOR_ARRAY[1]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
