import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enManagement from './locales/en/management.json';
import enPublic from './locales/en/public.json';
import zhManagement from './locales/zh/management.json';
import zhPublic from './locales/zh/public.json';

// Translations resources
const resources = {
  en: {
    translation: {
      ...enManagement,
      ...enPublic
    }
  },
  zh: {
    translation: {
      ...zhManagement,
      ...zhPublic
    }
  }
};

// Storage key
export const LANGUAGE_STORAGE_KEY = 'language';

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    // Default language
    fallbackLng: 'en',
    // Don't escape special HTML characters
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY
    },
    react: {
      useSuspense: false, // Prevents Suspense during language changes
      bindI18n: 'languageChanged', // Re-renders components on language change
      bindI18nStore: 'added removed' // Re-renders when resources change
    }
  });

/**
 * List of supported languages
 */
export const languageNames: { code: string; name: string }[] = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'zh',
    name: '中文 (Chinese)'
  }
];

export default i18n;
