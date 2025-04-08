import { type ReactNode } from 'react';

import { cn } from '@monorepo/utils';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

export function NavLink({ href, icon, label, active = false, collapsed = false }: NavLinkProps) {
  const linkContent = (
    <a
      href={href}
      className={cn(
        'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
        active ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100',
        collapsed && 'justify-center px-2 py-3'
      )}
    >
      <span className={cn('text-gray-500', collapsed ? '' : 'mr-3')}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </a>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side='right'>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return linkContent;
}
