import { useTranslation } from 'react-i18next';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { OpenSourceBanner } from '../components/social/OpenSourceBanner';
import { FAQ } from '../components/ui/FAQ';

export function About() {
  const { t } = useTranslation();

  const dataSources = [
    { year: 2021, url: 'https://github.com/oncekiyazilimci/2021-yazilimci-maaslari', participants: '~2,500' },
    { year: 2022, url: 'https://github.com/oncekiyazilimci/2022-yazilimci-maaslari', participants: '5,038' },
    { year: 2023, url: 'https://github.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari', participants: '8,718' },
    { year: 2024, url: 'https://github.com/oncekiyazilimci/2024-yazilim-sektoru-maaslari', participants: '5,989' },
    { year: 2025, url: 'https://github.com/oncekiyazilimci/2025-yazilim-sektoru-maaslari', participants: '9,056' },
  ];

  return (
    <PageContainer size="narrow">
      <PageHeader title={t('about.title')} />

      {/* Mission Text */}
      <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
        {t('about.missionDesc')}
      </p>

      {/* Data Sources */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
          {t('about.dataSources')}
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {t('about.dataSourcesDesc.prefix')}
          <a
            href="https://www.linkedin.com/in/oncekiyazilimci/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] "
          >
            @oncekiyazilimci
          </a>
          {t('about.dataSourcesDesc.suffix')}
        </p>

        <div className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--bg-primary)]">
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--text-primary)]">
                  {t('about.year')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--text-primary)]">
                  {t('about.participants')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--text-primary)]">
                  {t('about.source')}
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSources.map((source) => (
                <tr key={source.year} className="border-b border-[var(--bg-primary)] last:border-0">
                  <td className="px-6 py-4 text-[var(--text-primary)] font-medium">
                    {source.year}
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">
                    {source.participants}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)]  text-sm"
                    >
                      GitHub →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
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
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
          {t('about.faq') || 'Sık Sorulan Sorular'}
        </h2>
        <FAQ />
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
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
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
          {t('about.developer')}
        </h2>
        <p className="text-[var(--text-secondary)]">
          {t('about.developerDesc.prefix')}
          <a
            href="https://www.linkedin.com/in/kadirerman/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] "
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
