import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { OpenSourceBanner } from '../components/social/OpenSourceBanner';

function FeatureCard({ icon, title, desc }) {
  return (
    <div
      className="group px-4 py-6 rounded-xl border border-[var(--border)]/50 backdrop-blur-sm hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1 text-center bg-[var(--bg-secondary)]/50"
    >
      <div className="mb-4 text-[var(--text-secondary)] transition-colors group-hover:text-[var(--accent)] flex justify-center">
        {icon}
      </div>
      <h3 className="font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)]">{desc}</p>
    </div>
  );
}

export function Home() {
  const { t } = useTranslation();
  usePageTitle('home');

  const stats = [
    { value: '5+', label: t('hero.stats.years') },
    { value: '30K+', label: t('hero.stats.participants') },
    { value: '15+', label: t('hero.stats.positions') },
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
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      title: t('home.byExperience'),
      desc: t('home.byExperienceDesc'),
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
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Z" />
        </svg>
      ),
      title: t('home.byMinWage'),
      desc: t('home.byMinWageDesc'),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Aurora + Topographic combined */}
      {/* Aurora base layer */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 25% 5%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 75% 5%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
          `,
          filter: 'blur(50px)',
        }}
      />
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--text-secondary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)',
        }}
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
              {t('hero.title')}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10">
              {t('hero.description')}
            </p>

            {/* CTA Button - purple like min wage multiplier */}
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#6366f1] text-white hover:bg-[#4f46e5] transition-all"
            >
              <span>{t('hero.cta')}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Stats - monochromatic, accent only for emphasis */}
          <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center px-4 py-6 rounded-xl border border-[var(--border)]/50 backdrop-blur-sm hover:border-[var(--accent)]/50 transition-all bg-[var(--bg-secondary)]/50"
              >
                <div className="text-3xl sm:text-4xl font-bold font-mono text-[var(--text-primary)]">
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
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
              />
            ))}
          </div>

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
