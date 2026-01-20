import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageHeaderWithShare } from '../components/layout/PageContainer';
import { PayrollCalculator } from '../components/payroll/PayrollCalculator';
import { DEFAULT_YEAR } from '../data/bordroParams';

export function Payroll() {
  const { t } = useTranslation();
  usePageTitle('payroll');
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);

  return (
    <div className="bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeaderWithShare
          title={t('grossToNet.title')}
          description={t('grossToNet.description')}
          shareTitle={`getSalary - ${t('grossToNet.title')}`}
          shareDescription={t('grossToNet.description')}
          className="mb-6"
        />

        {/* Main Content */}
        <PayrollCalculator
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
    </div>
  );
}
