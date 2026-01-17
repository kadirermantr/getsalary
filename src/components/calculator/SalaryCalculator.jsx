import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { Card, ChartIcons } from '../ui/Card';

export function SalaryCalculator() {
  const { t, i18n } = useTranslation();
  const { getYearStats } = useData();
  const { filters } = useFilters();
  const [salary, setSalary] = useState('');
  const isTr = i18n.language === 'tr';

  const stats = getYearStats(filters.year, filters);

  const percentile = useMemo(() => {
    if (!salary || !stats) return null;

    const salaryNum = parseInt(salary.replace(/\D/g, ''), 10);
    if (isNaN(salaryNum) || salaryNum <= 0) return null;

    // Calculate percentile using the distribution
    const { p25, median, p75, min, max } = stats;

    if (salaryNum <= min) return 1;
    if (salaryNum >= max) return 99;

    // Estimate percentile based on quartiles
    if (salaryNum <= p25) {
      return Math.round(1 + (salaryNum - min) / (p25 - min) * 24);
    } else if (salaryNum <= median) {
      return Math.round(25 + (salaryNum - p25) / (median - p25) * 25);
    } else if (salaryNum <= p75) {
      return Math.round(50 + (salaryNum - median) / (p75 - median) * 25);
    } else {
      return Math.round(75 + (salaryNum - p75) / (max - p75) * 24);
    }
  }, [salary, stats]);

  const formatInput = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e) => {
    setSalary(formatInput(e.target.value));
  };

  const getPercentileColor = (p) => {
    if (p >= 75) return 'text-green-500';
    if (p >= 50) return 'text-blue-500';
    if (p >= 25) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPercentileMessage = (p) => {
    if (!p) return '';
    if (isTr) {
      if (p >= 90) return 'Harika! Sektörün en üst %10\'luk diliminde yer alıyorsun.';
      if (p >= 75) return 'Çok iyi! Ortalamanın üzerinde kazanıyorsun.';
      if (p >= 50) return 'Medyanın üzerinde, iyi bir seviyedesin.';
      if (p >= 25) return 'Medyanın altında, ancak çeyrekten yukarıdasın.';
      return 'Alt %25\'lik dilimdesin. Maaş görüşmesi düşünebilirsin.';
    } else {
      if (p >= 90) return 'Amazing! You\'re in the top 10% of the industry.';
      if (p >= 75) return 'Great! You\'re earning above average.';
      if (p >= 50) return 'Above median, you\'re at a good level.';
      if (p >= 25) return 'Below median, but above the first quartile.';
      return 'You\'re in the bottom 25%. Consider negotiating your salary.';
    }
  };

  if (!stats) return null;

  return (
    <Card
      title={t('charts.salaryCalculator')}
      icon={ChartIcons.multiplier}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Left: Input */}
        <div className="lg:w-72 flex-shrink-0 space-y-3">
          <p className="text-sm text-[var(--text-secondary)]">
            {isTr
              ? 'Net maaşını gir ve sektördeki yerini gör.'
              : 'Enter your net salary and see where you stand.'}
          </p>
          <div className="relative">
            <input
              type="text"
              value={salary}
              onChange={handleChange}
              placeholder={isTr ? 'Örn: 45.000' : 'E.g: 45,000'}
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-4 py-3 pr-12 border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
              ₺
            </span>
          </div>
          {/* Context - always visible */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[var(--border)]">
            <div className="text-center">
              <p className="text-xs text-[var(--text-secondary)]">25%</p>
              <p className="font-medium text-sm text-[var(--text-primary)]">{stats.p25?.toLocaleString('tr-TR')} ₺</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[var(--text-secondary)]">{isTr ? 'Medyan' : 'Median'}</p>
              <p className="font-medium text-sm text-[var(--accent)]">{stats.median?.toLocaleString('tr-TR')} ₺</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[var(--text-secondary)]">75%</p>
              <p className="font-medium text-sm text-[var(--text-primary)]">{stats.p75?.toLocaleString('tr-TR')} ₺</p>
            </div>
          </div>
        </div>

        {/* Right: Result */}
        <div className="flex-1">
          {percentile ? (
            <div className="bg-[var(--bg-primary)] rounded-lg p-4 space-y-3">
              {/* Result */}
              <div className="text-center">
                <p className="text-4xl font-bold">
                  <span className={getPercentileColor(percentile)}>{percentile}</span>
                  <span className="text-[var(--text-secondary)] text-xl">. yüzdelik</span>
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  {getPercentileMessage(percentile)}
                </p>
              </div>

              {/* Percentile Bar */}
              <div className="relative h-4 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 opacity-30"
                  style={{ width: '100%' }}
                />
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[var(--text-primary)] rounded"
                  style={{ left: `${percentile}%`, transform: 'translateX(-50%)' }}
                />
              </div>

              {/* Labels */}
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--bg-primary)] rounded-lg p-4 h-full flex items-center justify-center min-h-[120px]">
              <p className="text-[var(--text-secondary)] text-sm">
                {isTr ? 'Maaşını girerek sektördeki yerini öğren.' : 'Enter your salary to see where you stand.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
