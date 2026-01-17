import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { CHART_COLOR_ARRAY } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';

export function RemoteVsOffice({ year }) {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters } = useFilters();

  if (loading) {
    return (
      <Card title={t('charts.remoteVsOffice')} icon={ChartIcons.remote}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const stats = getYearStats(year, filters);
  if (!stats?.byWorkMode) {
    return (
      <Card title={t('charts.remoteVsOffice')} icon={ChartIcons.remote}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  // Bilinen modlar için sıralama ve key mapping
  const knownModeOrder = ['Remote', 'Hybrid', 'Ofis'];
  const modeKeyMap = {
    Remote: 'remote',
    Hybrid: 'hybrid',
    Ofis: 'office',
  };
  const modeColors = {
    Remote: CHART_COLOR_ARRAY[1],
    Hybrid: CHART_COLOR_ARRAY[4],
    Ofis: CHART_COLOR_ARRAY[0],
  };

  // Verideki tüm modları al (dinamik olarak gelebilecek yeni modlar dahil)
  const allModes = Object.keys(stats.byWorkMode);

  // Bilinen modları sırayla, bilinmeyenleri sona ekle
  const orderedModes = [
    ...knownModeOrder.filter((mode) => allModes.includes(mode)),
    ...allModes.filter((mode) => !knownModeOrder.includes(mode)),
  ];

  const data = orderedModes.map((mode, index) => ({
    mode,
    // Dinamik çeviri: bilinen key varsa kullan, yoksa lowercase dene, son çare orijinal değer
    label: t(`workMode.${modeKeyMap[mode] || mode.toLowerCase()}`, { defaultValue: mode }),
    median: Math.round(stats.byWorkMode[mode].median),
    count: stats.byWorkMode[mode].count,
    color: modeColors[mode] || CHART_COLOR_ARRAY[index % CHART_COLOR_ARRAY.length],
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
          n = {item?.count}
        </p>
      </div>
    );
  };

  return (
    <Card title={t('charts.remoteVsOffice')} icon={ChartIcons.remote}>
      <div className="h-72 cursor-pointer">
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
            <Bar dataKey="median" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
