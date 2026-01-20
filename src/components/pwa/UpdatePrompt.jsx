import { useEffect, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const TEST_MODE = false;

const TOAST_ID = 'pwa-update';

export function UpdatePrompt() {
  const { t, i18n } = useTranslation();
  const shouldShow = useRef(false);

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

  // Track if we should show toast
  useEffect(() => {
    if (needRefresh || TEST_MODE) {
      shouldShow.current = true;
    }
  }, [needRefresh]);

  // Show/update toast when language changes or when needed
  useEffect(() => {
    if (shouldShow.current) {
      toast(t('pwa.updateAvailable'), {
        id: TOAST_ID,
        description: t('pwa.updateDescription'),
        duration: Infinity,
        action: {
          label: t('pwa.refresh'),
          onClick: () => updateServiceWorker(true),
        },
        style: {
          maxWidth: '300px',
        },
        actionButtonStyle: {
          backgroundColor: '#818cf8',
          color: '#fff',
          padding: '16px 24px',
          fontSize: '14px',
          fontWeight: '600',
          borderRadius: '6px',
        },
      });
    }
  }, [i18n.language, needRefresh, updateServiceWorker, t]);

  return null;
}
