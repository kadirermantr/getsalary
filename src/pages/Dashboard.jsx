import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { useFilters } from '../context/FilterContext';
import { FilterPanel } from '../components/filters/FilterPanel';
import { SalaryByPosition } from '../components/charts/SalaryByPosition';
import { SalaryByExperience } from '../components/charts/SalaryByExperience';
import { MinWageMultiplier } from '../components/charts/MinWageMultiplier';
import { SalaryByCity } from '../components/charts/SalaryByCity';
import { RemoteVsOffice } from '../components/charts/RemoteVsOffice';
import { SalaryByTech } from '../components/charts/SalaryByTech';
import { SalaryByCompanyType } from '../components/charts/SalaryByCompanyType';
import { InflationComparison } from '../components/charts/InflationComparison';
import { ShareButtons } from '../components/social/ShareButtons';
import { formatSalary, formatNumber } from '../utils/calculations';

export function Dashboard() {
  const { t } = useTranslation();
  const { getYearStats, dataSources } = useData();
  const { filters } = useFilters();

  const currentStats = getYearStats(filters.year);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                Dashboard
              </h1>
              <p className="text-[var(--text-secondary)] mt-2">
                {t('hero.description')}
              </p>
            </div>
            <ShareButtons
              title={`getSalary - ${filters.year} Yazılım Sektörü Maaş Analizi`}
              description={`Türkiye yazılım sektöründe ${filters.year} yılı maaş trendlerini keşfedin.`}
            />
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel />

        {/* Quick Stats Bar */}
        {currentStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--accent)]">
                {formatNumber(currentStats.participants)}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Katılımcı</p>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {formatSalary(currentStats.medianSalary)}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Medyan Maaş</p>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {currentStats.multiplier?.toFixed(1)}x
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Asgari Ücret Çarpanı</p>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {formatSalary(currentStats.minWage)}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Asgari Ücret ({filters.year})</p>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Row 1: Position & Experience */}
          <SalaryByPosition year={filters.year} />
          <SalaryByExperience year={filters.year} />

          {/* Row 2: Min Wage Trend (Full Width) */}
          <div className="lg:col-span-2">
            <MinWageMultiplier />
          </div>

          {/* Row 3: City & Work Mode */}
          <SalaryByCity year={filters.year} />
          <RemoteVsOffice year={filters.year} />

          {/* Row 4: Tech & Company Type */}
          <SalaryByTech year={filters.year} />
          <SalaryByCompanyType year={filters.year} />

          {/* Row 5: Inflation Comparison (Full Width) */}
          <div className="lg:col-span-2">
            <InflationComparison />
          </div>
        </div>

        {/* Data Source Attribution */}
        <div className="mt-8 p-4 bg-[var(--bg-secondary)] rounded-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-secondary)]">
              {t('footer.dataSource')}:{' '}
              <a
                href={dataSources[filters.year]?.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                @oncekiyazilimci
              </a>
              {' '}Yazılım Sektörü Maaş Anketi {filters.year}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {formatNumber(dataSources[filters.year]?.participants)} katılımcı
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
