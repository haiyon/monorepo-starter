import { useEffect, useState } from 'react';

import { Moon, Sun, Computer, CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/components/shell/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely access system preferences
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which icon to display based on theme
  const renderThemeIcon = () => {
    if (!mounted) return <Sun className='h-[1.2rem] w-[1.2rem]' />;

    if (theme === 'system') {
      // For system theme, show icon based on system preference
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isSystemDark ? (
        <Moon className='h-[1.2rem] w-[1.2rem]' />
      ) : (
        <Sun className='h-[1.2rem] w-[1.2rem]' />
      );
    }

    // Otherwise show based on the selected theme
    return theme === 'dark' ? (
      <Moon className='h-[1.2rem] w-[1.2rem]' />
    ) : (
      <Sun className='h-[1.2rem] w-[1.2rem]' />
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label={t('common.toggle_theme')}>
          {renderThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')} className='flex items-center gap-2'>
          <Sun className='h-4 w-4' />
          <span>{t('common.light')}</span>
          {theme === 'light' && <CheckIcon className='ml-auto h-4 w-4' />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className='flex items-center gap-2'>
          <Moon className='h-4 w-4' />
          <span>{t('common.dark')}</span>
          {theme === 'dark' && <CheckIcon className='ml-auto h-4 w-4' />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className='flex items-center gap-2'>
          <Computer className='h-4 w-4' />
          <span>{t('common.auto')}</span>
          {theme === 'system' && <CheckIcon className='ml-auto h-4 w-4' />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
