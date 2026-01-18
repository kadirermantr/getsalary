import { useLanguage } from '../../context/LanguageContext';

export function LanguageSwitch() {
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 bg-[var(--bg-secondary)] rounded-lg p-1">
      {supportedLanguages.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
            currentLanguage === lang
              ? 'bg-[var(--accent)] text-white'
              : 'hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]'
          }`}
          aria-label={`Switch to ${lang === 'tr' ? 'Turkish' : 'English'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
