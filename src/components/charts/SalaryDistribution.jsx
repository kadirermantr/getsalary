import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { CHART_COLOR_ARRAY } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';
import { ChartWrapper } from './ChartWrapper';

// Create histogram bins from salary data
function createHistogramBins(salaries, binCount = 10) {
  if (!salaries || salaries.length === 0) return [];

  const min = Math.min(...salaries);
  const max = Math.max(...salaries);

  // Round to nice numbers for bin edges
  const range = max - min;
  const rawBinSize = range / binCount;

  // Find a nice bin size (multiples of 10K, 25K, 50K, etc.)
  const niceNumbers = [10000, 25000, 50000, 100000];
  let binSize = niceNumbers.find(n => n >= rawBinSize) || 100000;

  // Adjust min to start at a nice number
  const binStart = Math.floor(min / binSize) * binSize;
  const binEnd = Math.ceil(max / binSize) * binSize;

  // Create bins
  const bins = [];
  for (let start = binStart; start < binEnd; start += binSize) {
    const end = start + binSize;
    const count = salaries.filter(s => s >= start && s < end).length;
    bins.push({
      range: `${(start / 1000).toFixed(0)}-${(end / 1000).toFixed(0)}K`,
      rangeStart: start,
      rangeEnd: end,
      count,
      percentage: ((count / salaries.length) * 100).toFixed(1),
    });
  }

  return bins;
}

// Custom tooltip component - defined outside to avoid recreation
function HistogramTooltip({ active, payload, t, locale }) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0].payload;

  return (
    <div className="bg-[var(--bg-primary)] border border-[var(--bg-secondary)] rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-[var(--text-primary)] mb-2">
        {formatSalary(item.rangeStart, locale)} - {formatSalary(item.rangeEnd, locale)}
      </p>
      <p className="text-sm text-[var(--text-secondary)]">
        {t('charts.participants')}: {item.count}
      </p>
      <p className="text-sm text-[var(--text-secondary)]">
        {item.percentage}% {t('charts.total')}
      </p>
    </div>
  );
}

export function SalaryDistribution({ year, userSalary }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { surveyData, loading, getYearStats } = useData();
  const { filters } = useFilters();

  // Get filtered salaries for histogram
  const histogramData = useMemo(() => {
    const yearData = surveyData[year] || [];
    if (yearData.length === 0) return { bins: [], median: 0, total: 0 };

    // Apply filters
    let filteredData = yearData;
    if (filters.position && filters.position !== 'all') {
      filteredData = filteredData.filter(d => d.position === filters.position);
    }
    if (filters.experience && filters.experience !== 'all') {
      filteredData = filteredData.filter(d => d.experienceLevel === filters.experience);
    }
    if (filters.city && filters.city !== 'all') {
      filteredData = filteredData.filter(d => d.city === filters.city);
    }
    if (filters.workMode && filters.workMode !== 'all') {
      filteredData = filteredData.filter(d => d.workMode === filters.workMode);
    }

    const salaries = filteredData.map(d => d.salary).filter(s => s > 0);
    const bins = createHistogramBins(salaries);

    // Calculate median for reference line
    const sorted = [...salaries].sort((a, b) => a - b);
    const median = sorted.length > 0
      ? sorted[Math.floor(sorted.length / 2)]
      : 0;

    return { bins, median, total: salaries.length };
  }, [surveyData, year, filters]);

  const stats = getYearStats(year, filters);

  // Find bin indices for reference lines
  const medianBinIndex = useMemo(() => {
    return histogramData.bins.findIndex(
      bin => histogramData.median >= bin.rangeStart && histogramData.median < bin.rangeEnd
    );
  }, [histogramData]);

  const userSalaryBinIndex = useMemo(() => {
    if (!userSalary) return -1;
    return histogramData.bins.findIndex(
      bin => userSalary >= bin.rangeStart && userSalary < bin.rangeEnd
    );
  }, [userSalary, histogramData.bins]);

  // Check if user salary and median are in the same bin
  const labelsOverlap = medianBinIndex >= 0 && userSalaryBinIndex >= 0 && medianBinIndex === userSalaryBinIndex;

  // Tooltip renderer that passes t and locale
  const renderTooltip = (props) => <HistogramTooltip {...props} t={t} locale={locale} />;

  if (loading) {
    return (
      <Card title={t('charts.salaryDistribution')} icon={ChartIcons.trend}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  if (!histogramData.bins.length) {
    return (
      <Card title={t('charts.salaryDistribution')} icon={ChartIcons.trend}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.noData')}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={t('charts.salaryDistribution')}
      icon={ChartIcons.trend}
      subtitle={`n = ${histogramData.total.toLocaleString('tr-TR')}`}
    >
      <ChartWrapper height="h-80">
        <BarChart
          data={histogramData.bins}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-secondary)" />
          <XAxis
            dataKey="range"
            stroke="var(--text-secondary)"
            fontSize={11}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis
            stroke="var(--text-secondary)"
            fontSize={12}
            tickFormatter={(value) => value.toLocaleString('tr-TR')}
          />
          <Tooltip content={renderTooltip} cursor={{ fill: 'rgba(129, 140, 248, 0.1)' }} />

          {/* Median reference line */}
          {stats?.median && medianBinIndex >= 0 && (
            <ReferenceLine
              x={histogramData.bins[medianBinIndex]?.range}
              stroke="#818cf8"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: `${t('charts.median')}: ${formatSalary(stats.median, locale)}`,
                position: labelsOverlap ? 'insideTop' : 'top',
                fill: '#818cf8',
                fontSize: 11,
              }}
            />
          )}

          {/* User salary reference line */}
          {userSalary && userSalaryBinIndex >= 0 && (
            <ReferenceLine
              x={histogramData.bins[userSalaryBinIndex]?.range}
              stroke="#10b981"
              strokeWidth={3}
              label={{
                value: `${t('charts.yourSalary')}: ${formatSalary(userSalary, locale)}`,
                position: 'top',
                fill: '#10b981',
                fontSize: 11,
                fontWeight: 'bold',
              }}
            />
          )}

          <Bar
            dataKey="count"
            fill={CHART_COLOR_ARRAY[0]}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartWrapper>
    </Card>
  );
}
