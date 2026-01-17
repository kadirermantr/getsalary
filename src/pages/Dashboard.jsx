import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { useFilters } from '../context/FilterContext';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
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
    <PageContainer>
      <div className="relative">
        <div className="absolute right-0 top-0">
          <ShareButtons
            compact
            title={`getSalary - ${filters.year} ${t('dashboard.shareTitle')}`}
            description={t('dashboard.shareDescription', { year: filters.year })}
          />
        </div>
        <PageHeader title="Dashboard" description={t('hero.description')} />
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
              <p className="text-xs text-[var(--text-secondary)]">{t('dashboard.participants')}</p>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {formatSalary(currentStats.medianSalary)}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">{t('dashboard.medianSalary')}</p>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {currentStats.multiplier?.toFixed(1)}x
              </p>
              <p className="text-xs text-[var(--text-secondary)]">{t('dashboard.minWageMultiplier')}</p>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {formatSalary(currentStats.minWage)}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">{t('dashboard.minWage')} ({filters.year})</p>
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
          <p className="text-sm text-[var(--text-secondary)] text-center">
            {t('footer.dataSource')}:{' '}
            <a
              href={dataSources[filters.year]?.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              @oncekiyazilimci
            </a>
            {' '}{t('dashboard.surveyTitle')} {filters.year} - {formatNumber(dataSources[filters.year]?.participants)} {t('dashboard.participants').toLowerCase()}
          </p>
        </div>
    </PageContainer>
  );
}
