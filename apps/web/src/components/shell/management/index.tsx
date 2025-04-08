import { useState, useEffect } from 'react';

import { cn } from '@monorepo/utils';
import { useLocation } from 'react-router-dom';

import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

import { ScrollToTop } from '@/components/scroll-to-top';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ManagementShellProps {
  children: React.ReactNode;
}

export function ManagementShell({ children }: ManagementShellProps) {
  const location = useLocation();

  // Check if screen is mobile size
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Track sidebar state: expanded, collapsed (icon only), or hidden
  const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed' | 'hidden'>(
    'collapsed'
  );

  // Track if the page is scrolled down
  const [isScrolled, setIsScrolled] = useState(false);

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    if (isMobile) {
      setSidebarState('hidden');
    } else {
      // Load user preference from localStorage if available
      const savedState = localStorage.getItem('sidebar_state');
      if (savedState && (savedState === 'expanded' || savedState === 'collapsed')) {
        setSidebarState(savedState);
      } else {
        setSidebarState('expanded');
      }
    }
  }, [isMobile]);

  // Save sidebar state preference to localStorage
  useEffect(() => {
    if (!isMobile && (sidebarState === 'expanded' || sidebarState === 'collapsed')) {
      localStorage.setItem('sidebar_state', sidebarState);
    }
  }, [sidebarState, isMobile]);

  // Handle scroll events
  useEffect(() => {
    const mainContent = document.querySelector('.management-content') as HTMLDivElement;
    const handleScroll = () => {
      if (mainContent) {
        setIsScrolled(mainContent.scrollTop > 10);
      }
    };
    mainContent?.addEventListener('scroll', handleScroll);
    return () => mainContent?.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll position when route changes
  useEffect(() => {
    const mainContent = document.querySelector('.management-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className='flex h-screen flex-col bg-gray-100/80 dark:bg-gray-900 transition-all duration-300 ease-in-out'>
      <Header
        sidebarState={sidebarState}
        setSidebarState={setSidebarState}
        isScrolled={isScrolled}
        systemName={'Monorepo Starter'}
      />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar isMobile={isMobile} state={sidebarState} setState={setSidebarState} />

        <main
          className={cn(
            'management-content flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out',
            isMobile ? 'm-2.5' : 'mb-2.5 mr-2.5'
          )}
        >
          <div
            className={cn(
              'flex-1 overflow-y-auto rounded-lg border border-gray-200/80 dark:border-gray-800 p-4 bg-background',
              isScrolled && 'shadow-md'
            )}
          >
            <div className='container'>{children}</div>
          </div>
          <Footer compact={isMobile} />
        </main>
      </div>

      <ScrollToTop />
    </div>
  );
}
