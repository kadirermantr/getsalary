import { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const LanguageContext = createContext(undefined);

const SUPPORTED_LANGUAGES = ['tr', 'en'];
const DEFAULT_LANGUAGE = 'tr';

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Sync i18n with URL language
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang, i18n]);

  const changeLanguage = (newLang) => {
    if (!SUPPORTED_LANGUAGES.includes(newLang)) return;

    // Update URL with new language
    const pathParts = location.pathname.split('/');
    if (SUPPORTED_LANGUAGES.includes(pathParts[1])) {
      pathParts[1] = newLang;
    } else {
      pathParts.splice(1, 0, newLang);
    }

    const newPath = pathParts.join('/') || `/${newLang}`;
    navigate(newPath);
    i18n.changeLanguage(newLang);
  };

  const value = {
    currentLanguage: i18n.language,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isRTL: false, // Turkish and English are LTR
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
