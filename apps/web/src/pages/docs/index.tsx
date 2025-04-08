import { useState } from 'react';

import {
  Menu,
  Search,
  BookOpen,
  Rocket,
  Layers,
  Code,
  Settings,
  Server,
  Globe,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export default function DocsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar navigation items
  const navigation = [
    {
      title: t('docs.getting_started'),
      icon: <Rocket className='h-4 w-4' />,
      items: [
        { title: t('docs.introduction'), href: '/docs/introduction', active: true },
        { title: t('docs.installation'), href: '/docs/installation' },
        { title: t('docs.project_structure'), href: '/docs/project-structure' },
        { title: t('docs.configuration'), href: '/docs/configuration' }
      ]
    },
    {
      title: t('docs.core_concepts'),
      icon: <Layers className='h-4 w-4' />,
      items: [
        { title: t('docs.monorepo_structure'), href: '/docs/monorepo-structure' },
        { title: t('docs.component_library'), href: '/docs/component-library' },
        { title: t('docs.state_management'), href: '/docs/state-management' },
        { title: t('docs.routing'), href: '/docs/routing' }
      ]
    },
    {
      title: t('docs.advanced_usage'),
      icon: <Code className='h-4 w-4' />,
      items: [
        { title: t('docs.code_splitting'), href: '/docs/code-splitting' },
        { title: t('docs.performance'), href: '/docs/performance' },
        { title: t('docs.custom_hooks'), href: '/docs/custom-hooks' },
        { title: t('docs.testing'), href: '/docs/testing' }
      ]
    },
    {
      title: t('docs.deployment'),
      icon: <Server className='h-4 w-4' />,
      items: [
        { title: t('docs.build_process'), href: '/docs/build-process' },
        { title: t('docs.deployment_options'), href: '/docs/deployment-options' },
        { title: t('docs.ci_cd'), href: '/docs/ci-cd' },
        { title: t('docs.environment_variables'), href: '/docs/environment-variables' }
      ]
    },
    {
      title: t('docs.internationalization'),
      icon: <Globe className='h-4 w-4' />,
      items: [
        { title: t('docs.setting_up_i18n'), href: '/docs/setting-up-i18n' },
        { title: t('docs.translation_workflow'), href: '/docs/translation-workflow' },
        { title: t('docs.language_switching'), href: '/docs/language-switching' }
      ]
    },
    {
      title: t('docs.api_reference'),
      icon: <BookOpen className='h-4 w-4' />,
      items: [
        { title: t('docs.components_api'), href: '/docs/components-api' },
        { title: t('docs.hooks_api'), href: '/docs/hooks-api' },
        { title: t('docs.utilities_api'), href: '/docs/utilities-api' }
      ]
    }
  ];

  return (
    <div className='flex min-h-screen flex-col container mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Mobile Header */}
      <div className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='sm'>
              <Menu className='h-4 w-4' />
              <span className='sr-only'>{t('docs.toggle_menu')}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-72 pr-0'>
            <MobileNav navigation={navigation} t={t} />
          </SheetContent>
        </Sheet>
        <div className='flex-1'>
          <h1 className='text-lg font-semibold'>{t('docs.title')}</h1>
        </div>
      </div>

      <div className='grid flex-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_220px]'>
        {/* Desktop Sidebar Navigation */}
        <div className='hidden md:block'>
          <div className='sticky top-16 pt-6'>
            <div className='px-4 py-2'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder={t('docs.search.placeholder')}
                  className='pl-8'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className='h-[calc(100vh-10rem)] pb-10'>
              <div className='px-4 py-2'>
                {navigation.map((section, i) => (
                  <div key={i} className='mb-6'>
                    <h4 className='mb-2 text-sm font-semibold flex items-center gap-2'>
                      {section.icon}
                      {section.title}
                    </h4>
                    <ul className='space-y-1'>
                      {section.items.map((item, j) => (
                        <li key={j}>
                          <Link
                            to={item.href}
                            className={`block rounded-md px-3 py-2 text-sm ${
                              item.active
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'hover:bg-muted'
                            }`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main Content */}
        <div className='relative min-h-[calc(100vh-56px)]'>
          <div className='mx-auto px-4 py-6 md:px-8 lg:px-12 max-w-4xl'>
            <div className='space-y-8'>
              <div>
                <h1 className='mb-2 text-3xl font-bold'>{t('docs.introduction')}</h1>
                <p className='text-lg text-muted-foreground'>{t('docs.welcome.subtitle')}</p>
              </div>

              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>{t('docs.what_is_monorepo')}</h2>
                <p>{t('docs.what_is_monorepo.description')}</p>
                <p>{t('docs.monorepo_description')}</p>
              </div>

              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>{t('docs.key_features')}</h2>
                <ul className='space-y-2 list-disc pl-6'>
                  <li>
                    <strong>{t('docs.key_features.workspace')}</strong>
                  </li>
                  <li>
                    <strong>{t('docs.key_features.components')}</strong>
                  </li>
                  <li>
                    <strong>{t('docs.key_features.quality')}</strong>
                  </li>
                  <li>
                    <strong>{t('docs.key_features.performance')}</strong>
                  </li>
                  <li>
                    <strong>{t('docs.key_features.dx')}</strong>
                  </li>
                  <li>
                    <strong>{t('docs.key_features.i18n')}</strong>
                  </li>
                </ul>
              </div>

              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>{t('docs.why_use')}</h2>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='rounded-lg border p-4'>
                    <h3 className='text-lg font-medium mb-2 flex items-center gap-2'>
                      <Rocket className='h-5 w-5 text-primary' />
                      {t('docs.why_use.fast')}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {t('docs.why_use.fast.description')}
                    </p>
                  </div>
                  <div className='rounded-lg border p-4'>
                    <h3 className='text-lg font-medium mb-2 flex items-center gap-2'>
                      <Layers className='h-5 w-5 text-primary' />
                      {t('docs.why_use.scalable')}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {t('docs.why_use.scalable.description')}
                    </p>
                  </div>
                  <div className='rounded-lg border p-4'>
                    <h3 className='text-lg font-medium mb-2 flex items-center gap-2'>
                      <Settings className='h-5 w-5 text-primary' />
                      {t('docs.why_use.flexible')}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {t('docs.why_use.flexible.description')}
                    </p>
                  </div>
                  <div className='rounded-lg border p-4'>
                    <h3 className='text-lg font-medium mb-2 flex items-center gap-2'>
                      <BookOpen className='h-5 w-5 text-primary' />
                      {t('docs.why_use.docs')}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {t('docs.why_use.docs.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>{t('docs.tech_stack')}</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('docs.tech_stack.technology')}</TableHead>
                      <TableHead>{t('docs.tech_stack.purpose')}</TableHead>
                      <TableHead>{t('docs.tech_stack.version')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>React</TableCell>
                      <TableCell>UI Library</TableCell>
                      <TableCell>18.3.1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>TypeScript</TableCell>
                      <TableCell>Type Safety</TableCell>
                      <TableCell>5.8.2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>Vite</TableCell>
                      <TableCell>Build Tool</TableCell>
                      <TableCell>5.4.16</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>Tailwind CSS</TableCell>
                      <TableCell>Styling</TableCell>
                      <TableCell>4.0.17</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>React Router</TableCell>
                      <TableCell>Routing</TableCell>
                      <TableCell>7.4.1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>i18next</TableCell>
                      <TableCell>Internationalization</TableCell>
                      <TableCell>24.2.3</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>{t('docs.getting_started')}</h2>
                <p>{t('docs.getting_started.description')}</p>
                <div className='flex space-x-4'>
                  <Button asChild>
                    <Link to='/docs/installation'>
                      {t('docs.getting_started.installation')}
                      <ChevronRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                  <Button variant='outline' asChild>
                    <Link to='/docs/project-structure'>
                      {t('docs.getting_started.project_structure')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Content Navigation */}
            <div className='flex justify-between items-center mt-16'>
              <div></div>
              <Button asChild variant='outline'>
                <Link to='/docs/installation'>
                  {t('docs.next')}: {t('docs.installation')}
                  <ChevronRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Table of Contents (Desktop) */}
        <div className='hidden lg:block'>
          <div className='sticky top-16 pt-10'>
            <h4 className='px-6 text-sm font-semibold'>{t('docs.on_this_page')}</h4>
            <ScrollArea className='h-[calc(100vh-10rem)] pb-10'>
              <ul className='mt-2 space-y-2 px-6 py-2 text-sm'>
                <li>
                  <a
                    href='#what-is-a-monorepo'
                    className='block text-muted-foreground hover:text-foreground py-1'
                  >
                    {t('docs.what_is_monorepo')}
                  </a>
                </li>
                <li>
                  <a
                    href='#key-features'
                    className='block text-muted-foreground hover:text-foreground py-1'
                  >
                    {t('docs.key_features')}
                  </a>
                </li>
                <li>
                  <a
                    href='#why-use-this-starter-kit'
                    className='block text-primary font-medium py-1'
                  >
                    {t('docs.why_use')}
                  </a>
                </li>
                <li>
                  <a
                    href='#tech-stack'
                    className='block text-muted-foreground hover:text-foreground py-1'
                  >
                    {t('docs.tech_stack')}
                  </a>
                </li>
                <li>
                  <a
                    href='#getting-started'
                    className='block text-muted-foreground hover:text-foreground py-1'
                  >
                    {t('docs.getting_started')}
                  </a>
                </li>
              </ul>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ navigation, t }: { navigation: any[]; t: any }) {
  return (
    <ScrollArea className='h-[calc(100vh-50px)]'>
      <div className='px-2 py-6'>
        <h2 className='mb-4 text-lg font-semibold px-4'>{t('docs.title')}</h2>
        <div className='space-y-1 px-4 mb-4'>
          <div className='relative mb-4'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input type='search' placeholder={t('docs.search.placeholder')} className='pl-8' />
          </div>
        </div>
        {navigation.map((section, i) => (
          <div key={i} className='mb-6'>
            <h4 className='px-4 mb-2 text-sm font-semibold flex items-center gap-2'>
              {section.icon}
              {section.title}
            </h4>
            <ul className='space-y-1'>
              {section.items.map((item, j) => (
                <li key={j}>
                  <Link
                    to={item.href}
                    className={`block rounded-md px-8 py-2 text-sm ${
                      item.active ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
