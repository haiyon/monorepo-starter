import React, { useState, useEffect } from 'react';

import { cn } from '@monorepo/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { ThemeToggle } from '../theme-toggle';

import { LanguageToggle } from '@/components/shell/language-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// interface PublicNavbarProps {}

export function PublicNavbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Get system name and logo
  const systemName = 'Monorepo Starter';

  // Navigation items for public pages with dropdown menus
  const navItems: any[] = [
    {
      href: '/features',
      label: t('public.nav.features'),
      dropdown: false
    },
    {
      href: '/pricing',
      label: t('public.nav.pricing'),
      dropdown: false
    },
    { href: '/docs', label: t('public.nav.docs') },
    {
      label: t('public.nav.company'),
      dropdown: true,
      items: [
        { href: '/about', label: t('public.nav.about') },
        { href: '/contact', label: t('public.nav.contact') },
        { href: '/blog', label: t('public.nav.blog') }
      ]
    }
  ];

  // Handle scroll events to change header appearance
  useEffect(() => {
    const mainContent = document.body || document.documentElement;
    const handleScroll = () => {
      if (mainContent) {
        setScrolled(mainContent.scrollTop > 10);
      }
    };
    mainContent.addEventListener('scroll', handleScroll);
    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if a route is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Check if any dropdown item is active
  const isDropdownActive = (items: any[]) => {
    return items.some(item => isActive(item.href));
  };

  // TODO: Add authentication
  const isAuthenticated = false;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-shadow duration-200',
        (scrolled || mobileMenuOpen) &&
          'bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-2px_rgba(0,0,0,0.03)] border-b border-gray-100 dark:border-gray-800'
      )}
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className={`flex h-16 items-center justify-between transition-all duration-200 ${scrolled ? 'h-14!' : ''}`}
        >
          {/* Logo and site name */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center'>
              <span className='ml-3 text-lg font-bold text-gray-900 dark:text-white'>
                {systemName}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className='hidden md:flex items-center space-x-1'>
            {navItems.map((item, i) =>
              item.dropdown ? (
                <DropdownMenu key={i}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className={cn(
                        'flex items-center gap-1 h-auto px-2 py-1.5 text-sm font-medium transition-colors',
                        isDropdownActive(item.items)
                          ? 'text-primary'
                          : 'text-gray-700 dark:text-gray-200'
                      )}
                    >
                      {item.label}
                      <ChevronDown className='h-4 w-4 opacity-50' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='center' className='min-w-[180px]'>
                    {item.items.map((subItem: any, subIndex: number) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link
                          to={subItem.href}
                          className={cn(
                            'w-full my-0.5 rounded-md!',
                            isActive(subItem.href) && 'bg-primary/10 text-primary'
                          )}
                        >
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={i}
                  to={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors hover:text-primary',
                    isActive(item.href) ? 'text-primary' : 'text-gray-700 dark:text-gray-200'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side buttons */}
          <div className='flex items-center space-x-2'>
            {/* Theme toggle */}
            <ThemeToggle />
            {/* Language toggle */}
            <LanguageToggle />

            {/* Auth buttons */}
            <div className='hidden md:flex items-center space-x-2'>
              {isAuthenticated ? (
                <Button asChild>
                  <Link to='/dashboard'>{t('public.nav.dashboard')}</Link>
                </Button>
              ) : (
                <>
                  <Button variant='ghost' size='sm' asChild>
                    <Link to='/login'>{t('public.nav.login')}</Link>
                  </Button>
                  <Button size='sm' asChild>
                    <Link to='/register'>{t('public.nav.signup')}</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden h-9 w-9'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className='h-5 w-5' aria-hidden='true' />
              ) : (
                <Menu className='h-5 w-5' aria-hidden='true' />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-200 ease-in-out overflow-hidden',
          mobileMenuOpen ? 'max-h-[500px] border-t border-gray-200 dark:border-gray-800' : 'max-h-0'
        )}
      >
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <nav className='flex flex-col space-y-4'>
            {navItems.map((item, i) =>
              item.dropdown ? (
                <div key={i} className='space-y-2'>
                  <div className='font-medium text-sm'>{item.label}</div>
                  <div className='pl-4 space-y-2'>
                    {item.items.map((subItem: any, subIndex: number) => (
                      <Link
                        key={subIndex}
                        to={subItem.href}
                        className={cn(
                          'block text-sm',
                          isActive(subItem.href)
                            ? 'text-primary font-medium'
                            : 'text-gray-700 dark:text-gray-200'
                        )}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={i}
                  to={item.href}
                  className={cn(
                    'block text-sm font-medium',
                    isActive(item.href) ? 'text-primary' : 'text-gray-700 dark:text-gray-200'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className='pt-4 border-t mt-4'>
              {isAuthenticated ? (
                <Button className='w-full' asChild>
                  <Link to='/dashboard'>{t('public.nav.dashboard')}</Link>
                </Button>
              ) : (
                <div className='space-y-2'>
                  <Button variant='outline' className='w-full' asChild>
                    <Link to='/login'>{t('public.nav.login')}</Link>
                  </Button>
                  <Button className='w-full' asChild>
                    <Link to='/register'>{t('public.nav.signup')}</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
