import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function PrivateRoute({ children, requireAuth = true }: PrivateRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Only check authentication if requireAuth is true
    if (requireAuth) {
      // Check if user is logged in
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        // Redirect to login page with return URL
        const currentPath = window.location.pathname;
        navigate(`/login?returnUrl=${encodeURIComponent(currentPath)}`);
      }
    }
  }, [navigate, requireAuth]);

  // If authentication is not required OR user is logged in, render children
  return !requireAuth || localStorage.getItem('user') ? <>{children}</> : null;
}
