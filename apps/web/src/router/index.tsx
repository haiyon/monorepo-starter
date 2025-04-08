import { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import { ManagementRoutes } from './management';
import { PublicRoutes } from './public';

import { ShellProvider } from '@/components/shell/provider';
import { Loading } from '@/components/ui/loading';
import NotFoundPage from '@/pages/not-found';

export const Router = () => {
  return (
    <ShellProvider>
      <Routes>
        {PublicRoutes}
        {ManagementRoutes}
        <Route
          path='*'
          element={
            <Suspense fallback={<Loading />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </ShellProvider>
  );
};
