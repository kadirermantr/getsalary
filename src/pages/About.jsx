import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';

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
    <PageContainer size="narrow">
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

        {/* FAQ Link */}
        <section className="mb-12">
          <Link
            to="/faq"
            className="flex items-center justify-between w-full px-6 py-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-colors group"
          >
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {t('about.faq')}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{t('about.faqDesc')}</p>
            </div>
            <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </section>

    </PageContainer>
  );
}
