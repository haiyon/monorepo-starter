import { cn } from '@monorepo/utils';
import { Heart, ExternalLink, GithubIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  className?: string;
  version?: string;
  compact?: boolean;
  footerHtml?: string;
}

export function Footer({
  className,
  version = 'v0.0.0',
  compact = false,
  footerHtml
}: FooterProps) {
  const { t } = useTranslation();
  // If custom footer HTML is provided, render it
  if (footerHtml) {
    return (
      <footer
        className={cn(
          'mt-2.5 px-4 py-2 text-center text-xs text-muted-foreground',
          compact && 'py-1',
          className
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
      </footer>
    );
  }

  return (
    <footer
      className={cn(
        'mt-2.5 px-4 py-2 text-center text-xs text-muted-foreground',
        compact && 'py-1',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-end gap-x-2',
          compact ? 'flex-col gap-1' : 'flex-row',
          className
        )}
      >
        <div className='flex items-center gap-2'>
          <a
            href='https://github.com/haiyon/monorepo-starter'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
            aria-label='GitHub Repository'
          >
            <GithubIcon className='h-3.5 w-3.5' />
            <span className='hidden sm:inline'>GitHub</span>
          </a>

          <a
            href='https://github.com/haiyon/monorepo-starter/stargazers'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
            aria-label='Star on GitHub'
          >
            <Heart className='h-3.5 w-3.5' />
          </a>

          <a
            href='https://github.com/haiyon/monorepo-starter'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
            aria-label='Documentation'
          >
            <ExternalLink className='h-3.5 w-3.5' />
            <span className='hidden sm:inline'>Docs</span>
          </a>
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='text-muted-foreground/60'>{version}</span>
        </div>
      </div>
    </footer>
  );
}
