import { useState } from 'react';

import { ArrowRight, Code, Rocket, Box, Layers, Github, TerminalIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscription logic would go here
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  // Key features
  const features = [
    {
      icon: <Layers className='h-10 w-10 text-primary' />,
      title: t('public.features.core.monorepo.title'),
      description: t('public.features.core.monorepo.desc')
    },
    {
      icon: <Code className='h-10 w-10 text-primary' />,
      title: t('public.features.core.typescript.title'),
      description: t('public.features.core.typescript.desc')
    },
    {
      icon: <Box className='h-10 w-10 text-primary' />,
      title: t('public.features.ui.tailwind.title'),
      description: t('public.features.ui.tailwind.desc')
    },
    {
      icon: <Rocket className='h-10 w-10 text-primary' />,
      title: t('public.features.dev.hot.title'),
      description: t('public.features.dev.hot.desc')
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background'>
        {/* Background Patterns */}
        <div className='absolute inset-0 bg-grid-black/[0.02] bg-[center_top_-1px] dark:bg-grid-white/[0.02]'></div>

        <div className='container px-4 py-24 md:py-32 lg:py-40 mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80'>
                {t('public.landing.hero.badge')}
              </div>

              <div className='space-y-4'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight'>
                  {t('public.landing.hero.title.first')}{' '}
                  <span className='text-primary'>{t('public.landing.hero.title.highlight')}</span>{' '}
                  {t('public.landing.hero.title.last')}
                </h1>
                <p className='text-xl text-muted-foreground max-w-xl'>
                  {t('public.landing.hero.subtitle')}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Button size='lg' asChild>
                  <Link to='/register'>
                    {t('public.landing.hero.cta_primary')}
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
                <Button size='lg' variant='outline' asChild>
                  <Link to='/docs'>{t('public.landing.hero.cta_secondary')}</Link>
                </Button>
              </div>
            </div>

            <div className='relative hidden lg:block'>
              <div className='absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-primary-foreground opacity-20 blur'></div>
              <div className='relative rounded-xl bg-card p-2 shadow-xl'>
                <div className='flex h-8 items-center px-4 bg-muted/50 rounded-t-lg'>
                  <TerminalIcon className='h-4 w-4 text-muted-foreground' />
                  <span className='ml-2 text-sm font-semibold text-muted-foreground'>Terminal</span>
                </div>
                <div className='mt-2 p-4 font-mono text-sm text-muted-foreground'>
                  <pre className='text-muted-foreground'>
                    <code>git clone https://github.com/haiyon/monorepo-starter.git</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-muted/50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4'>{t('public.features.everything')}</h2>
            <p className='text-xl text-muted-foreground max-w-xl mx-auto'>
              {t('public.features.everything.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <Card key={index} className='border border-border/50 bg-card/50 backdrop-blur-sm'>
                <CardHeader>
                  <div className='mb-4'>{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className='py-20 bg-background'>
        <div className='container mx-auto px-4 text-center'>
          <Github className='h-16 w-16 mx-auto mb-6 text-muted-foreground/70' />
          <h2 className='text-3xl font-bold mb-4'>Open Source</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
            This project is open source and available on GitHub. Feel free to contribute, report
            issues, or fork the repository.
          </p>
          <Button size='lg' variant='outline' className='gap-2' asChild>
            <a
              href='https://github.com/haiyon/monorepo-starter'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github className='h-5 w-5' />
              Star on GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-24 bg-muted'>
        <div className='container mx-auto px-4'>
          <div className='max-w-xl mx-auto text-center space-y-6'>
            <h2 className='text-2xl font-bold'>{t('public.landing.newsletter.title')}</h2>
            <p className='text-muted-foreground'>{t('public.landing.newsletter.subtitle')}</p>

            <form onSubmit={handleSubscribe} className='flex max-w-md mx-auto'>
              <Input
                type='email'
                placeholder={t('public.landing.newsletter.placeholder')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='rounded-r-none'
              />
              <Button type='submit' className='rounded-l-none'>
                {t('public.landing.newsletter.button')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
