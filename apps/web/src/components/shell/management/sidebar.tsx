import { useState, useEffect } from 'react';

import { cn } from '@monorepo/utils';
import { ChevronLeft, ChevronRight, Pin, Gauge, PinOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  isMobile?: boolean;
  state: 'expanded' | 'collapsed' | 'hidden';
  setState: (state: 'expanded' | 'collapsed' | 'hidden') => void;
}

export function Sidebar({ isMobile = false, state, setState }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [favorites, setFavorites] = useState<string[]>([]);
  const id = 'monorepo'; // Replace with your actual user ID
  const SIDEBAR_FAVORITES_STORAGE_KEY = `${id}:sidebar_favorites`;
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem(SIDEBAR_FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse sidebar favorites', e);
        setFavorites([]);
      }
    }
  }, [id]);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(SIDEBAR_FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
  };

  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => {
    if (state === 'expanded') {
      setState('collapsed');
    } else if (state === 'collapsed') {
      setState('expanded');
    }
  };

  // Toggle favorite status for a navigation item
  const toggleFavorite = (path: string) => {
    if (favorites.includes(path)) {
      saveFavorites(favorites.filter(fav => fav !== path));
    } else {
      saveFavorites([...favorites, path]);
    }
  };

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Define navigation items with icons and paths
  const navItems = [
    {
      icon: <Gauge size={16} />,
      label: t('header.dashboard'),
      path: '/dashboard',
      requireAdmin: false
    }
  ];

  // Filter items based on user permissions
  const filteredNavItems = navItems.filter(item => {
    if (item.requireAdmin) {
      return false;
    }
    return true;
  });

  // Get favorite items
  const favoriteItems = filteredNavItems.filter(item => favorites.includes(item.path));

  // Apply different classes for different states
  const sidebarClasses = cn(
    'h-full transition-all duration-300 ease-in-out overflow-hidden',
    state === 'expanded' ? 'w-40' : state === 'collapsed' ? 'w-14' : 'w-0',
    !isMobile && 'flex flex-col',
    isMobile &&
      'fixed inset-y-0 left-0 z-50 py-16 flex flex-col shadow-lg bg-white dark:bg-gray-900',
    isMobile && state === 'hidden' && '-translate-x-full'
  );

  return (
    <aside className={sidebarClasses}>
      {isMobile && state !== 'hidden' && (
        <div className='absolute top-3 right-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setState('hidden')}
            aria-label='Close sidebar'
          >
            <ChevronLeft size={16} />
          </Button>
        </div>
      )}

      <div className='flex-1 overflow-hidden flex flex-col'>
        <ScrollArea className='flex-1'>
          {/* Favorites section (if any favorites exist) */}
          {favoriteItems.length > 0 && (
            <div className='px-3'>
              {state === 'expanded' && (
                <h3 className='hidden mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                  {t('sidebar.favorites')}
                </h3>
              )}
              <nav className='space-y-1'>
                {favoriteItems.map(item => (
                  <NavItem
                    key={`fav-${item.path}`}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isActive={isActive(item.path)}
                    collapsed={state === 'collapsed'}
                    onFavoriteToggle={() => toggleFavorite(item.path)}
                    isFavorite={true}
                  />
                ))}
              </nav>
            </div>
          )}

          {favoriteItems.length > 0 && (
            <div className='my-2 px-3'>
              <div className='h-px bg-border' />
            </div>
          )}

          {/* Main navigation */}
          <div className='px-3 py-2'>
            {state === 'expanded' && (
              <h3 className='hidden mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                {t('sidebar.navigations')}
              </h3>
            )}
            <nav className='space-y-1'>
              {filteredNavItems
                .filter(item => !favorites.includes(item.path))
                .map(item => (
                  <NavItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isActive={isActive(item.path)}
                    collapsed={state === 'collapsed'}
                    onFavoriteToggle={() => toggleFavorite(item.path)}
                    isFavorite={favorites.includes(item.path)}
                  />
                ))}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Sidebar toggle button */}
      {!isMobile && (
        <div className='sticky bottom-0 flex p-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleSidebar}
            className={cn(state === 'collapsed' ? 'mx-auto' : 'ml-auto')}
            aria-label={state === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {state === 'collapsed' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
      )}
    </aside>
  );
}

// Navigation item component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  collapsed: boolean;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

function NavItem({
  icon,
  label,
  path,
  isActive,
  collapsed,
  onFavoriteToggle,
  isFavorite
}: NavItemProps) {
  const { t } = useTranslation();

  const content = (
    <Link
      to={path}
      className={cn(
        'group flex items-center rounded-md py-2 px-3 text-sm transition-colors',
        isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        collapsed && 'justify-center px-2'
      )}
    >
      <span className={cn('text-current', collapsed ? '' : 'mr-3')}>{icon}</span>
      {!collapsed && <span className='flex-1 truncate'>{label}</span>}
      {!collapsed && (
        <Button
          variant='ghost'
          size='icon'
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle();
          }}
          className='h-3 w-3 mx-1 text-xs opacity-0 group-hover:opacity-100 hover:cursor-pointer text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'
          aria-label={isFavorite ? t('sidebar.remove_favorite') : t('sidebar.add_favorite')}
        >
          {isFavorite ? (
            <PinOff className='rotate-45' size={12} />
          ) : (
            <Pin className='rotate-45' size={12} />
          )}
        </Button>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side='right'>
            <div className='flex items-center'>
              <span>{label}</span>
              <Button
                variant='ghost'
                size='icon'
                onClick={e => {
                  e.stopPropagation();
                  onFavoriteToggle();
                }}
                className='hidden h-4 w-4 text-xs hover:cursor-pointer text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'
                aria-label={isFavorite ? t('sidebar.remove_favorite') : t('sidebar.add_favorite')}
              >
                {isFavorite ? (
                  <PinOff className='h-1.5 w-1.5 rotate-45' />
                ) : (
                  <Pin className='h-1.5 w-1.5 rotate-45' />
                )}
              </Button>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
