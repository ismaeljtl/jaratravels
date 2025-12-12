import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.pt;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'jara-language';

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  if (browserLang === 'pt') return 'pt';
  if (browserLang === 'es') return 'es';
  return 'en'; // Default to English for other languages
};

const getInitialLanguage = (): Language => {
  // Check localStorage first
  const stored = localStorage.getItem(LANGUAGE_KEY);
  if (stored && (stored === 'pt' || stored === 'en' || stored === 'es')) {
    return stored as Language;
  }
  // Fall back to browser language detection
  return getBrowserLanguage();
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
