import { useTranslation } from 'react-i18next';
import { formatSalary } from '../../utils/calculations';

export function BacktestTable({ backtesting }) {
  const { t, i18n } = useTranslation();

  if (!backtesting?.results?.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left py-2 text-[var(--text-secondary)] font-medium text-xs">{t('prediction.year')}</th>
            <th className="text-right py-2 text-[var(--text-secondary)] font-medium text-xs">{t('prediction.actual')}</th>
            <th className="text-right py-2 text-[var(--text-secondary)] font-medium text-xs">{t('prediction.predicted')}</th>
            <th className="text-right py-2 text-[var(--text-secondary)] font-medium text-xs">{t('prediction.errorRate')}</th>
          </tr>
        </thead>
        <tbody>
          {backtesting.results.map((row) => (
            <tr key={row.testYear} className="border-b border-[var(--border)]/30">
              <td className="py-2 font-mono text-[var(--text-primary)]">{row.testYear}</td>
              <td className="py-2 text-right font-mono text-blue-400">{formatSalary(row.actual, i18n.language)}</td>
              <td className="py-2 text-right font-mono text-amber-400">{formatSalary(row.predicted, i18n.language)}</td>
              <td className={`py-2 text-right font-mono ${row.mape < 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {i18n.language === 'tr' ? `%${row.mape}` : `${row.mape}%`}
              </td>
            </tr>
          ))}
          <tr className="border-t border-[var(--border)]">
            <td className="py-2 font-semibold text-[var(--text-primary)]" colSpan={3}>
              {t('prediction.avgMape')}
            </td>
            <td className={`py-2 text-right font-mono font-semibold ${backtesting.avgMape < 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {i18n.language === 'tr' ? `%${backtesting.avgMape}` : `${backtesting.avgMape}%`}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
