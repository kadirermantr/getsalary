import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFilters } from '../../context/FilterContext';
import { useData } from '../../context/DataContext';
import { YEARS } from '../../data/config';

function FilterContent({ onClose }) {
  const { t } = useTranslation();
  const { filters, updateFilter, resetFilters, activeFilterCount } = useFilters();
  const { getUniqueValues } = useData();

  const positions = [
    { value: 'all', label: t('filters.all') },
    ...getUniqueValues('position').map((p) => ({ value: p, label: p })),
  ];

  const experiences = [
    { value: 'all', label: t('filters.all') },
    ...getUniqueValues('experienceLevel').map((e) => ({ value: e, label: e })),
  ];

  const cities = [
    { value: 'all', label: t('filters.all') },
    ...getUniqueValues('city').map((c) => ({ value: c, label: c })),
  ];

  const workModes = [
    { value: 'all', label: t('filters.all') },
    ...getUniqueValues('workMode').map((w) => ({ value: w, label: w })),
  ];

  const FilterSection = ({ title, options, value, onChange }) => (
    <div className="border-b border-[var(--border)] pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="radio"
              name={title}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="w-4 h-4 text-[var(--accent)] bg-[var(--bg-primary)] border-[var(--border)] focus:ring-[var(--accent)] focus:ring-offset-0"
            />
            <span className={`text-sm ${value === opt.value ? 'text-[var(--accent)] font-medium' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
      {/* Mobile Header */}
      {onClose && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)] lg:hidden">
          <h2 className="font-semibold text-[var(--text-primary)]">{t('filters.title') || 'Filtreler'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Year Selector */}
      <div className="border-b border-[var(--border)] pb-4 mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{t('filters.year')}</h3>
        <div className="flex flex-wrap gap-2">
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => updateFilter('year', year)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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

      {/* Experience Filter */}
      <FilterSection
        title={t('filters.experience')}
        options={experiences}
        value={filters.experience}
        onChange={(value) => updateFilter('experience', value)}
      />

      {/* Position Filter - Dropdown */}
      <div className="border-b border-[var(--border)] pb-4 mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{t('filters.position')}</h3>
        <select
          value={filters.position}
          onChange={(e) => updateFilter('position', e.target.value)}
          className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none"
        >
          {positions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Work Mode Filter */}
      <FilterSection
        title={t('filters.workMode')}
        options={workModes}
        value={filters.workMode}
        onChange={(value) => updateFilter('workMode', value)}
      />

      {/* City Filter - Select */}
      <div className="border-b border-[var(--border)] pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{t('filters.city')}</h3>
        <select
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
          className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none"
        >
          {cities.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg transition-colors border border-[var(--accent)]/30"
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
  );
}

export function FilterSidebar() {
  return (
    <div className="hidden lg:block">
      <FilterContent />
    </div>
  );
}

export function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeFilterCount } = useFilters();

  return (
    <>
      {/* Floating Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[var(--accent-hover)] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="font-medium">Filtreler</span>
        {activeFilterCount > 0 && (
          <span className="bg-white text-[var(--accent)] text-xs px-1.5 py-0.5 rounded-full font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-[var(--bg-primary)] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <FilterContent onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}
