import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageContainer, PageHeaderWithShare } from '../components/layout/PageContainer';
import { FAQ as FAQList } from '../components/ui/FAQ';

export function FAQ() {
  const { t } = useTranslation();
  usePageTitle('faq');

  return (
    <PageContainer size="narrow">
        <PageHeaderWithShare
          title={t('faq.title')}
          description={t('faq.description')}
          shareTitle={`getSalary - ${t('faq.title')}`}
          shareDescription={t('faq.description')}
        />

        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
          <FAQList />
        </div>
    </PageContainer>
  );
}
