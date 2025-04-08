import { useState } from 'react';

import { cn } from '@monorepo/utils';
import {
  Menu,
  X,
  Server,
  Key,
  Ticket,
  CreditCard,
  Users,
  BarChart2,
  FileText,
  Settings,
  HelpCircle,
  MessageCircle,
  FolderKanban
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface MobileNavProps {
  sidebarState: 'expanded' | 'collapsed' | 'hidden';
  setSidebarState: (state: 'expanded' | 'collapsed' | 'hidden') => void;
}

export function MobileNav({ sidebarState, setSidebarState }: MobileNavProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Define navigation items with icons and paths
  const navItems = [
    { icon: <BarChart2 size={18} />, label: t('header.dashboard'), path: '/dashboard' },
    {
      icon: <Server size={18} />,
      label: t('header.channel'),
      path: '/channel',
      requireAdmin: true
    },
    { icon: <Key size={18} />, label: t('header.token'), path: '/token' },
    { icon: <FolderKanban size={18} />, label: t('project.title'), path: '/project' },
    { icon: <Ticket size={18} />, label: t('header.redemption'), path: '/redemption' },
    { icon: <CreditCard size={18} />, label: t('header.topup'), path: '/topup' },
    { icon: <Users size={18} />, label: t('header.user'), path: '/user', requireAdmin: true },
    { icon: <FileText size={18} />, label: t('header.log'), path: '/log', requireAdmin: true },
    { icon: <Settings size={18} />, label: t('header.setting'), path: '/setting' },
    { icon: <HelpCircle size={18} />, label: t('header.about'), path: '/about' },
    { icon: <MessageCircle size={18} />, label: t('header.chat'), path: '/chat' }
  ];

  // Filter items based on user permissions
  const filteredNavItems = navItems.filter(item => {
    if (item.requireAdmin) {
      return false;
    }
    return true;
  });

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Toggle sidebar visibility when menu button is clicked
  const toggleSidebar = () => {
    if (sidebarState === 'hidden') {
      setSidebarState('expanded');
    } else {
      setSidebarState('hidden');
    }
  };

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        className='md:hidden'
        onClick={toggleSidebar}
        aria-label='Toggle menu'
      >
        <Menu className='h-5 w-5' />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden ml-1'
            aria-label='Show navigation'
          >
            <Menu className='h-5 w-5' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64 p-0'>
          <div className='flex h-full flex-col'>
            <div className='flex h-14 items-center border-b px-4'>
              <Link to='/' className='flex items-center' onClick={() => setOpen(false)}>
                <img
                  src={localStorage.getItem('logo') || ''}
                  alt={localStorage.getItem('system_name') || ''}
                  className='h-8 w-8 mr-2'
                />
                <span className='font-semibold text-lg'>{localStorage.getItem('system_name')}</span>
              </Link>
              <SheetClose className='ml-auto'>
                <X className='h-5 w-5' />
                <span className='sr-only'>Close</span>
              </SheetClose>
            </div>

            <ScrollArea className='flex-1 py-2 px-4'>
              <nav className='space-y-1'>
                {filteredNavItems.map(item => (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? 'secondary' : 'ghost'}
                    className='w-full justify-start'
                    asChild
                  >
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center text-sm py-2',
                        isActive(item.path) ? 'font-medium text-primary' : 'text-muted-foreground'
                      )}
                    >
                      <span className='mr-3'>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ))}
              </nav>
            </ScrollArea>

            <div className='border-t py-2 px-4'>
              <div className='flex items-center justify-between'>
                <div className='text-xs text-muted-foreground'>
                  <span>Monorepo Starter</span>
                  <span className='text-muted-foreground/60 ml-1'>
                    {localStorage.getItem('version') || 'v0.0.0'}
                  </span>
                </div>
                <Button variant='ghost' size='sm' asChild>
                  <a
                    href='https://github.com/haiyon/monorepo-starter'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs text-muted-foreground hover:text-primary transition-colors'
                  >
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
