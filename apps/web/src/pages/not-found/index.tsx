import { HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] px-4 text-center'>
      <div className='max-w-md'>
        <h1 className='text-9xl font-extrabold tracking-tighter text-primary mb-4'>404</h1>

        <Alert className='mb-6 border-none'>
          <AlertTitle className='text-xl'>{t('not_found.title')}</AlertTitle>
          <AlertDescription>{t('not_found.description')}</AlertDescription>
        </Alert>

        <Button asChild>
          <Link to='/'>
            <HomeIcon className='mr-2 h-4 w-4' />
            {t('not_found.back_home')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
