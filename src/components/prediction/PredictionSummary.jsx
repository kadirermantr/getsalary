import { useTranslation } from 'react-i18next';
import { formatSalary } from '../../utils/calculations';
import { StatCard } from '../ui/StatCard';

export function PredictionSummary({ predictions, mape, lastTrainingYear, lastYearMedian }) {
  const { t, i18n } = useTranslation();
  const nextYear = lastTrainingYear + 1;
  const prediction = predictions[nextYear];

  if (!prediction) return null;

  // Year-over-year growth percentage
  const growth = lastYearMedian > 0
    ? Math.round(((prediction.adjusted - lastYearMedian) / lastYearMedian) * 100)
    : null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        label={`${nextYear} ${t('prediction.median')}`}
        value={formatSalary(prediction.adjusted, i18n.language)}
        color="amber"
        icon={
          <svg className="w-5 h-5 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>
        }
      />

      {predictions[nextYear + 1] && (
        <StatCard
          label={`${nextYear + 1} ${t('prediction.median')}`}
          value={formatSalary(predictions[nextYear + 1].adjusted, i18n.language)}
          color="purple"
          icon={
            <svg className="w-5 h-5 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
          }
        />
      )}

      {growth !== null && (
        <StatCard
          label={`${lastTrainingYear} → ${nextYear} ${t('prediction.estimatedGrowth')}`}
          value={`%${growth}`}
          color="blue"
          icon={
            <svg className="w-5 h-5 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
          }
        />
      )}

      <StatCard
        label={t('prediction.avgError')}
        value={`%${mape}`}
        color={mape < 15 ? 'emerald' : 'amber'}
        icon={
          <svg className="w-5 h-5 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
          </svg>
        }
      />
    </div>
  );
}
