import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/api';
import { copy, showError, showNotice } from '@/lib/utils';

export function PasswordResetConfirm() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    token: ''
  });
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetComplete, setResetComplete] = useState(false);

  useEffect(() => {
    // Get token and email from URL params
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (token && email) {
      setInputs({ token, email });
    } else {
      // Redirect to reset page if params are missing
      navigate('/reset');
    }
  }, [searchParams, navigate]);

  const handleSubmit = async () => {
    if (!inputs.email || !inputs.token) {
      navigate('/reset');
      return;
    }

    setDisableButton(true);
    setLoading(true);

    try {
      showNotice(t('messages.notice.password_copied'));
    } catch (error) {
      // Error handling done by API interceptor
      setTimeout(() => {
        navigate('/reset');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const copyPassword = async () => {
    if (await copy(newPassword)) {
      showNotice(t('messages.notice.password_copied', { password: newPassword }));
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 items-center text-center'>
          <CardTitle className='text-2xl'>{t('auth.reset.confirm.title')}</CardTitle>
          <CardDescription>
            {resetComplete
              ? t('auth.reset.confirm.success_description')
              : t('auth.reset.confirm.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resetComplete ? (
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='newPassword' className='hidden'>
                  {t('auth.reset.confirm.new_password')}
                </Label>
                <Input
                  id='newPassword'
                  value={newPassword}
                  readOnly
                  onClick={copyPassword}
                  className='cursor-pointer bg-muted'
                />
              </div>

              <Alert>
                <AlertDescription>{t('auth.reset.confirm.notice')}</AlertDescription>
              </Alert>

              <Button className='w-full' onClick={() => navigate('/login')}>
                {t('auth.login.button')}
              </Button>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='hidden'>
                  {t('auth.reset.email')}
                </Label>
                <Input id='email' value={inputs.email} readOnly />
              </div>

              <Button className='w-full' onClick={handleSubmit} disabled={loading || disableButton}>
                {loading ? t('common.loading') : t('auth.reset.confirm.button')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
