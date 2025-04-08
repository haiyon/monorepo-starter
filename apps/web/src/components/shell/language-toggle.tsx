import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { languageNames, LANGUAGE_STORAGE_KEY } from '@/lib/i18n';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  };

  // Get current language flag and name for the toggle button
  const getCurrentLanguageInfo = () => {
    const lang = languageNames.find(l => l.code === currentLanguage);
    return {
      flag: getFlagEmoji(currentLanguage),
      name: lang?.name || currentLanguage
    };
  };

  const { flag, name } = getCurrentLanguageInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='flex gap-1' aria-label='Change language'>
          <span className='text-sm'>{flag}</span>
          <span className='sr-only'>{name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {languageNames.map(language => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className='flex items-center gap-2'
          >
            <span className='w-6 text-center'>{getFlagEmoji(language.code)}</span>
            <span>{language.name}</span>
            {currentLanguage === language.code && <CheckIcon className='ml-auto h-4 w-4' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Helper function to get flag emoji from language code
function getFlagEmoji(langCode: string): string {
  // Extract the base language code (for cases like 'en-US', 'zh-CN', etc.)
  const baseCode = langCode.split('-')[0].toLowerCase();

  switch (baseCode) {
    case 'en':
      return '🇺🇸';
    case 'zh':
      return '🇨🇳';
    case 'fr':
      return '🇫🇷';
    case 'es':
      return '🇪🇸';
    case 'ja':
      return '🇯🇵';
    case 'ko':
      return '🇰🇷';
    case 'de':
      return '🇩🇪';
    case 'it':
      return '🇮🇹';
    case 'ru':
      return '🇷🇺';
    case 'pt':
      return '🇵🇹';
    case 'ar':
      return '🇸🇦';
    case 'hi':
      return '🇮🇳';
    case 'tr':
      return '🇹🇷';
    case 'nl':
      return '🇳🇱';
    case 'sv':
      return '🇸🇪';
    case 'pl':
      return '🇵🇱';
    case 'vi':
      return '🇻🇳';
    default:
      return '🌐';
  }
}
