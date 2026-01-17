import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();
  const { lang = 'tr' } = useParams();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="font-mono text-8xl font-bold text-[var(--accent)] mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          {t('common.pageNotFound')}
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          {t('common.pageNotFoundDesc')}
        </p>
        <Link
          to={`/${lang}`}
          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          {t('common.backToHome')}
        </Link>
      </div>
    </div>
  );
}
