import { useTranslation } from 'react-i18next';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { OpenSourceBanner } from '../components/social/OpenSourceBanner';
import { FAQ } from '../components/ui/FAQ';

export function About() {
  const { t } = useTranslation();

  return (
    <PageContainer size="narrow">
      <PageHeader title={t('about.title')} />

      {/* Mission Text */}
      <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
        {t('about.missionDesc')}
      </p>

      {/* Methodology */}
      <section className="mb-16">
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
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          {t('about.faq') || 'Sık Sorulan Sorular'}
        </h2>
        <FAQ />
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'Vite', 'Tailwind CSS', 'Recharts', 'react-i18next', 'Vercel'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Developer */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          {t('about.developer')}
        </h2>
        <p className="text-[var(--text-secondary)]">
          {t('about.developerDesc.prefix')}
          <a
            href="https://www.linkedin.com/in/kadirerman/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)]"
          >
            @kadirerman
          </a>
          {t('about.developerDesc.suffix')}
        </p>
      </section>

      {/* Open Source */}
      <OpenSourceBanner />
    </PageContainer>
  );
}
