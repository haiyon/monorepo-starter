import { useLocation } from 'react-router-dom';

import { ManagementShell } from '@/components/shell/management';
import { PublicShell } from '@/components/shell/public';
import { AUTH_PATHS, MANAGEMENT_PATHS, PUBLIC_PATHS } from '@/lib/utils';
import { adminPath } from '@/router/utils';

interface UseShellOptions {
  forceShell?: 'public' | 'management' | 'none';
}

/**
 * Hook to determine which shell to use based on the current route
 * @param options Configuration options
 * @returns The appropriate shell component for the current route
 */
export function useShell(options: UseShellOptions = {}) {
  const location = useLocation();

  // Handle forced shell option
  if (options.forceShell) {
    switch (options.forceShell) {
      case 'public':
        return PublicShell;
      case 'management':
        return ManagementShell;
      case 'none':
      default:
        return ({ children }: { children: React.ReactNode }) => <>{children}</>;
    }
  }

  // Auth paths (no shell)
  if (AUTH_PATHS.some(route => location.pathname.startsWith(route))) {
    return ({ children }: { children: React.ReactNode }) => <>{children}</>;
  }

  // Check if current route is a management route
  if (MANAGEMENT_PATHS.some(path => location.pathname.startsWith(path))) {
    return ManagementShell;
  }

  // Check if current route is a public route
  if (
    PUBLIC_PATHS.some(
      path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
    )
  ) {
    return PublicShell;
  }

  // Check if current route is admin route
  if (location.pathname.startsWith(adminPath(''))) {
    return ManagementShell;
  }

  // Default to public shell
  return PublicShell;
}
