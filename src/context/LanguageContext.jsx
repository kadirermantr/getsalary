import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext(undefined);

const SUPPORTED_LANGUAGES = ['tr', 'en'];
const DEFAULT_LANGUAGE = 'tr';
const STORAGE_KEY = 'getsalary-language';

const TITLES = {
  tr: 'getSalary() - Yazılım Sektörü Maaş Analizi',
  en: 'getSalary() - Software Industry Salary Insights',
};

function getInitialLanguage() {
  // 1. Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  // 2. Check browser language
  const browserLang = navigator.language?.split('-')[0];
  if (browserLang && SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }

  // 3. Default to Turkish
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(getInitialLanguage);

  useEffect(() => {
    // Sync i18n with current language
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
    // Update document title
    document.title = TITLES[currentLang] || TITLES[DEFAULT_LANGUAGE];
    // Update html lang attribute
    document.documentElement.lang = currentLang;
  }, [currentLang, i18n]);

  const changeLanguage = (newLang) => {
    if (!SUPPORTED_LANGUAGES.includes(newLang)) return;

    localStorage.setItem(STORAGE_KEY, newLang);
    setCurrentLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const value = {
    currentLanguage: currentLang,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isRTL: false,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };
