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
import { CHART_COLOR_ARRAY } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';

// Sample technology salary data (will be replaced with real data)
const sampleTechData = {
  2021: [
    { tech: 'Go', median: 12000 },
    { tech: 'Python', median: 10500 },
    { tech: 'Java', median: 10000 },
    { tech: 'JavaScript', median: 9000 },
    { tech: 'C#', median: 8500 },
    { tech: 'PHP', median: 7000 },
  ],
  2022: [
    { tech: 'Go', median: 18000 },
    { tech: 'Python', median: 16000 },
    { tech: 'Java', median: 15000 },
    { tech: 'JavaScript', median: 14000 },
    { tech: 'C#', median: 13000 },
    { tech: 'PHP', median: 10000 },
  ],
  2023: [
    { tech: 'Go', median: 35000 },
    { tech: 'Rust', median: 33000 },
    { tech: 'Python', median: 30000 },
    { tech: 'Java', median: 28000 },
    { tech: 'JavaScript', median: 26000 },
    { tech: 'C#', median: 24000 },
  ],
  2024: [
    { tech: 'Rust', median: 75000 },
    { tech: 'Go', median: 70000 },
    { tech: 'Python', median: 60000 },
    { tech: 'Java', median: 55000 },
    { tech: 'JavaScript', median: 52000 },
    { tech: 'C#', median: 48000 },
  ],
  2025: [
    { tech: 'Rust', median: 95000 },
    { tech: 'Go', median: 90000 },
    { tech: 'Python', median: 78000 },
    { tech: 'Java', median: 72000 },
    { tech: 'TypeScript', median: 70000 },
    { tech: 'JavaScript', median: 65000 },
  ],
};

export function SalaryByTech({ year }) {
  const { t } = useTranslation();

  const data = sampleTechData[year] || sampleTechData[2025];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
        <p className="text-sm text-[var(--text-secondary)]">
          {t('charts.median')}: {formatSalary(payload[0].value)}
        </p>
      </div>
    );
  };

  return (
    <Card title={t('charts.salaryByTech')} icon={ChartIcons.tech}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
            <XAxis
              type="number"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              stroke="var(--text-secondary)"
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="tech"
              stroke="var(--text-secondary)"
              fontSize={12}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="median" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLOR_ARRAY[index % CHART_COLOR_ARRAY.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
