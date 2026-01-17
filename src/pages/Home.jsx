import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

  const stats = [
    { value: '5', label: t('hero.stats.years') },
    { value: '30K+', label: t('hero.stats.participants') },
    { value: '15+', label: t('hero.stats.positions') },
  ];

  const features = [
    {
      icon: '📊',
      title: t('home.byPosition'),
      desc: t('home.byPositionDesc'),
    },
    {
      icon: '📈',
      title: t('home.byExperience'),
      desc: t('home.byExperienceDesc'),
    },
    {
      icon: '🏙️',
      title: t('home.byCity'),
      desc: t('home.byCityDesc'),
    },
    {
      icon: '💰',
      title: t('home.byMinWage'),
      desc: t('home.byMinWageDesc'),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-purple-500/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Tagline */}
            <p className="font-mono text-[var(--accent)] text-lg mb-4">
              {t('hero.subtitle')}
            </p>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
              {t('hero.title')}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10">
              {t('hero.description')}
            </p>

            {/* CTA Button */}
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-[var(--accent)]/25"
            >
              {t('hero.cta')}
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
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[var(--accent)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="bg-[var(--bg-secondary)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            {t('home.featuresTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--bg-secondary)] hover:border-[var(--accent)]/50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Banner */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[var(--accent)]/10 to-purple-500/10 rounded-2xl p-8 border border-[var(--accent)]/20">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              🌟 {t('home.openSourceTitle')}
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              {t('home.openSourceDesc')}
            </p>
            <a
              href="https://github.com/kadirermantr/getsalary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
