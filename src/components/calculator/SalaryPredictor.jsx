import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';

export function SalaryPredictor() {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters, activeFilterCount } = useFilters();

  // Calculate prediction based on filters from context
  const prediction = useMemo(() => {
    // Check if any filter (besides year) is active
    if (activeFilterCount === 0) {
      return null;
    }

    const stats = getYearStats(filters.year, filters);

    if (!stats || stats.filteredCount < 5) {
      return { insufficient: true, count: stats?.filteredCount || 0 };
    }

    // Calculate prediction range
    return {
      min: stats.p25,
      median: stats.medianSalary,
      max: stats.p75,
      count: stats.filteredCount,
      year: filters.year,
    };
  }, [filters, getYearStats, activeFilterCount]);

  if (loading) {
    return (
      <Card title={t('prediction.title')} icon={ChartIcons.lightBulb}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title={t('prediction.title')} icon={ChartIcons.lightBulb}>
      <div>
        {/* Result */}
        <div className="bg-[var(--bg-primary)] rounded-lg p-4 h-[180px] flex items-center justify-center">
          {!prediction ? (
            <p className="text-center text-[var(--text-secondary)] text-sm">
              {t('prediction.selectHint')}
            </p>
          ) : prediction.insufficient ? (
            <div className="text-center">
              <p className="text-[var(--text-secondary)] text-sm">
                {t('prediction.insufficientData')}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                ({prediction.count} {t('charts.participants').toLowerCase()})
              </p>
            </div>
          ) : (
            <div className="space-y-4 w-full">
              {/* Main Prediction */}
              <div className="text-center">
                <p className="text-xs text-[var(--text-secondary)] mb-1">
                  {t('prediction.estimatedRange')} ({prediction.year})
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-[var(--text-secondary)]">
                    {formatSalary(prediction.min)}
                  </span>
                  <span className="text-[var(--text-secondary)]">-</span>
                  <span className="text-2xl font-bold text-[var(--accent)]">
                    {formatSalary(prediction.median)}
                  </span>
                  <span className="text-[var(--text-secondary)]">-</span>
                  <span className="text-lg text-[var(--text-secondary)]">
                    {formatSalary(prediction.max)}
                  </span>
                </div>
              </div>

              {/* Visual Range */}
              <div className="relative h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 bg-[var(--accent)] opacity-30 rounded-full"
                  style={{
                    left: '25%',
                    right: '25%',
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--accent)] rounded-full shadow"
                  style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
                />
              </div>

              {/* Labels */}
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>25%</span>
                <span>{t('charts.median')}</span>
                <span>75%</span>
              </div>

              {/* Sample Size */}
              <p className="text-center text-xs text-[var(--text-secondary)]">
                n = {prediction.count} {t('charts.participants').toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
