import { useShell } from '@/hooks/use-shell';

interface ShellProviderProps {
  children: React.ReactNode;
  forceShell?: 'public' | 'management' | 'none';
}

/**
 * Component that automatically wraps content in the appropriate shell based on the current route
 */
export function ShellProvider({ children, forceShell }: ShellProviderProps) {
  const Shell = useShell({ forceShell });
  return <Shell>{children}</Shell>;
}
