import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Footer } from './footer';
import { PublicNavbar } from './navbar';

import { ScrollToTop } from '@/components/scroll-to-top';

export function PublicShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-gray-950'>
      <PublicNavbar />
      <main className='flex-1'>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
