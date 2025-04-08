import React, { useState, useEffect } from 'react';

import { CreditCard, DollarSign, Activity, BarChart2, RefreshCw, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ModelDistributionChart from '@/components/dashboard/model-distribution-chart';
import RecentActivityTable from '@/components/dashboard/recent-activity-table';
import { StatCard } from '@/components/dashboard/stat-card';
import UsageChart from '@/components/dashboard/usage-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { showError } from '@/lib/utils';
import { formatQuota, formatNumber } from '@/lib/utils';

const Dashboard = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [summaryData, setSummaryData] = useState({
    totalRequests: 0,
    totalTokens: 0,
    totalQuota: 0,
    activeTokens: 0
  });

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('user');

  // Generate mock data for unauthenticated users
  const generateMockData = () => {
    const dailyData = [];
    const now = new Date();

    // Generate daily data for the past 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);

      dailyData.push({
        Day: date.getTime(),
        RequestCount: Math.floor(Math.random() * 100),
        PromptTokens: Math.floor(Math.random() * 10000),
        CompletionTokens: Math.floor(Math.random() * 8000),
        Quota: Math.floor(Math.random() * 500000)
      });
    }

    // Generate mock model data
    const modelData = [
      {
        ModelName: 'gpt-4',
        RequestCount: 102,
        PromptTokens: 25000,
        CompletionTokens: 20000,
        Quota: 250000
      },
      {
        ModelName: 'claude-3',
        RequestCount: 84,
        PromptTokens: 21000,
        CompletionTokens: 18500,
        Quota: 190000
      },
      {
        ModelName: 'gemini-pro',
        RequestCount: 67,
        PromptTokens: 18500,
        CompletionTokens: 15000,
        Quota: 160000
      },
      {
        ModelName: 'llama-2',
        RequestCount: 43,
        PromptTokens: 12000,
        CompletionTokens: 9000,
        Quota: 90000
      }
    ];

    // Generate mock logs
    const recentLogs = [
      {
        id: 1,
        model: 'gpt-4',
        timestamp: Date.now() - 1000 * 60 * 5,
        status: 'success',
        tokens: 1250
      },
      {
        id: 2,
        model: 'claude-3',
        timestamp: Date.now() - 1000 * 60 * 15,
        status: 'success',
        tokens: 980
      },
      {
        id: 3,
        model: 'gemini-pro',
        timestamp: Date.now() - 1000 * 60 * 45,
        status: 'error',
        error: 'Rate limit exceeded',
        tokens: 0
      },
      {
        id: 4,
        model: 'llama-2',
        timestamp: Date.now() - 1000 * 60 * 120,
        status: 'success',
        tokens: 1500
      },
      {
        id: 5,
        model: 'gpt-4',
        timestamp: Date.now() - 1000 * 60 * 240,
        status: 'success',
        tokens: 2200
      }
    ];

    // Mock system stats
    const stats = {
      uptime: '12d 5h 36m',
      version: 'v1.0.0',
      channelCount: 3
    };

    // Calculate summary data
    const totalRequests = dailyData.reduce((sum, day) => sum + day.RequestCount, 0);
    const totalPromptTokens = dailyData.reduce((sum, day) => sum + day.PromptTokens, 0);
    const totalCompletionTokens = dailyData.reduce((sum, day) => sum + day.CompletionTokens, 0);
    const totalQuota = dailyData.reduce((sum, day) => sum + day.Quota, 0);

    setSummaryData({
      totalRequests,
      totalTokens: totalPromptTokens + totalCompletionTokens,
      totalQuota,
      activeTokens: 2
    });

    return {
      daily: dailyData,
      models: modelData,
      recent_logs: recentLogs,
      stats
    };
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);

      // For unauthenticated users, use mock data
      if (!isAuthenticated) {
        const mockData = generateMockData();
        setDashboardData(mockData);
      } else {
        // Here you would normally fetch real data from your API
        // For now, we'll still use mock data as a placeholder
        const mockData = generateMockData();
        setDashboardData(mockData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      showError(t('dashboard.error_loading'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load dashboard data on mount and when time range changes
  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const timeRangeOptions = [
    { value: '1d', label: t('dashboard.time_range.today') },
    { value: '7d', label: t('dashboard.time_range.last_7_days') },
    { value: '30d', label: t('dashboard.time_range.last_30_days') },
    { value: '90d', label: t('dashboard.time_range.last_90_days') }
  ];

  // Display login notice for unauthenticated users
  const renderLoginNotice = () => {
    if (isAuthenticated) return null;

    return (
      <Card className='mb-6 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50'>
        <CardContent className='pt-6'>
          <div className='flex flex-row items-center gap-4'>
            <Info className='h-6 w-6 text-amber-500' />
            <div>
              <h3 className='font-medium text-amber-700 dark:text-amber-400'>Demo Mode</h3>
              <p className='text-sm text-amber-600 dark:text-amber-500'>
                You're viewing the dashboard in demo mode.
                <Button
                  variant='link'
                  className='h-auto p-0 text-amber-700 dark:text-amber-400 font-medium'
                  onClick={() => (window.location.href = '/login')}
                >
                  Log in
                </Button>{' '}
                to see your actual data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className='space-y-6'>
      {/* Header section */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
        <div>
          <h1 className='text-2xl font-medium tracking-tight'>{t('dashboard.title')}</h1>
        </div>

        <div className='flex items-center space-x-2'>
          <Select value={timeRange} onValueChange={setTimeRange} disabled={loading || refreshing}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={t('dashboard.select_time_range')} />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.length > 0 &&
                timeRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Button
            variant='outline'
            size='icon'
            onClick={fetchDashboardData}
            disabled={loading || refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Login notice for unauthenticated users */}
      {renderLoginNotice()}

      {/* Summary cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title={t('dashboard.stats.total_requests')}
          value={loading ? null : formatNumber(summaryData.totalRequests)}
          description={t('dashboard.stats.total_requests_desc')}
          icon={<Activity className='h-4 w-4 text-muted-foreground' />}
          loading={loading}
        />

        <StatCard
          title={t('dashboard.stats.tokens_used')}
          value={loading ? null : formatNumber(summaryData.totalTokens)}
          description={t('dashboard.stats.tokens_used_desc')}
          icon={<BarChart2 className='h-4 w-4 text-muted-foreground' />}
          loading={loading}
        />

        <StatCard
          title={t('dashboard.stats.quota_spent')}
          value={loading ? null : formatQuota(summaryData.totalQuota)}
          description={t('dashboard.stats.quota_spent_desc')}
          icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
          loading={loading}
        />

        <StatCard
          title={t('dashboard.stats.active_tokens')}
          value={loading ? null : summaryData.activeTokens}
          description={t('dashboard.stats.active_tokens_desc')}
          icon={<CreditCard className='h-4 w-4 text-muted-foreground' />}
          loading={loading}
        />
      </div>

      {/* Charts section */}
      <div className='grid gap-4 md:grid-cols-2'>
        {/* Usage over time chart */}
        <Card className='col-span-1 md:col-span-2'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <div className='space-y-1'>
              <CardTitle>{t('dashboard.charts.usage_over_time')}</CardTitle>
              <CardDescription>{t('dashboard.charts.usage_over_time_desc')}</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Info className='h-4 w-4 text-muted-foreground' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('dashboard.charts.usage_info')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='w-full h-[350px] flex items-center justify-center'>
                <Skeleton className='w-full h-full' />
              </div>
            ) : (
              <UsageChart data={dashboardData?.daily || []} timeRange={timeRange} />
            )}
          </CardContent>
        </Card>

        {/* Model distribution chart */}
        <Card className='col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <div className='space-y-1'>
              <CardTitle>{t('dashboard.charts.model_distribution')}</CardTitle>
              <CardDescription>{t('dashboard.charts.model_distribution_desc')}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='w-full h-[300px] flex items-center justify-center'>
                <Skeleton className='w-full h-full' />
              </div>
            ) : (
              <ModelDistributionChart data={dashboardData?.models || []} />
            )}
          </CardContent>
        </Card>

        {/* Recent activity table */}
        <Card className='col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <div className='space-y-1'>
              <CardTitle>{t('dashboard.recent_activity.title')}</CardTitle>
              <CardDescription>{t('dashboard.recent_activity.description')}</CardDescription>
            </div>
            <Button variant='outline' size='sm' onClick={() => (window.location.href = '/log')}>
              {t('dashboard.recent_activity.view_all')}
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='space-y-2'>
                <Skeleton className='h-12 w-full' />
                <Skeleton className='h-12 w-full' />
                <Skeleton className='h-12 w-full' />
                <Skeleton className='h-12 w-full' />
                <Skeleton className='h-12 w-full' />
              </div>
            ) : (
              <RecentActivityTable data={dashboardData?.recent_logs || []} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* System status */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>{t('dashboard.system_status.title')}</CardTitle>
          <CardDescription>{t('dashboard.system_status.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col'>
              <div className='text-sm font-medium text-muted-foreground'>
                {t('dashboard.system_status.uptime')}
              </div>
              <div className='mt-1 text-lg font-semibold'>
                {loading ? (
                  <Skeleton className='h-6 w-24' />
                ) : (
                  dashboardData?.stats?.uptime || t('dashboard.system_status.unknown')
                )}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-sm font-medium text-muted-foreground'>
                {t('dashboard.system_status.version')}
              </div>
              <div className='mt-1 text-lg font-semibold'>
                {loading ? (
                  <Skeleton className='h-6 w-24' />
                ) : (
                  dashboardData?.stats?.version || t('dashboard.system_status.unknown')
                )}
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-sm font-medium text-muted-foreground'>
                {t('dashboard.system_status.channels')}
              </div>
              <div className='mt-1 text-lg font-semibold'>
                {loading ? (
                  <Skeleton className='h-6 w-24' />
                ) : (
                  dashboardData?.stats?.channelCount || 0
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
