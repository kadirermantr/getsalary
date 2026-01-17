import { useTranslation } from 'react-i18next';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';

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
      <PageHeader title={t('about.title')} description={t('about.description')} />

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          {t('about.mission')}
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          {t('about.missionDesc')}
        </p>
      </section>

      {/* Data Sources */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          {t('about.dataSources')}
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {t('about.dataSourcesDesc')}
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
                      className="text-[var(--accent)] hover:underline text-sm"
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
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
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

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
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

      {/* Contribute */}
      <section className="bg-gradient-to-r from-[var(--accent)]/10 to-purple-500/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          {t('about.contribute')}
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {t('about.contributeDesc')}
        </p>
        <a
          href="https://github.com/getsalary/getsalary"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </section>
    </PageContainer>
  );
}
