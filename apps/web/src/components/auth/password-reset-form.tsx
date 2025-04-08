import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/api';
import { showError, showSuccess } from '@/lib/utils';

export function PasswordResetForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [, setTurnstileSiteKey] = useState('');
  const [turnstileToken] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    // Load system status
    const status = localStorage.getItem('status');
    if (status) {
      const statusData = JSON.parse(status);
      if (statusData.turnstile_check) {
        setTurnstileEnabled(true);
        setTurnstileSiteKey(statusData.turnstile_site_key);
      }
    }
  }, []);

  // Handle countdown for button disable
  useEffect(() => {
    let countdownInterval: ReturnType<typeof setInterval> | null = null;

    if (disableButton && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setDisableButton(false);
      setCountdown(30);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [disableButton, countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    if (turnstileEnabled && !turnstileToken) {
      showError(t('messages.error.turnstile_wait'));
      return;
    }

    setLoading(true);
    setDisableButton(true);

    try {
      showSuccess(t('messages.success.password_reset'));
      setResetSent(true);
      setEmail('');
    } catch (error) {
      // Error handling done by API interceptor
      setDisableButton(false);
      setCountdown(30);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 items-center text-center'>
          <CardTitle className='text-2xl'>{t('auth.reset.title')}</CardTitle>
          <CardDescription>{t('auth.reset.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {resetSent ? (
            <Alert>
              <AlertDescription>{t('auth.reset.notice')}</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='hidden'>
                  {t('auth.reset.email')}
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder={t('auth.reset.email')}
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>

              {turnstileEnabled && (
                <div className='flex justify-center my-4'>
                  {/* Turnstile component would be imported and used here */}
                  <div id='turnstile-container'></div>
                </div>
              )}

              <Button type='submit' className='w-full' disabled={loading || disableButton}>
                {loading
                  ? t('common.loading')
                  : disableButton
                    ? t('auth.register.get_code_retry', { countdown })
                    : t('auth.reset.button')}
              </Button>

              <div className='mt-4 text-center text-sm'>
                <Link to='/login' className='text-primary hover:underline'>
                  {t('auth.login.button')}
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
