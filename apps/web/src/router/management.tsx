import { lazy, Suspense } from 'react';

import { Route } from 'react-router-dom';

import { PrivateRoute } from '@/components/auth/private-route';
import { Loading } from '@/components/ui/loading';

// Lazy-loaded components
const DashboardPage = lazy(() => import('@/pages/management/dashboard'));

// Define management routes array
export const ManagementRouteDefinitions = [
  { path: '/dashboard', component: DashboardPage, requireAuth: false }
  // Add other routes
];

// Convert route definitions to React Router elements
export const ManagementRoutes = ManagementRouteDefinitions.map(route => (
  <Route
    key={route.path}
    path={route.path}
    element={
      <PrivateRoute requireAuth={route['requireAuth'] !== false}>
        <Suspense fallback={<Loading />}>
          <route.component />
        </Suspense>
      </PrivateRoute>
    }
  />
));
