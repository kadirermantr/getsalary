import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { useFilters } from '../context/FilterContext';
import { FilterSidebar, MobileFilterDrawer } from '../components/filters/FilterSidebar';
import { ShareButtons } from '../components/social/ShareButtons';
import { SalaryCalculator } from '../components/calculator/SalaryCalculator';
import { SalaryPredictor } from '../components/calculator/SalaryPredictor';

export function Calculator() {
  const { t } = useTranslation();
  usePageTitle('salary');
  const { filters } = useFilters();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:mb-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t('nav.calculator')}</h1>
              <div className="md:hidden flex-shrink-0">
                <ShareButtons
                  compact
                  title={`getSalary - ${filters.year} ${t('calculator.shareTitle')}`}
                  description={t('calculator.pageDescription')}
                />
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mt-2">{t('calculator.pageDescription')}</p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <ShareButtons
              compact
              title={`getSalary - ${filters.year} ${t('calculator.shareTitle')}`}
              description={t('calculator.pageDescription')}
            />
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Calculator Tools */}
            <div className="space-y-6">
              <SalaryCalculator />
              <SalaryPredictor />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer />
    </div>
  );
}
