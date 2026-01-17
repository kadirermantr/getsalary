import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { useFilters } from '../context/FilterContext';
import { PageHeader } from '../components/layout/PageContainer';
import { FilterSidebar, MobileFilterDrawer } from '../components/filters/FilterSidebar';
import { SalaryByPosition } from '../components/charts/SalaryByPosition';
import { SalaryByExperience } from '../components/charts/SalaryByExperience';
import { MinWageMultiplier } from '../components/charts/MinWageMultiplier';
import { SalaryByCity } from '../components/charts/SalaryByCity';
import { RemoteVsOffice } from '../components/charts/RemoteVsOffice';
import { SalaryByTech } from '../components/charts/SalaryByTech';
import { SalaryByCompanyType } from '../components/charts/SalaryByCompanyType';
import { InflationComparison } from '../components/charts/InflationComparison';
import { SalaryCalculator } from '../components/calculator/SalaryCalculator';
import { ShareButtons } from '../components/social/ShareButtons';
import { AnimatedCounter, AnimatedSalary, AnimatedMultiplier } from '../components/ui/AnimatedCounter';
import { StatCardSkeleton, ChartSkeleton } from '../components/ui/Skeleton';

export function Dashboard() {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters, activeFilterCount } = useFilters();

  const currentStats = getYearStats(filters.year, filters);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <PageHeader title="Dashboard" description={t('dashboard.description')} />
          <ShareButtons
            compact
            title={`getSalary - ${filters.year} ${t('dashboard.shareTitle')}`}
            description={t('dashboard.shareDescription', { year: filters.year })}
          />
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Quick Stats Bar */}
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : currentStats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[var(--accent)]">
                    <AnimatedCounter
                      value={activeFilterCount > 0 ? currentStats.filteredCount : currentStats.participants}
                    />
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {activeFilterCount > 0
                      ? `${t('dashboard.participants')} (${currentStats.participants.toLocaleString('tr-TR')})`
                      : t('dashboard.participants')}
                  </p>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[var(--text-primary)]">
                    <AnimatedSalary value={currentStats.medianSalary} />
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{t('dashboard.medianSalary')}</p>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[var(--text-primary)]">
                    <AnimatedMultiplier value={currentStats.multiplier || 0} />
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{t('dashboard.minWageMultiplier')}</p>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[var(--text-primary)]">
                    <AnimatedSalary value={currentStats.minWage} />
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{t('dashboard.minWage')} ({filters.year})</p>
                </div>
              </div>
            )}

            {/* Charts Grid */}
            {loading ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ChartSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Row 1: Position & Experience */}
                <SalaryByPosition year={filters.year} />
                <SalaryByExperience year={filters.year} />

                {/* Salary Calculator (Full Width) */}
                <div className="xl:col-span-2">
                  <SalaryCalculator />
                </div>

                {/* Row 2: Min Wage Trend (Full Width) */}
                <div className="xl:col-span-2">
                  <MinWageMultiplier />
                </div>

                {/* Row 3: City & Work Mode */}
                <SalaryByCity year={filters.year} />
                <RemoteVsOffice year={filters.year} />

                {/* Row 4: Tech & Company Type */}
                <SalaryByTech year={filters.year} />
                <SalaryByCompanyType year={filters.year} />

                {/* Row 5: Inflation Comparison (Full Width) */}
                <div className="xl:col-span-2">
                  <InflationComparison />
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer />
    </div>
  );
}
