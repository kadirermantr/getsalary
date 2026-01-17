import { useTranslation } from 'react-i18next';
import { OpenSourceBanner } from '../components/social/OpenSourceBanner';
import { FAQ } from '../components/ui/FAQ';

export function About() {
  const { t } = useTranslation();

  const techStack = ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'react-i18next', 'Vercel'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            {t('about.title')}
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {t('about.missionDesc')}
          </p>
        </div>

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
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full text-sm border border-[var(--border)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <OpenSourceBanner />
      </div>
    </div>
  );
}
