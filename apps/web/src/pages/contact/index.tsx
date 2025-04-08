import { useState } from 'react';

import { Mail, MapPin, Phone, MessageSquare, Send, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: 'support'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, department: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        department: 'support'
      });
    }, 1500);
  };

  // Contact info items
  const contactInfo = [
    {
      icon: <Mail className='h-8 w-8 text-primary' />,
      title: 'Email',
      details: t('public.contact.email'),
      link: `mailto:${t('public.contact.email')}`
    },
    {
      icon: <Phone className='h-8 w-8 text-primary' />,
      title: t('common.phone'),
      details: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <MapPin className='h-8 w-8 text-primary' />,
      title: t('common.office'),
      details: '123 Developer Way, San Francisco, CA 94107',
      link: 'https://maps.google.com'
    },
    {
      icon: <MessageSquare className='h-8 w-8 text-primary' />,
      title: t('common.live_chat'),
      details: 'Available Monday-Friday, 9am-5pm PST',
      link: '#'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='py-20 bg-muted/30'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-6'>{t('public.contact.title')}</h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            {t('public.contact.placeholder')}
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Contact Information */}
            <div className='space-y-8'>
              <h2 className='text-2xl font-bold mb-6'>{t('public.contact.inquiries')}</h2>

              {contactInfo.map((item, index) => (
                <Card key={index} className='border border-border/50'>
                  <CardContent className='p-6 flex items-start space-x-4'>
                    <div className='mt-1'>{item.icon}</div>
                    <div>
                      <h3 className='font-medium text-lg'>{item.title}</h3>
                      <a
                        href={item.link}
                        className='text-muted-foreground hover:text-primary transition-colors'
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.details}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className='lg:col-span-2'>
              <Card className='border border-border/50'>
                <CardContent className='p-6'>
                  <h2 className='text-2xl font-bold mb-6'>{t('public.contact.send_message')}</h2>

                  {submitted ? (
                    <Alert className='bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'>
                      <AlertDescription className='flex items-center'>
                        <Send className='h-5 w-5 mr-2' />
                        <span>{t('public.contact.thank_you')}</span>
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                          <Label htmlFor='name'>{t('common.your_name')}</Label>
                          <Input
                            id='name'
                            name='name'
                            placeholder='John Doe'
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='email'>{t('auth.register.email')}</Label>
                          <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='john@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                          <Label htmlFor='department'>{t('common.department')}</Label>
                          <Select value={formData.department} onValueChange={handleSelectChange}>
                            <SelectTrigger id='department'>
                              <SelectValue placeholder={t('common.select_department')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='support'>
                                {t('common.technical_support')}
                              </SelectItem>
                              <SelectItem value='sales'>{t('common.sales')}</SelectItem>
                              <SelectItem value='billing'>{t('common.billing')}</SelectItem>
                              <SelectItem value='partnership'>{t('common.partnership')}</SelectItem>
                              <SelectItem value='other'>{t('common.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='subject'>{t('common.subject')}</Label>
                          <Input
                            id='subject'
                            name='subject'
                            placeholder={t('common.subject_placeholder')}
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='message'>{t('common.message')}</Label>
                        <Textarea
                          id='message'
                          name='message'
                          placeholder={t('common.message_placeholder')}
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className='flex justify-end'>
                        <Button type='submit' disabled={loading}>
                          {loading ? (
                            <>
                              <span className='mr-2'>{t('common.sending')}</span>
                              <span className='animate-spin'>⋯</span>
                            </>
                          ) : (
                            <>
                              <Send className='mr-2 h-4 w-4' />
                              {t('common.send_message')}
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='py-16 bg-muted/30'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold mb-8'>{t('public.contact.visit_office')}</h2>
          <div className='bg-muted h-96 rounded-lg flex items-center justify-center border border-border/50'>
            <div className='text-muted-foreground'>
              <MapPin className='h-16 w-16 mx-auto mb-4 opacity-50' />
              <p className='text-lg'>{t('common.map_placeholder')}</p>
              <p className='text-sm'>{t('common.map_implementation_note')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold mb-4'>{t('public.pricing.faq.title')}</h2>
          <p className='text-muted-foreground mb-12 max-w-2xl mx-auto'>
            {t('public.pricing.faq.subtitle')}
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto'>
            <Card className='border border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold text-lg mb-2 flex items-start'>
                  <AlertCircle className='h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1' />
                  {t('public.contact.faq.support_options')}
                </h3>
                <p className='text-muted-foreground'>
                  {t('public.contact.faq.support_options_answer')}
                </p>
              </CardContent>
            </Card>

            <Card className='border border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold text-lg mb-2 flex items-start'>
                  <AlertCircle className='h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1' />
                  {t('public.contact.faq.response_time')}
                </h3>
                <p className='text-muted-foreground'>
                  {t('public.contact.faq.response_time_answer')}
                </p>
              </CardContent>
            </Card>

            <Card className='border border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold text-lg mb-2 flex items-start'>
                  <AlertCircle className='h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1' />
                  {t('public.contact.faq.customization')}
                </h3>
                <p className='text-muted-foreground'>
                  {t('public.contact.faq.customization_answer')}
                </p>
              </CardContent>
            </Card>

            <Card className='border border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold text-lg mb-2 flex items-start'>
                  <AlertCircle className='h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1' />
                  {t('public.contact.faq.bug_report')}
                </h3>
                <p className='text-muted-foreground'>{t('public.contact.faq.bug_report_answer')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
