import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

  const stats = [
    { value: '5+', label: t('hero.stats.years'), color: 'text-emerald-500' },
    { value: '30K+', label: t('hero.stats.participants'), color: 'text-[var(--accent)]' },
    { value: '15+', label: t('hero.stats.positions'), color: 'text-purple-500' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      title: t('home.byPosition'),
      desc: t('home.byPositionDesc'),
      color: 'group-hover:text-emerald-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      title: t('home.byExperience'),
      desc: t('home.byExperienceDesc'),
      color: 'group-hover:text-[var(--accent)]',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
      title: t('home.byCity'),
      desc: t('home.byCityDesc'),
      color: 'group-hover:text-purple-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      title: t('home.byMinWage'),
      desc: t('home.byMinWageDesc'),
      color: 'group-hover:text-amber-500',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Floating Code Elements - Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <span className="absolute top-20 left-[10%] text-[var(--accent)]/10 text-6xl font-mono font-bold">{'{ }'}</span>
        <span className="absolute top-40 right-[15%] text-purple-500/10 text-5xl font-mono font-bold">{'( )'}</span>
        <span className="absolute top-[60%] left-[5%] text-emerald-500/10 text-4xl font-mono font-bold">{'=>'}</span>
        <span className="absolute top-[70%] right-[10%] text-amber-500/10 text-5xl font-mono font-bold">{'</>'}</span>
        <span className="absolute top-[30%] left-[80%] text-[var(--accent)]/10 text-3xl font-mono">{'const'}</span>
        <span className="absolute top-[50%] left-[3%] text-purple-500/10 text-3xl font-mono">{'return'}</span>
      </div>

      {/* Hero Section */}
      <section className="relative">
        {/* Dot Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--text-secondary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-purple-500/5 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            {/* Code Comment */}
            <p className="font-mono text-[var(--text-secondary)] text-sm mb-4">
              {'// Türkiye yazılım sektörü maaş verileri'}
            </p>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
              <span className="text-[var(--accent)]">{'<'}</span>
              {t('hero.title')}
              <span className="text-[var(--accent)]">{' />'}</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            {/* Terminal-like CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] font-mono px-6 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[var(--accent)]/10"
              >
                <span className="text-emerald-500">$</span>
                <span>getSalary</span>
                <span className="text-[var(--accent)]">--analyze</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)]">
                <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                  {`// stat[${index}]`}
                </div>
                <div className={`text-3xl sm:text-4xl font-bold font-mono ${stat.color}`}>
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
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header with code style */}
          <div className="text-center mb-12">
            <p className="font-mono text-[var(--text-secondary)] text-sm mb-2">
              {'function analyze() {'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {t('home.featuresTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--accent)]/5"
              >
                <div className={`mb-4 text-[var(--text-secondary)] transition-colors ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 font-mono">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Closing brace */}
          <p className="font-mono text-[var(--text-secondary)] text-sm text-center mt-8">
            {'}'}
          </p>
        </div>
      </section>

      {/* Open Source Banner */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-r from-[var(--accent)]/10 to-purple-500/10 rounded-2xl p-8 border border-[var(--accent)]/20 overflow-hidden">
            {/* Background code */}
            <span className="absolute -right-4 -top-4 text-[var(--accent)]/5 text-8xl font-mono font-bold pointer-events-none">{'{ }'}</span>

            <div className="relative">
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
                  className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline font-medium font-mono"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
