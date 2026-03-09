import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageHeaderWithShare } from '../components/layout/PageContainer';
import { FAQ as FAQList } from '../components/ui/FAQ';

export function FAQ() {
  const { t } = useTranslation();
  usePageTitle('faq');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeaderWithShare
          title={t('faq.title')}
          description={t('faq.description')}
          shareTitle={`getSalary - ${t('faq.title')}`}
          shareDescription={t('faq.description')}
        />

        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
          <FAQList />
        </div>
      </div>
    </div>
  );
}
