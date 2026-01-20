import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export function UpdatePrompt() {
  const { t } = useTranslation();

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // Check for updates every 5 minutes
      if (r) {
        setInterval(() => r.update(), 5 * 60 * 1000);
      }
    },
  });

  useEffect(() => {
    if (needRefresh) {
      toast(t('pwa.updateAvailable'), {
        description: t('pwa.updateDescription'),
        duration: Infinity,
        action: {
          label: t('pwa.refresh'),
          onClick: () => updateServiceWorker(true),
        },
      });
    }
  }, [needRefresh, updateServiceWorker, t]);

  return null;
}
