import { useState } from 'react';

import { Check, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function PricingPage() {
  const { t } = useTranslation();
  const [billingAnnually, setBillingAnnually] = useState(true);

  // Pricing plans
  const plans = [
    {
      name: t('public.pricing.plan.community'),
      description: t('public.pricing.plan.community.desc'),
      price: { monthly: 0, annually: 0 },
      features: [
        t('public.pricing.community.feature1'),
        t('public.pricing.community.feature2'),
        t('public.pricing.community.feature3'),
        t('public.pricing.community.feature4'),
        t('public.pricing.community.feature5'),
        t('public.pricing.community.feature6')
      ],
      cta: t('public.pricing.cta.community'),
      highlight: false
    },
    {
      name: t('public.pricing.plan.professional'),
      description: t('public.pricing.plan.professional.desc'),
      price: { monthly: 19, annually: 15 },
      features: [
        t('public.pricing.professional.feature1'),
        t('public.pricing.professional.feature2'),
        t('public.pricing.professional.feature3'),
        t('public.pricing.professional.feature4'),
        t('public.pricing.professional.feature5'),
        t('public.pricing.professional.feature6')
      ],
      cta: t('public.pricing.cta.professional'),
      highlight: true
    },
    {
      name: t('public.pricing.plan.enterprise'),
      description: t('public.pricing.plan.enterprise.desc'),
      price: { monthly: 49, annually: 39 },
      features: [
        t('public.pricing.enterprise.feature1'),
        t('public.pricing.enterprise.feature2'),
        t('public.pricing.enterprise.feature3'),
        t('public.pricing.enterprise.feature4'),
        t('public.pricing.enterprise.feature5'),
        t('public.pricing.enterprise.feature6')
      ],
      cta: t('public.pricing.cta.enterprise'),
      highlight: false
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: t('public.pricing.faq.free.question'),
      answer: t('public.pricing.faq.free.answer')
    },
    {
      question: t('public.pricing.faq.upgrade.question'),
      answer: t('public.pricing.faq.upgrade.answer')
    },
    {
      question: t('public.pricing.faq.refund.question'),
      answer: t('public.pricing.faq.refund.answer')
    },
    {
      question: t('public.pricing.faq.discount.question'),
      answer: t('public.pricing.faq.discount.answer')
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='py-20 bg-muted/30'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-6'>{t('public.pricing.title')}</h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            {t('public.pricing.subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className='flex items-center justify-center mb-12'>
            <span
              className={`mr-2 ${!billingAnnually ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
            >
              {t('public.pricing.billing.monthly')}
            </span>
            <Switch
              checked={billingAnnually}
              onCheckedChange={setBillingAnnually}
              id='billing-toggle'
            />
            <Label
              htmlFor='billing-toggle'
              className={`ml-2 ${billingAnnually ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
            >
              {t('public.pricing.billing.annually')}{' '}
              <span className='text-sm text-green-600 dark:text-green-400'>
                {t('public.pricing.billing.discount')}
              </span>
            </Label>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8'>
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col border-2 ${
                  plan.highlight ? 'border-primary shadow-lg relative' : 'border-border/50'
                }`}
              >
                {plan.highlight && (
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full'>
                    {t('public.pricing.popular')}
                  </div>
                )}
                <CardHeader className={`pb-6 ${plan.highlight ? 'bg-primary/5' : ''}`}>
                  <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                  <p className='text-muted-foreground mt-2'>{plan.description}</p>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <div className='mt-2 mb-6'>
                    <span className='text-4xl font-bold'>
                      ${billingAnnually ? plan.price.annually : plan.price.monthly}
                    </span>
                    <span className='text-muted-foreground'>
                      {plan.price.monthly > 0 ? t('public.pricing.month') : ''}
                    </span>
                  </div>

                  <ul className='space-y-3'>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-start'>
                        <Check className='h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className='pt-6'>
                  <Button
                    className={`w-full ${plan.highlight ? 'bg-primary' : ''}`}
                    variant={plan.highlight ? 'default' : 'outline'}
                    asChild
                  >
                    <Link
                      to={
                        plan.name === t('public.pricing.plan.enterprise') ? '/contact' : '/register'
                      }
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-muted/30'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-3'>{t('public.pricing.faq.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('public.pricing.faq.subtitle')}</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {faqItems.map((item, index) => (
              <div key={index} className='space-y-3'>
                <h3 className='font-semibold text-lg flex items-center'>
                  {item.question}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className='h-4 w-4 ml-2 text-muted-foreground/70' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className='max-w-xs'>{item.answer}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                <p className='text-muted-foreground'>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-primary/5'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-6'>{t('public.pricing.cta.ready')}</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
            {t('public.pricing.cta.choose')}
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button size='lg' asChild>
              <Link to='/register'>{t('public.pricing.cta.signup')}</Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link to='/contact'>{t('public.footer.contact_us')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
