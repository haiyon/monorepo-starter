import React from 'react';

import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { setupStyles } from '@/assets/styles';
import { ThemeProvider } from '@/components/shell/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import i18n from '@/lib/i18n';
import { Router } from '@/router';

const mount = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ThemeProvider defaultTheme='light' storageKey='theme'>
            <Router />
            <Toaster />
          </ThemeProvider>
        </BrowserRouter>
      </I18nextProvider>
    </React.StrictMode>
  );
};

async function bootstrap() {
  setupStyles();
  mount();
}

bootstrap();
