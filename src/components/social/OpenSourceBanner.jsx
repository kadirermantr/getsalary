import { useTranslation } from 'react-i18next';

export function OpenSourceBanner({ className = '' }) {
  const { t } = useTranslation();

  return (
    <div className={`relative bg-gradient-to-r from-[var(--accent)]/10 to-purple-500/10 rounded-2xl p-8 border border-[var(--accent)]/20 overflow-hidden ${className}`}>
      {/* Background code */}
      <span className="absolute -right-4 -top-4 text-[var(--accent)]/5 text-8xl font-mono font-bold pointer-events-none">{'{ }'}</span>

      <div className="relative text-center">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4 font-mono">
          <span className="text-emerald-500">{'// '}</span>
          {t('home.openSourceTitle')}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[var(--text-secondary)]">
            {t('home.openSourceDesc')}
          </span>
          <a
            href="https://github.com/kadirermantr/getsalary"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--accent)] font-medium font-mono"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
