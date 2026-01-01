import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { translations, Language } from './translations';
import { supabase } from '@/integrations/supabase/client';

// Extended language type for auto-translation
export type ExtendedLanguage = Language | string;

interface LanguageContextType {
  language: ExtendedLanguage;
  setLanguage: (lang: ExtendedLanguage) => void;
  t: typeof translations.pt;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'jara-language';
const TRANSLATION_CACHE_KEY = 'jara-translations-cache';

// Built-in languages with static translations
const STATIC_LANGUAGES: Language[] = ['pt', 'en', 'es'];

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  if (browserLang === 'pt') return 'pt';
  if (browserLang === 'es') return 'es';
  return 'en'; // Default to English for other languages
};

const getInitialLanguage = (): ExtendedLanguage => {
  // Check localStorage first
  const stored = localStorage.getItem(LANGUAGE_KEY);
  if (stored) {
    return stored;
  }
  // Fall back to browser language detection
  return getBrowserLanguage();
};

// Deep flatten object to get all translatable strings
const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
  const result: Record<string, string> = {};
  
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      result[newKey] = value;
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string') {
          result[`${newKey}.${index}`] = item;
        } else if (typeof item === 'object' && item !== null) {
          Object.assign(result, flattenObject(item as Record<string, unknown>, `${newKey}.${index}`));
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    }
  }
  
  return result;
};

// Reconstruct nested object from flat key-value pairs
const unflattenObject = (flat: Record<string, string>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  
  for (const key in flat) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      const nextKey = keys[i + 1];
      const isArrayIndex = /^\d+$/.test(nextKey);
      
      if (!(k in current)) {
        current[k] = isArrayIndex ? [] : {};
      }
      current = current[k] as Record<string, unknown>;
    }
    
    const lastKey = keys[keys.length - 1];
    current[lastKey] = flat[key];
  }
  
  return result;
};

// Get cached translations
const getCachedTranslations = (lang: string): typeof translations.pt | null => {
  try {
    const cached = localStorage.getItem(`${TRANSLATION_CACHE_KEY}-${lang}`);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error('Failed to get cached translations:', e);
  }
  return null;
};

// Save translations to cache
const setCachedTranslations = (lang: string, data: typeof translations.pt) => {
  try {
    localStorage.setItem(`${TRANSLATION_CACHE_KEY}-${lang}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to cache translations:', e);
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<ExtendedLanguage>(getInitialLanguage);
  const [currentTranslations, setCurrentTranslations] = useState<typeof translations.pt>(
    translations[getInitialLanguage() as Language] || translations.en
  );
  const [isTranslating, setIsTranslating] = useState(false);

  const translateContent = useCallback(async (targetLang: string) => {
    // Check cache first
    const cached = getCachedTranslations(targetLang);
    if (cached) {
      setCurrentTranslations(cached);
      return;
    }

    setIsTranslating(true);
    
    try {
      // Use English as source for translation
      const sourceTranslations = translations.en;
      const flattened = flattenObject(sourceTranslations as unknown as Record<string, unknown>);
      const textsArray = Object.values(flattened);
      const keysArray = Object.keys(flattened);

      // Batch translate (max 50 texts per request to avoid timeouts)
      const batchSize = 50;
      const translatedFlat: Record<string, string> = {};

      for (let i = 0; i < textsArray.length; i += batchSize) {
        const batch = textsArray.slice(i, i + batchSize);
        const batchKeys = keysArray.slice(i, i + batchSize);

        const { data, error } = await supabase.functions.invoke('translate', {
          body: {
            texts: batch,
            targetLanguage: targetLang,
            sourceLanguage: 'en'
          }
        });

        if (error) {
          console.error('Translation error:', error);
          throw error;
        }

        if (data?.translations) {
          batchKeys.forEach((key, index) => {
            translatedFlat[key] = data.translations[index] || batch[index];
          });
        }
      }

      // Reconstruct the translations object
      const reconstructed = unflattenObject(translatedFlat) as typeof translations.pt;
      
      // Cache the translations
      setCachedTranslations(targetLang, reconstructed);
      setCurrentTranslations(reconstructed);

    } catch (error) {
      console.error('Failed to translate:', error);
      // Fallback to English if translation fails
      setCurrentTranslations(translations.en);
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const setLanguage = useCallback((lang: ExtendedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);

    // If it's a static language, use built-in translations
    if (STATIC_LANGUAGES.includes(lang as Language)) {
      setCurrentTranslations(translations[lang as Language]);
    } else {
      // For other languages, translate automatically
      translateContent(lang);
    }
  }, [translateContent]);

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;

    // On initial load, check if we need to translate
    if (!STATIC_LANGUAGES.includes(language as Language)) {
      const cached = getCachedTranslations(language);
      if (cached) {
        setCurrentTranslations(cached);
      } else {
        translateContent(language);
      }
    }
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: currentTranslations,
    isTranslating,
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
