import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/layout/PageContainer';
import { SalaryCalculator } from '../components/calculator/SalaryCalculator';
import { SalaryPredictor } from '../components/calculator/SalaryPredictor';

export function Calculator() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title={t('nav.calculator')}
          description={t('calculator.pageDescription')}
        />

        {/* Calculator Tools */}
        <div className="space-y-6">
          <SalaryCalculator />
          <SalaryPredictor />
        </div>
      </div>
    </div>
  );
}
