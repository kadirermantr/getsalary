import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { useFilters } from '../context/FilterContext';
import { PageHeader } from '../components/layout/PageContainer';
import { FilterSidebar, MobileFilterDrawer } from '../components/filters/FilterSidebar';
import { ShareButtons } from '../components/social/ShareButtons';
import { SalaryByPosition } from '../components/charts/SalaryByPosition';
import { SalaryByExperience } from '../components/charts/SalaryByExperience';
import { MinWageMultiplier } from '../components/charts/MinWageMultiplier';
import { SalaryByCity } from '../components/charts/SalaryByCity';
import { RemoteVsOffice } from '../components/charts/RemoteVsOffice';
import { SalaryByCompanyType } from '../components/charts/SalaryByCompanyType';
import { YearComparison } from '../components/charts/YearComparison';
import { AnimatedCounter, AnimatedSalary, AnimatedMultiplier } from '../components/ui/AnimatedCounter';

function StatCard({ value, label, subValue, icon, color = 'accent' }) {
  const colorClasses = {
    accent: 'from-blue-500/20 to-blue-600/5 text-blue-500',
    green: 'from-emerald-500/20 to-emerald-600/5 text-emerald-500',
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-500',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-500',
  };

  return (
    <div
      className={`
        bg-[var(--bg-secondary)]
        rounded-2xl
        border border-[var(--border)]/50
        overflow-hidden
        transition-all duration-300
        hover:border-[var(--accent)]/30
        hover:shadow-lg hover:shadow-[var(--accent)]/5
        relative
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`} />
      <div className="relative p-4">
        <span className={`text-xl ${colorClasses[color].split(' ')[2]}`}>{icon}</span>
        <div className="mt-2">
          <p className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {value}
          </p>
          <p className="text-xs lg:text-sm text-[var(--text-secondary)] mt-1">{label}</p>
          {subValue && (
            <p className="text-xs text-[var(--text-secondary)]/70 mt-0.5">{subValue}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { t } = useTranslation();
  const { getYearStats, loading } = useData();
  const { filters, activeFilterCount } = useFilters();
  const currentStats = getYearStats(filters.year, filters);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:mb-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t('nav.dashboard')}</h1>
              <div className="md:hidden flex-shrink-0">
                <ShareButtons
                  compact
                  title={`getSalary - ${filters.year} ${t('dashboard.shareTitle')}`}
                  description={t('dashboard.shareDescription', { year: filters.year })}
                />
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mt-2">{t('dashboard.description')}</p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <ShareButtons
              compact
              title={`getSalary - ${filters.year} ${t('dashboard.shareTitle')}`}
              description={t('dashboard.shareDescription', { year: filters.year })}
            />
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content - Bento Grid */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-40 bg-[var(--bg-secondary)] rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Stats Row - Bento Style */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <StatCard
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                      </svg>
                    }
                    value={<AnimatedCounter value={activeFilterCount > 0 ? currentStats?.filteredCount : currentStats?.participants} />}
                    label={`${t('dashboard.participants')} (${filters.year})`}
                    subValue={activeFilterCount > 0 ? `/ ${currentStats?.participants?.toLocaleString('tr-TR')} ${t('charts.total')}` : null}
                    color="accent"
                  />
                  <StatCard
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>
                    }
                    value={<AnimatedSalary value={currentStats?.medianSalary} />}
                    label={t('dashboard.medianSalary')}
                    color="green"
                  />
                  <StatCard
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Z" />
                      </svg>
                    }
                    value={<AnimatedMultiplier value={currentStats?.multiplier || 0} />}
                    label={t('dashboard.minWageMultiplier')}
                    color="purple"
                  />
                  <StatCard
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
                      </svg>
                    }
                    value={<AnimatedSalary value={currentStats?.minWage} />}
                    label={`${t('dashboard.minWage')} (${filters.year})`}
                    color="amber"
                  />
                </div>

                {/* Charts - Bento Grid (4 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Row 1: Position (full) - En önemli */}
                  <div className="md:col-span-2 lg:col-span-4">
                    <SalaryByPosition year={filters.year} />
                  </div>

                  {/* Row 2: Experience + Location - Kişisel faktörler */}
                  <div className="md:col-span-2">
                    <SalaryByExperience year={filters.year} />
                  </div>
                  <div className="md:col-span-2">
                    <SalaryByCity year={filters.year} />
                  </div>

                  {/* Row 3: Work Mode + Company Type - İş ortamı faktörleri */}
                  <div className="md:col-span-2">
                    <RemoteVsOffice year={filters.year} />
                  </div>
                  <div className="md:col-span-2">
                    <SalaryByCompanyType year={filters.year} />
                  </div>

                  {/* Row 4: Min Wage Trend + Year Comparison */}
                  <div className="md:col-span-2 lg:col-span-4">
                    <MinWageMultiplier />
                  </div>

                  {/* Row 5: Year Comparison (full) */}
                  <div className="md:col-span-2 lg:col-span-4">
                    <YearComparison />
                  </div>
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
