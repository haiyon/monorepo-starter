import { useState } from 'react';

import { cn } from '@monorepo/utils';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  PlusCircle,
  Settings,
  CheckIcon,
  HomeIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { LanguageToggle } from '../language-toggle';
import { ThemeToggle } from '../theme-toggle';

import { UserNav } from './user-nav';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface HeaderProps {
  sidebarState: 'expanded' | 'collapsed' | 'hidden';
  setSidebarState: (state: 'expanded' | 'collapsed' | 'hidden') => void;
  isScrolled?: boolean;
  systemName?: string;
  logo?: string;
}

export function Header({
  sidebarState,
  setSidebarState,
  isScrolled = false,
  systemName,
  logo
}: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);

  // Simulated data for organization and projects
  const currentOrganization = { id: 'p', name: 'Personal' };
  const currentProject = { id: 'default', name: 'Default project' };

  // Sample projects list
  const projects = [
    { id: 'default', name: 'Default project' },
    { id: 'monorepo', name: 'Monorepo Starter' }
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-shadow duration-200',
        isScrolled && 'shadow-xs'
      )}
    >
      <div className='flex h-12 items-center px-4'>
        {/* Mobile menu button */}
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setSidebarState(sidebarState === 'hidden' ? 'expanded' : 'hidden')}
          className='md:hidden'
          aria-label='Toggle menu'
        >
          <Menu className='h-5 w-5' />
        </Button>

        {/* Organization and Project Selector */}
        <div className='flex items-center space-x-1'>
          {/* Organization Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <div className='flex items-center space-x-2'>
                {/* <div className="flex h-6 w-6 items-center text-sm justify-center rounded-md bg-gray-800 text-white">
                  <span>{currentOrganization.id.charAt(0).toUpperCase()}</span>
                </div> */}
                {logo && (
                  <Link to='/' className='flex items-center'>
                    <img src={logo} alt={systemName} className='h-5 dark:invert' />
                  </Link>
                )}
                <Button
                  variant='ghost'
                  className='flex items-center h-auto px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800'
                >
                  <span className=' font-medium'>{currentOrganization.name}</span>
                  <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent align='start' className='p-0'>
              <div className='p-4'>
                <h3 className='text-lg font-medium'>Organization</h3>
                <p className='text-sm text-muted-foreground'>Select or manage your organization</p>
              </div>
            </PopoverContent>
          </Popover>

          <span className='text-gray-400'>/</span>

          {/* Project Selector */}
          <Popover open={projectsMenuOpen} onOpenChange={setProjectsMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className='flex items-center h-auto px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800'
              >
                <span className='font-medium'>{currentProject.name}</span>
                <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='max-w-max p-0'>
              <div className='max-h-[300px] text-sm overflow-auto px-2'>
                {projects.map(project => (
                  <div
                    key={project?.id}
                    className={cn(
                      'flex items-center p-2 my-2 hover:bg-muted/50 rounded-md cursor-pointer',
                      project.id === currentProject.id ? 'bg-muted/50' : ''
                    )}
                    onClick={() => setProjectsMenuOpen(false)}
                  >
                    {project?.id === currentProject.id && <CheckIcon className='mr-2 h-4 w-4' />}
                    <span className={project?.id === currentProject.id ? 'ml-2' : 'ml-8'}>
                      {project?.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className='mx-2 py-2 border-t'>
                <Button
                  variant='ghost'
                  className='w-full justify-start hover:bg-muted/50'
                  onClick={() => {
                    setProjectsMenuOpen(false);
                    navigate('/project/new');
                  }}
                >
                  <PlusCircle className='mr-2 h-4 w-4' />
                  {t('project.add_project')}
                </Button>
                <Button
                  variant='ghost'
                  className='w-full justify-start hover:bg-muted/50'
                  onClick={() => {
                    setProjectsMenuOpen(false);
                    navigate('/project');
                  }}
                >
                  <Settings className='mr-2 h-4 w-4' />
                  {t('project.management')}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right side items */}
        <div className='ml-auto flex items-center space-x-1'>
          <Button
            asChild
            variant='link'
            size='sm'
            className='mt-1 text-muted-foreground'
            title={t('common.back') + t('public.nav.home')}
          >
            <Link to='/home'>
              <HomeIcon className='h-4 w-4 mr-2' />
            </Link>
          </Button>
          {/* Search (hidden on mobile) */}
          <div className='hidden md:flex flex-1 max-w-md'>
            <div className='relative w-full mr-3'>
              <Search className='absolute left-2.5 top-2 h-4 w-4 text-muted-foreground/50' />
              <Input
                type='search'
                placeholder={t('common.search')}
                className='pl-8 bg-transparent border-muted-foreground/25 h-8 !!py-2 rounded-full'
              />
            </div>
          </div>
          {/* Theme toggle */}
          <ThemeToggle />
          {/* Language toggle */}
          <LanguageToggle />
          {/* Notifications (placeholder) */}
          <Button variant='ghost' size='icon' aria-label='Notifications'>
            <Bell className='h-5 w-5' />
          </Button>
          {/* User menu */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
