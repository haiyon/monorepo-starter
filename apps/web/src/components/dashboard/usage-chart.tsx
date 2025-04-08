import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import { Button } from '@/components/ui/button';
import { formatNumber, formatTimestamp } from '@/lib/utils';

const UsageChart = ({ data = [], timeRange = '7d' }) => {
  const { t } = useTranslation();
  const [chartMode, setChartMode] = useState('requests'); // 'requests', 'tokens', or 'quota'

  // Process data for the chart
  const processChartData = (rawData: any) => {
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return [];
    }

    return rawData.map(item => ({
      date: item.Day,
      dateFormatted: formatTimestamp(item.Day, { time: false }),
      requests: item.RequestCount || 0,
      promptTokens: item.PromptTokens || 0,
      completionTokens: item.CompletionTokens || 0,
      totalTokens: (item.PromptTokens || 0) + (item.CompletionTokens || 0),
      quota: item.Quota || 0
    }));
  };

  const chartData = processChartData(data);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;

      return (
        <div className='bg-background border rounded p-2 shadow-md text-sm'>
          <p className='font-medium mb-1'>{dataItem.dateFormatted}</p>

          {chartMode === 'requests' && (
            <p className='text-blue-500'>
              {t('dashboard.charts.requests')}: {formatNumber(dataItem.requests)}
            </p>
          )}

          {chartMode === 'tokens' && (
            <>
              <p className='text-green-500'>
                {t('dashboard.charts.prompt_tokens')}: {formatNumber(dataItem.promptTokens)}
              </p>
              <p className='text-purple-500'>
                {t('dashboard.charts.completion_tokens')}: {formatNumber(dataItem.completionTokens)}
              </p>
              <p className='text-gray-500 font-medium'>
                {t('dashboard.charts.total_tokens')}: {formatNumber(dataItem.totalTokens)}
              </p>
            </>
          )}

          {chartMode === 'quota' && (
            <p className='text-amber-500'>
              {t('dashboard.charts.quota')}: {formatNumber(dataItem.quota / 1000000)}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  // Define chart elements based on mode
  const renderChartElements = (): any => {
    if (chartMode === 'requests') {
      return (
        <Area
          type='monotone'
          dataKey='requests'
          stroke='#2563eb'
          fill='#2563eb'
          fillOpacity={0.2}
          name={t('dashboard.charts.requests')}
          strokeWidth={2}
        />
      );
    }

    if (chartMode === 'tokens') {
      return (
        <>
          <Area
            type='monotone'
            dataKey='promptTokens'
            stroke='#10b981'
            fill='#10b981'
            fillOpacity={0.2}
            name={t('dashboard.charts.prompt_tokens')}
            strokeWidth={2}
          />
          <Area
            type='monotone'
            dataKey='completionTokens'
            stroke='#8b5cf6'
            fill='#8b5cf6'
            fillOpacity={0.2}
            name={t('dashboard.charts.completion_tokens')}
            strokeWidth={2}
          />
        </>
      );
    }

    if (chartMode === 'quota') {
      return (
        <Area
          type='monotone'
          dataKey='quota'
          stroke='#f59e0b'
          fill='#f59e0b'
          fillOpacity={0.2}
          name={t('dashboard.charts.quota')}
          strokeWidth={2}
        />
      );
    }
  };

  // Format date for the XAxis
  const formatXAxis = (tickItem: any) => {
    if (!tickItem) return '';

    // Different format based on time range
    const date = new Date(tickItem);
    if (timeRange === '1d') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Default format for longer ranges
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className='h-[350px]'>
      <div className='mb-4 flex gap-2'>
        <Button
          variant={chartMode === 'requests' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setChartMode('requests')}
        >
          {t('dashboard.charts.requests')}
        </Button>
        <Button
          variant={chartMode === 'tokens' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setChartMode('tokens')}
        >
          {t('dashboard.charts.tokens')}
        </Button>
        <Button
          variant={chartMode === 'quota' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setChartMode('quota')}
        >
          {t('dashboard.charts.quota')}
        </Button>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
            <defs>
              <linearGradient id='colorRequests' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#2563eb' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#2563eb' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorPrompt' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#10b981' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#10b981' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorCompletion' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#8b5cf6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8b5cf6' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorQuota' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#f59e0b' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#f59e0b' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='date'
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxis}
              minTickGap={30}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={value =>
                chartMode === 'quota' ? formatNumber(value / 1000000) : formatNumber(value)
              }
            />
            <CartesianGrid strokeDasharray='3 3' vertical={false} opacity={0.15} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {renderChartElements()}
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className='h-full flex items-center justify-center'>
          <p className='text-muted-foreground'>{t('dashboard.charts.no_data')}</p>
        </div>
      )}
    </div>
  );
};

export default UsageChart;
