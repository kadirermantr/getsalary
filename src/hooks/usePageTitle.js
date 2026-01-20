import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SITE_NAME = 'getSalary';

export function usePageTitle(titleKey) {
  const { t } = useTranslation();

  useEffect(() => {
    const pageTitle = t(`pageTitles.${titleKey}`);
    document.title = `${pageTitle} | ${SITE_NAME}`;
  }, [t, titleKey]);
}
