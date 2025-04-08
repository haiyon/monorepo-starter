import React from 'react';

import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface FooterProps {
  systemName?: string;
  logo?: string;
  version?: string;
  footerHtml?: string;
}

export function Footer({ systemName = 'Monorepo Starter', footerHtml }: FooterProps) {
  const { t } = useTranslation();

  // If custom footer HTML is provided, render it
  if (footerHtml) {
    return (
      <footer className='bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8'>
          <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
        </div>
      </footer>
    );
  }

  // Navigation links for footer
  const footerLinks = {
    product: [
      { label: t('public.footer.features'), href: '/features' },
      { label: t('public.footer.pricing'), href: '/pricing' },
      { label: t('public.footer.docs'), href: '/docs' },
      { label: t('public.footer.changelog'), href: '/changelog' }
    ],
    company: [
      { label: t('public.footer.about'), href: '/about' },
      { label: t('public.footer.blog'), href: '/blog' },
      { label: t('public.footer.careers'), href: '/careers' },
      { label: t('public.footer.contact'), href: '/contact' }
    ],
    legal: [
      { label: t('public.footer.privacy'), href: '/privacy' },
      { label: t('public.footer.terms'), href: '/terms' },
      { label: t('public.footer.cookies'), href: '/cookies' }
    ],
    resources: [
      { label: t('public.footer.help_center'), href: '/help' },
      { label: t('public.footer.api_reference'), href: '/docs/api' },
      { label: t('public.footer.status'), href: '/status' },
      {
        label: t('public.footer.github'),
        href: 'https://github.com/haiyon/monorepo-starter',
        external: true
      }
    ]
  };

  return (
    <footer className='bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-6'>
          {/* Brand column */}
          <div className='lg:col-span-2'>
            <p className='text-gray-600 dark:text-gray-400 max-w-md mb-4'>
              {t('public.footer.description')}
            </p>
            <div className='flex space-x-4'>
              <a
                href='https://github.com/haiyon/monorepo-starter'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              >
                <span className='sr-only'>GitHub</span>
                <Github className='h-5 w-5' />
              </a>
              <a
                href='https://github.com/haiyon/monorepo-starter'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              >
                <span className='sr-only'>Twitter</span>
                <Twitter className='h-5 w-5' />
              </a>
              <a
                href='https://github.com/haiyon/monorepo-starter'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              >
                <span className='sr-only'>LinkedIn</span>
                <Linkedin className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className='font-medium text-gray-900 dark:text-white mb-4'>
              {t('public.footer.product')}
            </h3>
            <ul className='space-y-3'>
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 dark:text-gray-400 hover:text-primary'
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className='text-gray-600 dark:text-gray-400 hover:text-primary'
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-medium text-gray-900 dark:text-white mb-4'>
              {t('public.footer.company')}
            </h3>
            <ul className='space-y-3'>
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 dark:text-gray-400 hover:text-primary'
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className='text-gray-600 dark:text-gray-400 hover:text-primary'
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-medium text-gray-900 dark:text-white mb-4'>
              {t('public.footer.resources')}
            </h3>
            <ul className='space-y-3'>
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 dark:text-gray-400 hover:text-primary'
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className='text-gray-600 dark:text-gray-400 hover:text-primary'
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className='border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4 mb-4 md:mb-0 text-center md:text-left'>
            <span className='text-gray-600 dark:text-gray-400 text-sm'>
              &copy; {new Date().getFullYear()} {systemName}. {t('public.footer.rights')}
            </span>
            <div className='flex gap-4 justify-center'>
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className='text-gray-600 dark:text-gray-400 hover:text-primary text-sm'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
