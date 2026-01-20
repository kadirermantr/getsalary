import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/layout/PageContainer';
import { OpenSourceBanner } from '../components/social/OpenSourceBanner';
import { FAQ } from '../components/ui/FAQ';

export function About() {
  const { t } = useTranslation();

  const techStack = [
    { name: 'React', url: 'https://react.dev' },
    { name: 'Vite', url: 'https://vite.dev' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { name: 'Recharts', url: 'https://recharts.github.io' },
    { name: 'Framer Motion', url: 'https://motion.dev' },
    { name: 'react-i18next', url: 'https://react.i18next.com' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title={t('about.title')}
          description={t('about.missionDesc')}
          className="mb-12"
        />

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t('about.methodology')}
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)]">
            <p>{t('about.methodologyDesc')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('about.methodologyList.median')}</li>
              <li>{t('about.methodologyList.minWage')}</li>
              <li>{t('about.methodologyList.inflation')}</li>
              <li>{t('about.methodologyList.segmentation')}</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t('about.faq')}
          </h2>
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
            <FAQ />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t('about.techStack')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full text-sm border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {tech.name}
              </a>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <OpenSourceBanner />
      </div>
    </div>
  );
}
