import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const StatCard = ({
  title,
  value,
  description,
  icon,
  loading = false,
  trend = null
}: {
  title: string;
  value: number | null;
  description?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  trend?: {
    type: 'increase' | 'decrease';
    value: string;
  } | null;
}) => {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between space-y-0 pb-2'>
          <h3 className='text-sm font-medium leading-none tracking-tight text-muted-foreground'>
            {title}
          </h3>
          {icon}
        </div>

        <div className='pt-2'>
          {loading ? (
            <Skeleton className='h-8 w-24' />
          ) : (
            <div className='text-2xl font-bold'>{value !== null ? value : '—'}</div>
          )}

          {description && <p className='text-xs text-muted-foreground pt-1'>{description}</p>}

          {trend && !loading && (
            <div
              className={`flex items-center text-xs pt-2 ${
                trend.type === 'increase'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {trend.type === 'increase' ? (
                <svg className='h-3 w-3 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 5.414V6a1 1 0 01-1 1z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg className='h-3 w-3 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M12 13a1 1 0 100-2H5.414l4.293-4.293a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L5.414 13H12z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
