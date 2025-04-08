import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const RecentActivityTable = ({ data = [] }) => {
  const { t } = useTranslation();

  // Helper to render status badges
  const renderStatus = (status: string) => {
    if (status === 'success') {
      return (
        <Badge
          variant='outline'
          className='bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
        >
          <CheckCircle className='h-3 w-3 mr-1' />
          {t('dashboard.recent_activity.status.success')}
        </Badge>
      );
    }

    if (status === 'fail') {
      return (
        <Badge
          variant='outline'
          className='bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800'
        >
          <XCircle className='h-3 w-3 mr-1' />
          {t('dashboard.recent_activity.status.failed')}
        </Badge>
      );
    }

    return (
      <Badge
        variant='outline'
        className='bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800'
      >
        <AlertCircle className='h-3 w-3 mr-1' />
        {t('dashboard.recent_activity.status.error')}
      </Badge>
    );
  };

  // Format time distance
  const formatTime = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return timestamp;
    }
  };

  // Truncate model name if too long
  const truncateModel = (model: string) => {
    if (!model) return '';

    if (model.length > 20) {
      return model.substring(0, 17) + '...';
    }

    return model;
  };

  // Format error message
  const formatError = (message: string) => {
    if (!message) return '';

    if (message.length > 100) {
      return message.substring(0, 97) + '...';
    }

    return message;
  };

  return (
    <div className='max-h-[300px] overflow-hidden overflow-y-auto'>
      {data.length === 0 ? (
        <div className='py-6 text-center text-muted-foreground'>
          {t('dashboard.recent_activity.no_data')}
        </div>
      ) : (
        <Table>
          <TableBody>
            {data.map((activity: any, index: number) => (
              <TableRow key={activity?.id || index}>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                      <div className='font-medium truncate' title={activity?.model}>
                        {truncateModel(activity.model)}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        {formatTime(activity.timestamp)}
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      {renderStatus(activity.status)}

                      {activity.error && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='text-xs text-red-500 truncate max-w-[200px]'>
                              {formatError(activity.error)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className='max-w-xs'>{activity.error}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      {activity.tokens && (
                        <span className='text-xs text-muted-foreground'>
                          {activity.tokens} {t('dashboard.recent_activity.tokens')}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RecentActivityTable;
