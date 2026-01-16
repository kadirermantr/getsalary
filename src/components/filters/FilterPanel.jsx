import { useTranslation } from 'react-i18next';
import { useFilters } from '../../context/FilterContext';
import { YEARS } from '../../data/config';

export function FilterPanel() {
  const { t } = useTranslation();
  const { filters, updateFilter, resetFilters, activeFilterCount } = useFilters();

  const positions = [
    { value: 'all', label: t('filters.all') },
    { value: 'backend', label: t('positions.backend') },
    { value: 'frontend', label: t('positions.frontend') },
    { value: 'fullstack', label: t('positions.fullstack') },
    { value: 'mobile', label: t('positions.mobile') },
    { value: 'devops', label: t('positions.devops') },
    { value: 'data', label: t('positions.data') },
  ];

  const experiences = [
    { value: 'all', label: t('filters.all') },
    { value: 'junior', label: t('experience.junior') },
    { value: 'mid', label: t('experience.mid') },
    { value: 'senior', label: t('experience.senior') },
  ];

  const cities = [
    { value: 'all', label: t('filters.all') },
    { value: 'istanbul', label: 'İstanbul' },
    { value: 'ankara', label: 'Ankara' },
    { value: 'izmir', label: 'İzmir' },
    { value: 'remote', label: 'Remote' },
  ];

  const workModes = [
    { value: 'all', label: t('filters.all') },
    { value: 'remote', label: t('workMode.remote') },
    { value: 'hybrid', label: t('workMode.hybrid') },
    { value: 'office', label: t('workMode.office') },
  ];

  const SelectFilter = ({ label, value, options, onChange }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm border border-[var(--bg-secondary)] focus:border-[var(--accent)] focus:outline-none transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-end gap-4">
        {/* Year Selector - Special styling */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">
            {t('filters.year')}
          </label>
          <div className="flex gap-1">
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => updateFilter('year', year)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.year === year
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="h-8 w-px bg-[var(--bg-primary)] hidden sm:block" />

        {/* Position Filter */}
        <SelectFilter
          label={t('filters.position')}
          value={filters.position}
          options={positions}
          onChange={(value) => updateFilter('position', value)}
        />

        {/* Experience Filter */}
        <SelectFilter
          label={t('filters.experience')}
          value={filters.experience}
          options={experiences}
          onChange={(value) => updateFilter('experience', value)}
        />

        {/* City Filter */}
        <SelectFilter
          label={t('filters.city')}
          value={filters.city}
          options={cities}
          onChange={(value) => updateFilter('city', value)}
        />

        {/* Work Mode Filter */}
        <SelectFilter
          label={t('filters.workMode')}
          value={filters.workMode}
          options={workModes}
          onChange={(value) => updateFilter('workMode', value)}
        />

        {/* Reset Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            {t('filters.reset')}
            <span className="bg-[var(--accent)] text-white text-xs px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
