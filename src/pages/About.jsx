import { useTranslation } from 'react-i18next';
import { OpenSourceBanner } from '../components/social/OpenSourceBanner';
import { FAQ } from '../components/ui/FAQ';

function SectionCard({ title, icon, color = 'accent', children }) {
  const colorClasses = {
    accent: 'from-blue-500/20 to-blue-600/5 text-blue-500',
    green: 'from-emerald-500/20 to-emerald-600/5 text-emerald-500',
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-500',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-500',
  };

  return (
    <div
      className={`
        bg-[var(--bg-secondary)]
        rounded-2xl
        border border-[var(--border)]/50
        overflow-hidden
        relative
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`} />
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className={`${colorClasses[color].split(' ')[2]}`}>{icon}</span>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

function TechBadge({ name }) {
  return (
    <span className="px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-xl text-sm border border-[var(--border)]/50 hover:border-[var(--accent)]/30 transition-colors">
      {name}
    </span>
  );
}

export function About() {
  const { t } = useTranslation();

  const methodologyItems = [
    { icon: '📊', text: t('about.methodologyList.median') },
    { icon: '💰', text: t('about.methodologyList.minWage') },
    { icon: '📈', text: t('about.methodologyList.inflation') },
    { icon: '🎯', text: t('about.methodologyList.segmentation') },
  ];

  const techStack = ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'react-i18next', 'Vercel'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('about.missionDesc')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="space-y-4">
          {/* Row 1: Methodology */}
          <SectionCard
            title={t('about.methodology')}
            color="accent"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            }
          >
            <p className="text-[var(--text-secondary)] mb-4">{t('about.methodologyDesc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {methodologyItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)]/50"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-[var(--text-secondary)]">{item.text}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Row 2: FAQ */}
          <SectionCard
            title={t('about.faq')}
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            }
          >
            <FAQ />
          </SectionCard>

          {/* Row 3: Tech Stack */}
          <SectionCard
            title="Tech Stack"
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
            }
          >
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </SectionCard>

          {/* Row 4: Open Source */}
          <OpenSourceBanner />
        </div>
      </div>
    </div>
  );
}
