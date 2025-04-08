import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { apiRequest } from '@/lib/api';
import { showError, showInfo, showSuccess } from '@/lib/utils';

export function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    verification_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [, setTurnstileSiteKey] = useState('');
  const [turnstileToken] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Get affiliation code from URL if present
  const affCode = new URLSearchParams(window.location.search).get('aff');

  useEffect(() => {
    // Store aff code in localStorage if present
    if (affCode) {
      localStorage.setItem('aff', affCode);
    }

    // Load system status
    const status = localStorage.getItem('status');
    if (status) {
      const statusData = JSON.parse(status);
      setShowEmailVerification(statusData.email_verification);

      if (statusData.turnstile_check) {
        setTurnstileEnabled(true);
        setTurnstileSiteKey(statusData.turnstile_site_key);
      }
    }
  }, [affCode]);

  // Handle countdown for verification code
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const sendVerificationCode = async () => {
    if (!inputs.email) return;

    if (turnstileEnabled && !turnstileToken) {
      showInfo(t('messages.error.turnstile_wait'));
      return;
    }

    setDisableButton(true);
    setLoading(true);

    try {
      showSuccess(t('messages.success.verification_code'));
    } catch (error) {
      // Error handling done by API interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (inputs.password.length < 8) {
      showInfo(t('messages.error.password_length'));
      return;
    }

    // Confirm passwords match
    if (inputs.password !== inputs.password2) {
      showInfo(t('messages.error.password_mismatch'));
      return;
    }

    // Validate turnstile if enabled
    if (turnstileEnabled && !turnstileToken) {
      showInfo(t('messages.error.turnstile_wait'));
      return;
    }

    setLoading(true);

    // Get affiliation code from localStorage if not in URL
    const affCodeToUse = affCode || localStorage.getItem('aff') || '';

    try {
      navigate('/login');
      showSuccess(t('messages.success.register'));
    } catch (error) {
      // Error handling done by API interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 items-center text-center'>
          <CardTitle className='text-2xl'>{t('auth.register.title')}</CardTitle>
          <CardDescription>{t('auth.register.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username' className='hidden'>
                {t('auth.register.username')}
              </Label>
              <Input
                id='username'
                name='username'
                placeholder={t('auth.register.username')}
                value={inputs.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='hidden'>
                {t('auth.register.password')}
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder={t('auth.register.password')}
                value={inputs.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password2' className='hidden'>
                {t('auth.register.confirm_password')}
              </Label>
              <Input
                id='password2'
                name='password2'
                type='password'
                placeholder={t('auth.register.confirm_password')}
                value={inputs.password2}
                onChange={handleInputChange}
                required
              />
            </div>

            {showEmailVerification && (
              <>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='hidden'>
                    {t('auth.register.email')}
                  </Label>
                  <div className='flex gap-2'>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder={t('auth.register.email')}
                      value={inputs.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={sendVerificationCode}
                      disabled={disableButton || loading || !inputs.email}
                    >
                      {disableButton
                        ? t('auth.register.get_code_retry', { countdown })
                        : t('auth.register.get_code')}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='verification_code' className='hidden'>
                    {t('auth.register.verification_code')}
                  </Label>
                  <Input
                    id='verification_code'
                    name='verification_code'
                    placeholder={t('auth.register.verification_code')}
                    value={inputs.verification_code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {turnstileEnabled && (
              <div className='flex justify-center my-4'>
                {/* This is a placeholder for Turnstile component */}
                {/* In a real implementation, you would use a Turnstile component here */}
                <div
                  id='turnstile-container'
                  className='border border-dashed border-muted-foreground rounded-sm p-4'
                >
                  Turnstile verification placeholder
                </div>
              </div>
            )}

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? t('common.loading') : t('auth.register.button')}
            </Button>
          </form>

          <Separator className='my-4' />

          <div className='text-center text-sm'>
            {t('auth.register.has_account')}{' '}
            <Link to='/login' className='text-primary hover:underline'>
              {t('auth.register.login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
