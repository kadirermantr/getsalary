import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { useFilters } from '../../context/FilterContext';
import { Card, ChartIcons } from '../ui/Card';

export function SalaryCalculator() {
  const { t } = useTranslation();
  const { getYearStats } = useData();
  const { filters } = useFilters();
  const [salary, setSalary] = useState('');
  const confettiTriggered = useRef(false);

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
    if (p >= 90) return t('calculator.top10');
    if (p >= 75) return t('calculator.top25');
    if (p >= 50) return t('calculator.aboveMedian');
    if (p >= 25) return t('calculator.belowMedian');
    return t('calculator.bottom25');
  };

  // Trigger confetti for top 10%
  useEffect(() => {
    if (percentile >= 90 && !confettiTriggered.current) {
      confettiTriggered.current = true;

      // Fire confetti burst
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }

    // Reset confetti trigger when percentile drops below 90
    if (percentile && percentile < 90) {
      confettiTriggered.current = false;
    }
  }, [percentile]);

  if (!stats) return null;

  return (
    <Card
      title={t('charts.salaryCalculator')}
      icon={ChartIcons.calculator}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Left: Input */}
        <div className="lg:w-72 flex-shrink-0 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={salary}
              onChange={handleChange}
              placeholder={t('calculator.placeholder')}
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
              <p className="text-xs text-[var(--text-secondary)]">{t('charts.median')}</p>
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
                  <span className="text-[var(--text-secondary)] text-xl">. {t('charts.percentile')}</span>
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
              <p className="text-[var(--text-secondary)] text-sm text-center inline-flex items-center gap-2">
                <svg className="w-4 h-4 hidden lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <span>{t('calculator.enterHint')}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
