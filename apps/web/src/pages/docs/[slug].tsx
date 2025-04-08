import { useState, useEffect } from 'react';

import type { TFunction } from 'i18next';
import { Menu, Search, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Sample documentation data
const documentationContent = (t: TFunction) => ({
  installation: {
    title: 'Installation',
    description: 'Learn how to install and set up the Monorepo Starter Kit',
    lastUpdated: '2025-03-01',
    content: `
      <h2 id="prerequisites">${t('docs.prerequisites')}</h2>
      <p>${t('docs.installation.prerequisites')}</p>
      <ul>
        <li>Node.js (v18.0.0 or higher)</li>
        <li>pnpm (v8.0.0 or higher)</li>
        <li>Git</li>
      </ul>

      <div class="not-prose">
        <div class="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20 my-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <AlertTriangle class="h-5 w-5 text-amber-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-amber-800 dark:text-amber-600">${t('docs.note')}</h3>
              <div class="mt-2 text-sm text-amber-700 dark:text-amber-500">
                <p>${t('docs.installation.note.content')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 id="installation-options">${t('docs.installation_options')}</h2>
      <p>${t('docs.installation.options')}</p>

      <h3 id="option-1-using-create-monorepo">${t('docs.using_create_monorepo')}</h3>
      <p>${t('docs.installation.option1.desc')}</p>

      <pre><code>npx create-monorepo my-app</code></pre>

      <p>${t('docs.installation.option1.after')}</p>

      <pre><code>cd my-app
pnpm dev</code></pre>

      <h3 id="option-2-cloning-the-repository">${t('docs.cloning_repository')}</h3>
      <p>${t('docs.installation.option2.desc')}</p>

      <pre><code>git clone https://github.com/haiyon/monorepo-starter.git my-app
cd my-app
pnpm install
pnpm dev</code></pre>

      <div class="not-prose">
        <div class="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20 my-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <Info class="h-5 w-5 text-blue-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800 dark:text-blue-600">${t('docs.tip')}</h3>
              <div class="mt-2 text-sm text-blue-700 dark:text-blue-500">
                <p>${t('docs.installation.tip.content')}</p>
                <pre class="mt-2"><code>git remote set-url origin your-repository-url</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 id="project-structure">${t('docs.project_structure')}</h2>
      <p>${t('docs.installation.structure')}</p>

      <pre><code>my-app/
├── apps/
│   └── web/               # Main web application
├── packages/
│   ├── ui/                # Shared UI components
│   ├── utils/             # Shared utilities
│   └── types/             # Shared TypeScript types
├── config/                # Shared configuration files
├── pnpm-workspace.yaml    # Workspace configuration
└── package.json           # Root package.json</code></pre>

      <h2 id="available-scripts">${t('docs.available_scripts')}</h2>
      <p>${t('docs.installation.scripts')}</p>

      <h3 id="root-scripts">${t('docs.root_scripts')}</h3>
      <ul>
        <li><code>pnpm dev</code> - ${t('docs.installation.root_scripts.dev')}</li>
        <li><code>pnpm build</code> - ${t('docs.installation.root_scripts.build')}</li>
        <li><code>pnpm lint</code> - ${t('docs.installation.root_scripts.lint')}</li>
        <li><code>pnpm test</code> - ${t('docs.installation.root_scripts.test')}</li>
      </ul>

      <h3 id="application-specific-scripts">${t('docs.app_specific_scripts')}</h3>
      <p>${t('docs.installation.app_scripts.desc')}</p>

      <pre><code>pnpm --filter web dev     # Start development server for the web app
pnpm --filter ui build   # Build the UI package</code></pre>
<h2 id="configuration">${t('docs.configuration')}</h2>
      <p>${t('docs.installation.config')}</p>

      <h3 id="environment-variables">${t('docs.environment_variables')}</h3>
      <p>${t('docs.installation.env')}</p>

      <pre><code># .env
VITE_APP_NAME=My App
VITE_APP_VERSION=0.1.0
VITE_API_URL=http://localhost:3000/api</code></pre>

      <h3 id="tailwind-configuration">${t('docs.tailwind_config')}</h3>
      <p>${t('docs.installation.tailwind')}</p>

      <h2 id="whats-next">${t('docs.whats_next')}</h2>
      <p>${t('docs.installation.next')}</p>

      <ul>
        <li><a href="/docs/project-structure">${t('docs.project_structure')}</a> - ${t('docs.project_structure.description')}</li>
        <li><a href="/docs/component-library">${t('docs.component_library')}</a> - ${t('docs.component_library.description')}</li>
        <li><a href="/docs/routing">${t('docs.routing')}</a> - ${t('docs.routing.description')}</li>
      </ul>
    `,
    next: 'project-structure',
    prev: 'introduction'
  },
  'project-structure': {
    title: 'Project Structure',
    description: 'Understanding the organization of the Monorepo Starter Kit',
    lastUpdated: '2025-02-20',
    content: `
      <h2 id="overview">${t('docs.overview')}</h2>
      <p>${t('docs.project_structure.overview')}</p>

      <h2 id="directory-structure">${t('docs.directory_structure')}</h2>
      <p>${t('docs.project_structure.directory')}</p>

      <pre><code>monorepo-starter/
├── apps/              # Application folders
├── packages/          # Shared packages
├── config/            # Shared configuration
├── docs/              # Documentation
├── scripts/           # Build and utility scripts
├── package.json       # Root package configuration
└── pnpm-workspace.yaml  # Workspace definition</code></pre>

      <h2 id="apps-directory">${t('docs.apps_directory')}</h2>
      <p>${t('docs.project_structure.apps')}</p>

      <pre><code>apps/
├── web/              # Main web application
│   ├── public/       # Static assets
│   ├── src/          # Application source code
│   ├── vite.config.ts  # Vite configuration
│   └── package.json  # Application dependencies
└── admin/            # Admin dashboard (optional)
    ├── public/
    ├── src/
    └── package.json</code></pre>

      <h2 id="packages-directory">${t('docs.packages_directory')}</h2>
      <p>${t('docs.project_structure.packages')}</p>

      <pre><code>packages/
├── ui/               # Shared UI components
│   ├── src/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   └── ...
│   │   └── index.ts  # Package entry point
│   └── package.json
├── utils/            # Utility functions
│   ├── src/
│   └── package.json
└── types/            # Shared TypeScript types
    ├── src/
    └── package.json</code></pre>

      <h2 id="application-structure">${t('docs.application_structure')}</h2>
      <p>${t('docs.project_structure.app_structure')}</p>

      <pre><code>web/
├── public/           # Static assets
├── src/
│   ├── assets/       # Application assets (images, styles)
│   ├── components/   # Application-specific components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Application-specific libraries
│   │   ├── api/      # API client and utilities
│   │   ├── i18n/     # Internationalization
│   │   └── utils/    # Utility functions
│   ├── pages/        # Application pages
│   ├── router/       # Routing configuration
│   └── main.tsx      # Application entry point
├── .env.example      # Example environment variables
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies</code></pre>

      <h2 id="configuration-files">${t('docs.configuration_files')}</h2>
      <p>${t('docs.project_structure.config_files')}</p>

      <ul>
        <li><code>package.json</code> - ${t('docs.project_structure.config_files.package')}</li>
        <li><code>pnpm-workspace.yaml</code> - ${t('docs.project_structure.config_files.workspace')}</li>
        <li><code>tsconfig.json</code> - ${t('docs.project_structure.config_files.typescript')}</li>
        <li><code>.eslintrc</code> - ${t('docs.project_structure.config_files.eslint')}</li>
        <li><code>.prettierrc</code> - ${t('docs.project_structure.config_files.prettier')}</li>
      </ul>

      <h2 id="dependency-management">${t('docs.dependency_management')}</h2>
      <p>${t('docs.project_structure.dependency')}</p>

      <ul>
        <li>${t('docs.project_structure.dependency.desc1')}</li>
        <li>${t('docs.project_structure.dependency.desc2')}</li>
        <li>${t('docs.project_structure.dependency.desc3')}</li>
      </ul>

      <pre><code>{
  "dependencies": {
    "@monorepo/ui": "workspace:*",
    "@monorepoutils": "workspace:*"
  }
}</code></pre>

      <div class="not-prose">
        <div class="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20 my-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <Info class="h-5 w-5 text-blue-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800 dark:text-blue-600">${t('docs.project_structure.best_practice.title')}</h3>
              <div class="mt-2 text-sm text-blue-700 dark:text-blue-500">
                <p>${t('docs.project_structure.best_practice.content')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    next: 'configuration',
    prev: 'installation'
  }
});

export default function DocsDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sidebar navigation items (same as in Docs index)
  const navigation = [
    {
      title: t('docs.getting_started'),
      icon: <BookOpen className='h-4 w-4' />,
      items: [
        { title: t('docs.introduction'), href: '/docs/introduction' },
        {
          title: t('docs.installation'),
          href: '/docs/installation',
          active: slug === 'installation'
        },
        {
          title: t('docs.project_structure'),
          href: '/docs/project-structure',
          active: slug === 'project-structure'
        },
        { title: t('docs.configuration'), href: '/docs/configuration' }
      ]
    },
    {
      title: t('docs.core_concepts'),
      icon: <BookOpen className='h-4 w-4' />,
      items: [
        { title: t('docs.monorepo_structure'), href: '/docs/monorepo-structure' },
        { title: t('docs.component_library'), href: '/docs/component-library' },
        { title: t('docs.state_management'), href: '/docs/state-management' },
        { title: t('docs.routing'), href: '/docs/routing' }
      ]
    },
    {
      title: t('docs.advanced_usage'),
      icon: <BookOpen className='h-4 w-4' />,
      items: [
        { title: t('docs.code_splitting'), href: '/docs/code-splitting' },
        { title: t('docs.performance'), href: '/docs/performance' },
        { title: t('docs.custom_hooks'), href: '/docs/custom-hooks' },
        { title: t('docs.testing'), href: '/docs/testing' }
      ]
    },
    {
      title: t('docs.deployment'),
      icon: <BookOpen className='h-4 w-4' />,
      items: [
        { title: t('docs.build_process'), href: '/docs/build-process' },
        { title: t('docs.deployment_options'), href: '/docs/deployment-options' },
        { title: t('docs.ci_cd'), href: '/docs/ci-cd' },
        { title: t('docs.environment_variables'), href: '/docs/environment-variables' }
      ]
    }
  ];

  // Extract headings from content to build table of contents
  const extractHeadings = (content: string) => {
    const headings: { id: string; title: string; level: number }[] = [];
    const regex = /<h([2-3])\s+id="([\w-]+)">(.*?)<\/h\1>/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const id = match[2];
      const title = match[3];
      headings.push({ id, title, level });
    }

    return headings;
  };

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      const doc = documentationContent(t)[slug as keyof typeof documentationContent];
      if (!doc) {
        setDoc('No content found');
      }
      setDoc(doc);
      setLoading(false);
    }, 300);
  }, [slug]);

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col'>
        <div className='grid flex-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_220px]'>
          <div className='hidden border-r md:block bg-muted/20'>
            <div className='h-full' />
          </div>
          <div className='relative min-h-[calc(100vh-56px)]'>
            <div className='mx-auto px-4 py-6 md:px-8 lg:px-12 max-w-4xl'>
              <div className='animate-pulse'>
                <div className='h-10 bg-muted rounded w-3/4 mb-4'></div>
                <div className='h-4 bg-muted rounded w-1/4 mb-8'></div>
                <div className='h-4 bg-muted rounded w-full mb-2'></div>
                <div className='h-4 bg-muted rounded w-full mb-2'></div>
                <div className='h-4 bg-muted rounded w-2/3 mb-8'></div>
                <div className='h-8 bg-muted rounded w-1/2 mb-4'></div>
                <div className='h-4 bg-muted rounded w-full mb-2'></div>
                <div className='h-4 bg-muted rounded w-full mb-2'></div>
                <div className='h-4 bg-muted rounded w-3/4 mb-8'></div>
              </div>
            </div>
          </div>
          <div className='hidden lg:block border-l bg-muted/20'>
            <div className='h-full' />
          </div>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-3xl font-bold mb-4'>{t('docs.not_found')}</h1>
        <p className='text-muted-foreground mb-8'>{t('docs.not_found.description')}</p>
        <Button asChild>
          <Link to='/docs'>
            <ChevronLeft className='mr-2 h-4 w-4' />
            {t('docs.back_to_docs')}
          </Link>
        </Button>
      </div>
    );
  }

  const headings = extractHeadings(doc.content);

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
          <h1 className='text-lg font-semibold'>{doc.title}</h1>
        </div>
      </div>

      <div className='grid flex-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_220px]'>
        {/* Desktop Sidebar Navigation */}
        <div className='hidden border-r md:block'>
          <div className='sticky top-16 pt-6'>
            <div className='px-4 py-2'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input type='search' placeholder={t('docs.search.placeholder')} className='pl-8' />
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
            <div className='space-y-2'>
              <h1 className='scroll-m-20 text-4xl font-bold'>{doc.title}</h1>
              <p className='text-lg text-muted-foreground'>{doc.description}</p>
              <div className='flex items-center text-sm text-muted-foreground'>
                <span>
                  {t('blog.post.last_updated')}: {new Date(doc.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Separator className='my-6' />

            <div className='prose prose-neutral dark:prose-invert max-w-none'>
              <div dangerouslySetInnerHTML={{ __html: doc.content }} />

              {/* Custom styling for code blocks */}
              <style jsx global>{`
                .prose pre {
                  position: relative;
                  background-color: hsl(var(--muted));
                  border-radius: 0.5rem;
                  overflow: hidden;
                }

                .prose pre code {
                  display: block;
                  padding: 1rem;
                  overflow-x: auto;
                }

                .prose .not-prose {
                  margin-top: 2rem;
                  margin-bottom: 2rem;
                }

                .prose h2 {
                  scroll-margin-top: 6rem;
                }

                .prose h3 {
                  scroll-margin-top: 6rem;
                }
              `}</style>
            </div>

            {/* Navigation between pages */}
            <div className='mt-12 flex items-center justify-between border-t pt-6'>
              {doc.prev ? (
                <Button variant='outline' asChild>
                  <Link to={`/docs/${doc.prev}`}>
                    <ChevronLeft className='mr-2 h-4 w-4' />
                    {t('docs.previous')}
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}

              {doc.next && (
                <Button asChild>
                  <Link to={`/docs/${doc.next}`}>
                    {t('docs.next')}
                    <ChevronRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Table of Contents (Desktop) */}
        <div className='hidden lg:block border-l'>
          <div className='sticky top-16 pt-10'>
            <h4 className='px-6 text-sm font-semibold'>{t('docs.toc')}</h4>
            <ScrollArea className='h-[calc(100vh-10rem)] pb-10'>
              <ul className='mt-2 space-y-1 px-6 py-2 text-sm'>
                {headings.map((heading, index) => (
                  <li key={index} style={{ marginLeft: (heading.level - 2) * 12 + 'px' }}>
                    <a
                      href={`#${heading.id}`}
                      className={`block text-muted-foreground hover:text-foreground py-1 ${
                        heading.level > 2 ? 'text-xs' : ''
                      }`}
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
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
