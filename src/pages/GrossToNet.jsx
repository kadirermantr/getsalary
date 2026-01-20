import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { GrossToNetCalculator } from '../components/gross-to-net/GrossToNetCalculator';
import { ShareButtons } from '../components/social/ShareButtons';
import { DEFAULT_YEAR } from '../data/bordroParams';

export function GrossToNet() {
  const { t } = useTranslation();
  usePageTitle('payroll');
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t('grossToNet.title')}</h1>
              <div className="md:hidden flex-shrink-0">
                <ShareButtons
                  compact
                  title={`getSalary - ${t('grossToNet.title')}`}
                  description={t('grossToNet.description')}
                />
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mt-2">{t('grossToNet.description')}</p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <ShareButtons
              compact
              title={`getSalary - ${t('grossToNet.title')}`}
              description={t('grossToNet.description')}
            />
          </div>
        </div>

        {/* Main Content */}
        <GrossToNetCalculator
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
    </div>
  );
}
