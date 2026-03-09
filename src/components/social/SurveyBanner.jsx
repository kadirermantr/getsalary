import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SURVEY_BANNER } from '../../data/config';

export function SurveyBanner() {
  const { t } = useTranslation();
  const { enabled, year, formUrl, expiresAt } = SURVEY_BANNER;
  const isExpired = expiresAt && new Date() >= new Date(expiresAt);
  const storageKey = `survey${year}Dismissed`;

  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem(storageKey) === 'true';
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || dismissed || isExpired) return;
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [enabled, dismissed]);

  if (!enabled || dismissed || isExpired) return null;

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      sessionStorage.setItem(storageKey, 'true');
      setDismissed(true);
    }, 300);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out
        bottom-5 right-5 max-w-xs
        max-sm:bottom-auto max-sm:top-[4.5rem] max-sm:left-4 max-sm:right-4 max-sm:max-w-none ${
        visible ? 'translate-y-0 opacity-100' : 'max-sm:-translate-y-4 sm:translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] outline outline-1 outline-white/20 text-[var(--text-primary)] rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDismiss}
          className="text-sm font-medium hover:text-[var(--accent)] transition-colors flex-1"
        >
          {t('surveyBanner.text', { year })}
          <svg className="w-3 h-3 inline-block ml-2 -mt-0.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
        <button
          onClick={handleDismiss}
          className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]/40 transition-colors cursor-pointer shrink-0"
          aria-label="Close"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
