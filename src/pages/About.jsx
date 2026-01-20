import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageHeader } from '../components/layout/PageContainer';
import { FAQ } from '../components/ui/FAQ';

export function About() {
  const { t } = useTranslation();
  usePageTitle('about');

  const techStack = [
    { name: 'React', url: 'https://react.dev' },
    { name: 'Vite', url: 'https://vite.dev' },
    { name: 'React Router', url: 'https://reactrouter.com' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { name: 'Framer Motion', url: 'https://motion.dev' },
    { name: 'Recharts', url: 'https://recharts.github.io' },
    { name: 'react-i18next', url: 'https://react.i18next.com' },
    { name: 'Sonner', url: 'https://sonner.emilkowal.ski' },
    { name: 'PWA', url: 'https://vite-pwa-org.netlify.app' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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
              <li>{t('about.methodologyList.percentile')}</li>
              <li>{t('about.methodologyList.prediction')}</li>
              <li>{t('about.methodologyList.minWage')}</li>
              <li>{t('about.methodologyList.inflation')}</li>
              <li>{t('about.methodologyList.segmentation')}</li>
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t('about.techStack')}
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-xl text-sm font-medium border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
              >
                {tech.name}
              </a>
            ))}
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

      </div>
    </div>
  );
}
