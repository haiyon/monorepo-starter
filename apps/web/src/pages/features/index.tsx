import {
  BookOpen,
  Code,
  Globe,
  Layers,
  Moon,
  Palette,
  RefreshCw,
  Shield,
  Smartphone,
  Zap,
  ServerIcon,
  LayoutDashboard
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FeaturesPage() {
  const { t } = useTranslation();

  // Feature categories
  const featureCategories = [
    {
      title: t('public.features.categories.core'),
      description: t('public.features.categories.core.desc'),
      features: [
        {
          icon: <Layers className='h-8 w-8 text-primary' />,
          title: t('public.features.core.monorepo.title'),
          description: t('public.features.core.monorepo.desc')
        },
        {
          icon: <Zap className='h-8 w-8 text-primary' />,
          title: t('public.features.core.vite.title'),
          description: t('public.features.core.vite.desc')
        },
        {
          icon: <Code className='h-8 w-8 text-primary' />,
          title: t('public.features.core.typescript.title'),
          description: t('public.features.core.typescript.desc')
        }
      ]
    },
    {
      title: t('public.features.categories.ui'),
      description: t('public.features.categories.ui.desc'),
      features: [
        {
          icon: <Palette className='h-8 w-8 text-primary' />,
          title: t('public.features.ui.tailwind.title'),
          description: t('public.features.ui.tailwind.desc')
        },
        {
          icon: <Moon className='h-8 w-8 text-primary' />,
          title: t('public.features.ui.darkmode.title'),
          description: t('public.features.ui.darkmode.desc')
        },
        {
          icon: <Shield className='h-8 w-8 text-primary' />,
          title: t('public.features.ui.accessibility.title'),
          description: t('public.features.ui.accessibility.desc')
        }
      ]
    },
    {
      title: t('public.features.categories.dev'),
      description: t('public.features.categories.dev.desc'),
      features: [
        {
          icon: <RefreshCw className='h-8 w-8 text-primary' />,
          title: t('public.features.dev.hot.title'),
          description: t('public.features.dev.hot.desc')
        },
        {
          icon: <ServerIcon className='h-8 w-8 text-primary' />,
          title: t('public.features.dev.api.title'),
          description: t('public.features.dev.api.desc')
        },
        {
          icon: <LayoutDashboard className='h-8 w-8 text-primary' />,
          title: t('public.features.dev.dashboard.title'),
          description: t('public.features.dev.dashboard.desc')
        }
      ]
    },
    {
      title: t('public.features.categories.int'),
      description: t('public.features.categories.int.desc'),
      features: [
        {
          icon: <Globe className='h-8 w-8 text-primary' />,
          title: t('public.features.int.i18n.title'),
          description: t('public.features.int.i18n.desc')
        },
        {
          icon: <Smartphone className='h-8 w-8 text-primary' />,
          title: t('public.features.int.responsive.title'),
          description: t('public.features.int.responsive.desc')
        },
        {
          icon: <BookOpen className='h-8 w-8 text-primary' />,
          title: t('public.features.int.docs.title'),
          description: t('public.features.int.docs.desc')
        }
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='py-20 bg-muted/30'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-6'>{t('public.features.title')}</h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            {t('public.features.subtitle')}
          </p>
          <div className='flex justify-center gap-4'>
            <Button asChild>
              <Link to='/register'>{t('public.features.cta.primary')}</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link to='/docs'>{t('public.features.cta.secondary')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, catIndex) => (
        <section
          key={catIndex}
          className={`py-16 ${catIndex % 2 === 1 ? 'bg-muted/30' : 'bg-background'}`}
        >
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-3'>{category.title}</h2>
              <p className='text-lg text-muted-foreground'>{category.description}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {category.features.map((feature, featIndex) => (
                <Card key={featIndex} className='border border-border/50 h-full flex flex-col'>
                  <CardHeader>
                    <div className='mb-4'>{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <p className='text-muted-foreground'>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className='py-20 bg-primary/5'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-6'>{t('public.features.cta.title')}</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
            {t('public.features.cta.subtitle')}
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button size='lg' asChild>
              <Link to='/register'>{t('public.features.cta.button.primary')}</Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link to='/dashboard'>{t('public.features.cta.button.secondary')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
