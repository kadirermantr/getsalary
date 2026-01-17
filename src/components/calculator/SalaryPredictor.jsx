import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { YEARS } from '../../data/config';
import { formatSalary } from '../../utils/calculations';
import { Card, ChartIcons } from '../ui/Card';

export function SalaryPredictor() {
  const { t } = useTranslation();
  const { getYearStats, getUniqueValues, loading } = useData();

  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Get unique values for dropdowns
  const latestYear = Math.max(...YEARS);
  const latestStats = getYearStats(latestYear, {});

  const positions = useMemo(() => {
    if (!latestStats?.byPosition) return [];
    return Object.keys(latestStats.byPosition).sort();
  }, [latestStats]);

  const experiences = useMemo(() => {
    if (!latestStats?.byExperience) return [];
    return ['Junior', 'Mid-Level', 'Senior'].filter(
      (exp) => latestStats.byExperience[exp]
    );
  }, [latestStats]);

  const cities = useMemo(() => {
    if (!latestStats?.byCity) return [];
    return Object.keys(latestStats.byCity)
      .sort((a, b) => {
        if (a === 'Diğer') return 1;
        if (b === 'Diğer') return -1;
        return a.localeCompare(b, 'tr');
      });
  }, [latestStats]);

  // Calculate prediction based on filters
  const prediction = useMemo(() => {
    if (!selectedPosition && !selectedExperience && !selectedCity) {
      return null;
    }

    const filters = {};
    if (selectedPosition) filters.position = selectedPosition;
    if (selectedExperience) filters.experience = selectedExperience;
    if (selectedCity) filters.city = selectedCity;

    const stats = getYearStats(latestYear, filters);

    if (!stats || stats.filteredCount < 5) {
      return { insufficient: true, count: stats?.filteredCount || 0 };
    }

    // Calculate prediction range
    return {
      min: stats.p25,
      median: stats.medianSalary,
      max: stats.p75,
      count: stats.filteredCount,
      year: latestYear,
    };
  }, [selectedPosition, selectedExperience, selectedCity, getYearStats, latestYear]);

  if (loading) {
    return (
      <Card title={t('prediction.title')} icon={ChartIcons.calculator}>
        <div className="h-64 flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">{t('common.loading')}</p>
        </div>
      </Card>
    );
  }

  const resetFilters = () => {
    setSelectedPosition('');
    setSelectedExperience('');
    setSelectedCity('');
  };

  return (
    <Card title={t('prediction.title')} icon={ChartIcons.calculator}>
      <div className="space-y-4">
        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Position */}
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">
              {t('filters.position')}
            </label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-3 py-2 border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
            >
              <option value="">{t('filters.all')}</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">
              {t('filters.experience')}
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-3 py-2 border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
            >
              <option value="">{t('filters.all')}</option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>
                  {t(`experience.${exp.toLowerCase().replace('-', '')}`, { defaultValue: exp })}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">
              {t('filters.city')}
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-3 py-2 border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
            >
              <option value="">{t('filters.all')}</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'Diğer' ? t('cities.other', { defaultValue: city }) : city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-[var(--bg-primary)] rounded-lg p-4">
          {!prediction ? (
            <p className="text-center text-[var(--text-secondary)] text-sm py-4">
              ↑ {t('prediction.selectHint')}
            </p>
          ) : prediction.insufficient ? (
            <div className="text-center py-4">
              <p className="text-[var(--text-secondary)] text-sm">
                {t('prediction.insufficientData')}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                ({prediction.count} {t('charts.participants').toLowerCase()})
              </p>
            </div>
          ) : (
            <div className="space-y-4">
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

        {/* Reset Button */}
        {(selectedPosition || selectedExperience || selectedCity) && (
          <button
            onClick={resetFilters}
            className="w-full py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            {t('filters.reset')}
          </button>
        )}
      </div>
    </Card>
  );
}
