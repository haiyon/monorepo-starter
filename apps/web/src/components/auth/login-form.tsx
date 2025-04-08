import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { showError } from '@/lib/utils';

export function LoginForm() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    wechat_verification_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [showWeChatLoginModal, setShowWeChatLoginModal] = useState(false);
  const [status, setStatus] = useState<any>({});

  useEffect(() => {
    // Check if redirected from session expiry
    if (searchParams.get('expired')) {
      showError(t('messages.error.login_expired'));
    }

    // Load system status
    const statusData = localStorage.getItem('status');
    if (statusData) {
      setStatus(JSON.parse(statusData));
    }
  }, [searchParams, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputs.username || !inputs.password) return;

    setLoading(true);
    try {
      const redirectPath = '/dashboard'; // Default redirection
      // Execute navigation once
      navigate(redirectPath);
    } catch (error) {
      // Error handling is done by the API interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleWeChatLogin = async () => {
    try {
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done by the API interceptor
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 items-center text-center'>
          <CardTitle className='text-2xl'>{t('auth.login.title')}</CardTitle>
          <CardDescription>{t('auth.login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username' className='hidden'>
                {t('auth.login.username')}
              </Label>
              <Input
                id='username'
                name='username'
                placeholder={t('auth.login.username')}
                value={inputs.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center'>
                <Label htmlFor='password' className='hidden'>
                  {t('auth.login.password')}
                </Label>
              </div>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder={t('auth.login.password')}
                value={inputs.password}
                onChange={handleInputChange}
                required
              />
              <div className='flex justify-end'>
                <Link to='/reset' className='text-sm text-primary hover:underline'>
                  {t('auth.login.forgot_password')}
                </Link>
              </div>
            </div>
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? t('common.loading') : t('auth.login.button')}
            </Button>
          </form>

          <div className='mt-4 text-center text-sm'>
            {t('auth.login.no_account')}{' '}
            <Link to='/register' className='text-primary hover:underline'>
              {t('auth.login.register')}
            </Link>
          </div>

          {(status.github_oauth || status.wechat_login || status.lark_client_id) && (
            <>
              <Separator className='my-4' />
              <div className='space-y-4'>
                <p className='text-center text-sm text-muted-foreground'>
                  {t('auth.login.other_methods')}
                </p>
                <div className='flex justify-center space-x-4'>
                  {status.github_oauth && (
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() => {
                        window.open(
                          `https://github.com/login/oauth/authorize?client_id=${status.github_client_id}&state=${encodeURIComponent(window.location.origin)}&scope=user:email`,
                          '_self'
                        );
                      }}
                    >
                      <svg viewBox='0 0 438.549 438.549' className='h-4 w-4'>
                        <path
                          fill='currentColor'
                          d='M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z'
                        />
                      </svg>
                    </Button>
                  )}

                  {status.wechat_login && (
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() => setShowWeChatLoginModal(true)}
                    >
                      <svg viewBox='0 0 24 24' className='h-4 w-4'>
                        <path
                          fill='currentColor'
                          d='M9.5,4C5.36,4 2,6.69 2,10C2,11.89 3.08,13.56 4.78,14.66L4,17L6.5,15.5C7.39,15.81 8.37,16 9.41,16C9.15,15.37 9,14.7 9,14C9,10.69 12.13,8 16,8C16.19,8 16.38,8 16.56,8.03C15.54,5.69 12.78,4 9.5,4M6.5,6.5A1,1 0 0,1 7.5,7.5A1,1 0 0,1 6.5,8.5A1,1 0 0,1 5.5,7.5A1,1 0 0,1 6.5,6.5M11.5,6.5A1,1 0 0,1 12.5,7.5A1,1 0 0,1 11.5,8.5A1,1 0 0,1 10.5,7.5A1,1 0 0,1 11.5,6.5M16,9C12.69,9 10,11.13 10,14C10,16.87 12.69,19 16,19C16.67,19 17.31,18.9 17.91,18.7L20,20L19.41,18.09C20.84,17.11 22,15.67 22,14C22,11.13 19.31,9 16,9M14,11.5A1,1 0 0,1 15,12.5A1,1 0 0,1 14,13.5A1,1 0 0,1 13,12.5A1,1 0 0,1 14,11.5M18,11.5A1,1 0 0,1 19,12.5A1,1 0 0,1 18,13.5A1,1 0 0,1 17,12.5A1,1 0 0,1 18,11.5Z'
                        />
                      </svg>
                    </Button>
                  )}

                  {status.lark_client_id && (
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() => {
                        const redirectUri = `${window.location.origin}/oauth/lark`;
                        window.open(
                          `https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=${encodeURIComponent(redirectUri)}&app_id=${status.lark_client_id}&state=${encodeURIComponent(window.location.origin)}`,
                          '_self'
                        );
                      }}
                    >
                      <img src='/lark.svg' alt='Lark' className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* WeChat Login Modal */}
      <Dialog open={showWeChatLoginModal} onOpenChange={setShowWeChatLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('auth.login.wechat.title')}</DialogTitle>
            <DialogDescription>{t('auth.login.wechat.scan_tip')}</DialogDescription>
          </DialogHeader>
          <div className='flex flex-col items-center space-y-4'>
            {status.wechat_qrcode && (
              <img src={status.wechat_qrcode} alt='QR Code' className='max-w-full h-auto' />
            )}
            <div className='w-full space-y-4'>
              <Input
                placeholder={t('auth.login.wechat.code_placeholder')}
                name='wechat_verification_code'
                value={inputs.wechat_verification_code}
                onChange={handleInputChange}
              />
              <Button className='w-full' onClick={handleWeChatLogin}>
                {t('auth.login.button')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
