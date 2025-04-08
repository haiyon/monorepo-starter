import { lazy, Suspense } from 'react';

import { Route } from 'react-router-dom';

import { PasswordResetConfirm } from '@/components/auth/password-reset-confirm';
import { PasswordResetForm } from '@/components/auth/password-reset-form';
import { Loading } from '@/components/ui/loading';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';

// Lazy-loaded components
const AutoPage = lazy(() => import('@/pages/auto'));
const HomePage = lazy(() => import('@/pages/home'));
const FeaturesPage = lazy(() => import('@/pages/features'));
const PricingPage = lazy(() => import('@/pages/pricing'));
const AboutPage = lazy(() => import('@/pages/about'));
const ContactPage = lazy(() => import('@/pages/contact'));
const BlogPage = lazy(() => import('@/pages/blog'));
const BlogPostDetailPage = lazy(() => import('@/pages/blog/[slug]'));
const DocsPage = lazy(() => import('@/pages/docs'));
const DocsDetailPage = lazy(() => import('@/pages/docs/[slug]'));

// Define public routes array
export const PublicRouteDefinitions = [
  // Auth routes
  { path: '/login', component: LoginPage, isAuthRoute: true },
  { path: '/register', component: RegisterPage, isAuthRoute: true },
  { path: '/reset', component: PasswordResetForm, isAuthRoute: true },
  { path: '/user/reset', component: PasswordResetConfirm, isAuthRoute: true },

  // Public pages
  { path: '/', component: AutoPage },
  { path: '/home', component: HomePage },
  { path: '/features', component: FeaturesPage },
  { path: '/pricing', component: PricingPage },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },

  // Blog pages
  { path: '/blog', component: BlogPage },
  { path: '/blog/:slug', component: BlogPostDetailPage },

  // Documentation pages
  { path: '/docs', component: DocsPage },
  { path: '/docs/:slug', component: DocsDetailPage }
];

// Convert route definitions to React Router elements
export const PublicRoutes = PublicRouteDefinitions.map(route => {
  if (route.isAuthRoute) {
    return <Route key={route.path} path={route.path} element={<route.component />} />;
  }

  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        <Suspense fallback={<Loading />}>
          <route.component />
        </Suspense>
      }
    />
  );
});
