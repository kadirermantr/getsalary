import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SURVEY_BANNER } from '../../data/config';

export function SurveyBanner() {
  const { t } = useTranslation();
  const { enabled, year, formUrl } = SURVEY_BANNER;
  const storageKey = `survey${year}Dismissed`;

  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem(storageKey) === 'true';
  });

  if (!enabled || dismissed) return null;

  const handleDismiss = () => {
    sessionStorage.setItem(storageKey, 'true');
    setDismissed(true);
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          {t('surveyBanner.text', { year })}
        </span>
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm font-semibold transition-colors whitespace-nowrap"
        >
          {t('surveyBanner.cta')}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
        <button
          onClick={handleDismiss}
          className="absolute right-2 sm:right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
