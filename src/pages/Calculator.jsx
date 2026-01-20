import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { useFilters } from '../context/FilterContext';
import { PageHeaderWithShare } from '../components/layout/PageContainer';
import { FilterSidebar, MobileFilterDrawer } from '../components/filters/FilterSidebar';
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
        <PageHeaderWithShare
          title={t('nav.calculator')}
          description={t('calculator.pageDescription')}
          shareTitle={`getSalary - ${filters.year} ${t('calculator.shareTitle')}`}
          shareDescription={t('calculator.pageDescription')}
        />

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
