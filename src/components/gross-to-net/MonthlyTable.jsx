import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { AYLAR } from '../../data/bordroParams';

export function MonthlyTable({ monthlyData, annualTotals }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const months = AYLAR[lang] || AYLAR.tr;

  const formatMoney = (value) =>
    value.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <Card title={t('grossToNet.monthlyBreakdown')} titleCenter>
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-3 px-2 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                {t('grossToNet.month')}
              </th>
              <th className="text-right py-3 px-2 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                {t('grossToNet.grossSalary')}
              </th>
              <th className="text-right py-3 px-2 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                {t('grossToNet.sgk')}
              </th>
              <th className="text-right py-3 px-2 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                {t('grossToNet.unemployment')}
              </th>
              <th className="text-right py-3 px-2 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                {t('grossToNet.incomeTax')}
              </th>
              <th className="text-right py-3 px-2 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                {t('grossToNet.stampTax')}
              </th>
              <th className="text-right py-3 px-2 text-[var(--text-secondary)] font-medium whitespace-nowrap">
                {t('grossToNet.netSalary')}
              </th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((row, index) => (
              <tr
                key={row.ay}
                className={`border-b border-[var(--border)] ${
                  row.dilimDegisti
                    ? 'bg-rose-500/10'
                    : ''
                }`}
              >
                <td className="py-3 px-2 text-[var(--text-primary)] font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    {months[index]}
                    {row.dilimDegisti && (
                      <span
                        className="text-[10px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded"
                        title={t('grossToNet.taxBracketNote')}
                      >
                        {t('grossToNet.taxBracketNote')}
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-right py-3 px-2 text-[var(--text-primary)]">
                  {formatMoney(row.brut)}
                </td>
                <td className="text-right py-3 px-2 text-[var(--text-secondary)]">-{formatMoney(row.sgk)}</td>
                <td className="text-right py-3 px-2 text-[var(--text-secondary)]">-{formatMoney(row.issizlik)}</td>
                <td className="text-right py-3 px-2 text-[var(--text-secondary)]">
                  -{formatMoney(row.gelirVergisi)}
                </td>
                <td className="text-right py-3 px-2 text-[var(--text-secondary)]">
                  -{formatMoney(row.damgaVergisi)}
                </td>
                <td className="text-right py-3 px-2 text-[var(--accent)] font-semibold">
                  {formatMoney(row.net)}
                </td>
              </tr>
            ))}
            {/* Annual Total Row */}
            <tr className="bg-[var(--bg-tertiary)]/70 font-semibold">
              <td className="py-3 px-2 text-[var(--text-primary)]">{t('grossToNet.annual')}</td>
              <td className="text-right py-3 px-2 text-[var(--text-primary)]">
                {formatMoney(annualTotals.brut)}
              </td>
              <td className="text-right py-3 px-2 text-[var(--text-secondary)]">
                -{formatMoney(annualTotals.sgk)}
              </td>
              <td className="text-right py-3 px-2 text-[var(--text-secondary)]">
                -{formatMoney(annualTotals.issizlik)}
              </td>
              <td className="text-right py-3 px-2 text-[var(--text-secondary)]">
                -{formatMoney(annualTotals.gelirVergisi)}
              </td>
              <td className="text-right py-3 px-2 text-[var(--text-secondary)]">
                -{formatMoney(annualTotals.damgaVergisi)}
              </td>
              <td className="text-right py-3 px-2 text-[var(--accent)]">
                {formatMoney(annualTotals.net)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
