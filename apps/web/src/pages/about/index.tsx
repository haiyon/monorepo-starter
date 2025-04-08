import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const { t } = useTranslation();

  // Team members
  const teamMembers = [
    {
      name: 'John Doe',
      role: t('common.founder_ceo'),
      image: 'https://api.dicebear.com/6.x/micah/svg?seed=john',
      bio: t('public.about.john_bio')
    },
    {
      name: 'Jane Smith',
      role: t('common.cto'),
      image: 'https://api.dicebear.com/6.x/micah/svg?seed=jane',
      bio: t('public.about.jane_bio')
    },
    {
      name: 'Mike Johnson',
      role: t('common.lead_developer'),
      image: 'https://api.dicebear.com/6.x/micah/svg?seed=mike',
      bio: t('public.about.mike_bio')
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='py-20 bg-muted/30'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-6'>{t('public.about.title')}</h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            {t('public.about.placeholder')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold mb-6'>{t('public.about.mission_title')}</h2>
              <p className='text-lg text-muted-foreground mb-4'>
                {t('public.about.mission_desc1')}
              </p>
              <p className='text-lg text-muted-foreground mb-4'>
                {t('public.about.mission_desc2')}
              </p>
              <p className='text-lg text-muted-foreground'>{t('public.about.mission_desc3')}</p>
            </div>
            <div className='relative p-6 bg-muted/50 rounded-lg'>
              <blockquote className='text-xl italic'>{t('public.about.mission_quote')}</blockquote>
              <div className='mt-4 font-medium'>{t('public.about.mission_quote_author')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 bg-muted/30'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-3'>{t('public.about.team_title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('public.about.team_subtitle')}</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <Card key={index} className='overflow-hidden'>
                <div className='aspect-square bg-muted flex items-center justify-center'>
                  <img src={member.image} alt={member.name} className='w-1/2 h-1/2 object-cover' />
                </div>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-bold'>{member.name}</h3>
                  <p className='text-sm text-primary mb-4'>{member.role}</p>
                  <p className='text-muted-foreground'>{member.bio}</p>
                  <div className='mt-4 flex space-x-4'>
                    <a href='#' className='text-muted-foreground hover:text-foreground'>
                      <Twitter className='h-5 w-5' />
                    </a>
                    <a href='#' className='text-muted-foreground hover:text-foreground'>
                      <Linkedin className='h-5 w-5' />
                    </a>
                    <a href='#' className='text-muted-foreground hover:text-foreground'>
                      <Github className='h-5 w-5' />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-primary/5'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-6'>{t('public.about.cta_title')}</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
            {t('public.about.cta_desc')}
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button size='lg' asChild>
              <Link to='/register'>{t('public.landing.hero.cta_primary')}</Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <a
                href='https://github.com/haiyon/monorepo-starter'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Github className='mr-2 h-5 w-5' />
                {t('public.footer.github')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
