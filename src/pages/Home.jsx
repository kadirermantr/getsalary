import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OpenSourceBanner } from '../components/social/OpenSourceBanner';

function FeatureCard({ icon, title, desc, color = 'accent' }) {
  const hoverColors = {
    accent: 'group-hover:text-[var(--accent)]',
    green: 'group-hover:text-emerald-500',
    purple: 'group-hover:text-purple-500',
    amber: 'group-hover:text-amber-500',
  };

  return (
    <div
      className="group bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--accent)]/5 text-center"
    >
      <div className={`mb-4 text-[var(--text-secondary)] transition-colors ${hoverColors[color]} flex justify-center`}>
        {icon}
      </div>
      <h3 className="font-semibold text-[var(--text-primary)] mb-2 font-mono">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)]">{desc}</p>
    </div>
  );
}

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
      color: 'green',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      title: t('home.byExperience'),
      desc: t('home.byExperienceDesc'),
      color: 'accent',
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
      color: 'purple',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Z" />
        </svg>
      ),
      title: t('home.byMinWage'),
      desc: t('home.byMinWageDesc'),
      color: 'amber',
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
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
              <span className="text-[var(--accent)]">{'<'}</span>
              {t('hero.title')}
              <span className="text-[var(--accent)]">{' />'}</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10">
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
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                color={feature.color}
              />
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OpenSourceBanner />
        </div>
      </section>
    </div>
  );
}
