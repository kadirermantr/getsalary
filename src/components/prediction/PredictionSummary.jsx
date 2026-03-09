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
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          }
        />
      )}

      {growth !== null && (
        <StatCard
          label={`${lastTrainingYear} → ${nextYear} ${t('prediction.estimatedGrowth')}`}
          value={i18n.language === 'tr' ? `%${growth}` : `${growth}%`}
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
        value={i18n.language === 'tr' ? `%${mape}` : `${mape}%`}
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
