import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, ChartIcons } from '../ui/Card';
import {
  BORDRO_PARAMS,
  AVAILABLE_YEARS,
  calculateGrossToNet,
  calculateNetToGross,
  calculateAnnualTotals,
} from '../../data/bordroParams';
import { PayrollMonthlyTable } from './PayrollMonthlyTable';

export function PayrollCalculator({ selectedYear, setSelectedYear }) {
  const { t, i18n } = useTranslation();
  const isTurkish = i18n.language === 'tr';
  const [grossInput, setGrossInput] = useState('');
  const [netInput, setNetInput] = useState('');
  const [activeField, setActiveField] = useState(null); // 'gross' or 'net'
  const isSyncing = useRef(false);

  const params = BORDRO_PARAMS[selectedYear];

  const formatNumber = (num) => {
    return Math.round(num).toLocaleString('tr-TR');
  };

  const formatInput = (value) => {
    const numbers = value.replace(/\D/g, '').replace(/^0+/, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const parseInput = (value) => {
    const num = parseInt(value.replace(/\D/g, ''), 10);
    return isNaN(num) || num <= 0 ? null : num;
  };

  const handleGrossChange = (e) => {
    const formatted = formatInput(e.target.value);
    if (formatted.replace(/\./g, '').length <= 6) {
      isSyncing.current = false;
      setGrossInput(formatted);
      setActiveField('gross');
      // Alan boşaltılınca diğerini de temizle
      if (!formatted) {
        setNetInput('');
        setActiveField(null);
      }
    }
  };

  const handleNetChange = (e) => {
    const formatted = formatInput(e.target.value);
    if (formatted.replace(/\./g, '').length <= 6) {
      isSyncing.current = false;
      setNetInput(formatted);
      setActiveField('net');
      // Alan boşaltılınca diğerini de temizle
      if (!formatted) {
        setGrossInput('');
        setActiveField(null);
      }
    }
  };

  const grossNum = useMemo(() => parseInput(grossInput), [grossInput]);
  const netNum = useMemo(() => parseInput(netInput), [netInput]);

  const monthlyData = useMemo(() => {
    if (activeField === 'gross' && grossNum) {
      return calculateGrossToNet(grossNum, params);
    } else if (activeField === 'net' && netNum) {
      return calculateNetToGross(netNum, params);
    }
    return null;
  }, [grossNum, netNum, activeField, params, selectedYear]);

  const annualTotals = useMemo(() => {
    if (!monthlyData) return null;
    return calculateAnnualTotals(monthlyData);
  }, [monthlyData]);

  // Ortalama değerler (yıllık toplam / 12)
  const avgValues = annualTotals ? {
    brut: annualTotals.brut / 12,
    net: annualTotals.net / 12,
    sgk: annualTotals.sgk / 12,
    issizlik: annualTotals.issizlik / 12,
    gelirVergisi: annualTotals.gelirVergisi / 12,
    damgaVergisi: annualTotals.damgaVergisi / 12,
  } : null;

  // Yıl değişince isSyncing'i sıfırla
  useEffect(() => {
    isSyncing.current = false;
  }, [selectedYear]);

  // Sync calculated value to the other input
  useEffect(() => {
    if (isSyncing.current) return;

    if (activeField === 'gross' && avgValues) {
      isSyncing.current = true;
      setNetInput(formatNumber(avgValues.net));
    } else if (activeField === 'net' && avgValues) {
      isSyncing.current = true;
      setGrossInput(formatNumber(avgValues.brut));
    }
  }, [activeField, avgValues?.brut, avgValues?.net, selectedYear]);

  const deductions = [
    { label: t('grossToNet.sgk'), value: avgValues?.sgk },
    { label: t('grossToNet.unemployment'), value: avgValues?.issizlik },
    { label: t('grossToNet.incomeTax'), value: avgValues?.gelirVergisi },
    { label: t('grossToNet.stampTax'), value: avgValues?.damgaVergisi },
  ];

  const totalDeductions = avgValues
    ? avgValues.sgk + avgValues.issizlik + avgValues.gelirVergisi + avgValues.damgaVergisi
    : null;

  const cardTitle = activeField === 'net' ? t('grossToNet.netToGross') : t('grossToNet.grossToNet');

  return (
    <div className="space-y-4">
      <Card title={cardTitle} icon={ChartIcons.banknote}>
        <div className="space-y-4">
          {/* Yıl Seçici */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-[var(--border)]">
            {AVAILABLE_YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  selectedYear === year
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Ana sonuçlar - 2 kolon */}
          <div className="grid grid-cols-2 gap-3">
            {/* Brüt Maaş */}
            <div className={`p-4 rounded-xl border transition-colors ${activeField === 'net' && avgValues ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30' : 'bg-[var(--bg-primary)] border-[var(--border)]'}`}>
              <div className={`text-xs mb-1 ${activeField === 'net' && avgValues ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                {t('grossToNet.grossSalary')}
              </div>
              <div className="relative">
                <span className={`absolute ${isTurkish ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 text-2xl font-bold ${activeField === 'net' && avgValues ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>₺</span>
                <input
                  type="text"
                  value={grossInput}
                  onChange={handleGrossChange}
                  placeholder="0"
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className={`w-full bg-transparent text-2xl font-bold ${isTurkish ? 'pr-5' : 'pl-5'} ${activeField === 'net' && avgValues ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}
                />
              </div>
            </div>

            {/* Net Maaş */}
            <div className={`p-4 rounded-xl border transition-colors ${activeField === 'gross' && avgValues ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30' : 'bg-[var(--bg-primary)] border-[var(--border)]'}`}>
              <div className={`text-xs mb-1 ${activeField === 'gross' && avgValues ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                {t('grossToNet.netSalary')}
              </div>
              <div className="relative">
                <span className={`absolute ${isTurkish ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 text-2xl font-bold ${activeField === 'gross' && avgValues ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>₺</span>
                <input
                  type="text"
                  value={netInput}
                  onChange={handleNetChange}
                  placeholder="0"
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className={`w-full bg-transparent text-2xl font-bold ${isTurkish ? 'pr-5' : 'pl-5'} ${activeField === 'gross' && avgValues ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}
                />
              </div>
            </div>
          </div>

          {monthlyData ? (
            <>
              {/* Kesintiler - 4 kolon grid */}
              <div className="text-sm font-medium text-[var(--text-secondary)] mb-2">{t('grossToNet.avgMonthlyDeductions')}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {deductions.map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border)]">
                    <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wide">{item.label}</div>
                    <div className="text-base font-semibold text-[var(--text-secondary)]">
                      -{item.value.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Toplam kesinti */}
              <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                <span className="text-sm text-[var(--text-secondary)]">{t('grossToNet.totalDeductions')}</span>
                <span className="font-bold text-[var(--text-secondary)]">
                  {isTurkish ? `-${totalDeductions.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺` : `-₺${totalDeductions.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`}
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)]">
                {t('grossToNet.infoNote')}
              </p>
            </>
          ) : (
            <p className="text-sm text-[var(--text-secondary)] text-center py-4">
              {t('grossToNet.emptyStateHint')}
            </p>
          )}
        </div>
      </Card>

      {/* Monthly Table */}
      {monthlyData && annualTotals && (
        <PayrollMonthlyTable monthlyData={monthlyData} annualTotals={annualTotals} />
      )}
    </div>
  );
}
