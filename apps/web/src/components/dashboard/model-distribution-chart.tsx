import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';

// Color palette for the chart
const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#8B5CF6', // purple
  '#F59E0B', // amber
  '#EC4899', // pink
  '#6366F1', // indigo
  '#EF4444', // red
  '#14B8A6', // teal
  '#F97316', // orange
  '#A855F7', // violet
  '#06B6D4', // cyan
  '#84CC16' // lime
];

const ModelDistributionChart = ({ data = [] }) => {
  const { t } = useTranslation();
  const [chartMode, setChartMode] = useState('tokens'); // 'tokens', 'requests', or 'quota'

  // Process data for the chart
  const processChartData = (rawData: any) => {
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return [];
    }

    // Aggregate data by model
    const modelMap = rawData.reduce((acc, item) => {
      const modelName = item.ModelName || 'Unknown';

      if (!acc[modelName]) {
        acc[modelName] = {
          name: modelName,
          tokens: 0,
          requests: 0,
          quota: 0
        };
      }

      acc[modelName].tokens += (item.PromptTokens || 0) + (item.CompletionTokens || 0);
      acc[modelName].requests += item.RequestCount || 0;
      acc[modelName].quota += item.Quota || 0;

      return acc;
    }, {});

    // Convert to array and sort by selected metric
    const result: any[] = Object.values(modelMap);

    // Sort by the current mode
    result.sort((a, b) => b[chartMode] - a[chartMode]);

    // Limit to top 8 models, and group the rest as "Others"
    if (result.length > 8) {
      const topModels = result.slice(0, 7);
      const otherModels = result.slice(7);

      const others = {
        name: t('dashboard.charts.others'),
        tokens: otherModels.reduce((sum, model) => sum + model.tokens, 0),
        requests: otherModels.reduce((sum, model) => sum + model.requests, 0),
        quota: otherModels.reduce((sum, model) => sum + model.quota, 0)
      };

      return [...topModels, others];
    }

    return result;
  };

  const chartData = processChartData(data);

  // Calculate total values for percentages
  const totals = chartData.reduce(
    (acc, item) => {
      acc.tokens += item.tokens;
      acc.requests += item.requests;
      acc.quota += item.quota;
      return acc;
    },
    { tokens: 0, requests: 0, quota: 0 }
  );

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = data[chartMode];
      const percentage = ((value / totals[chartMode]) * 100).toFixed(1);

      return (
        <div className='bg-background border rounded p-2 shadow-md text-sm'>
          <p className='font-medium mb-1'>{data.name}</p>

          {chartMode === 'tokens' && (
            <p>
              {formatNumber(value)} {t('dashboard.charts.tokens')} ({percentage}%)
            </p>
          )}

          {chartMode === 'requests' && (
            <p>
              {formatNumber(value)} {t('dashboard.charts.requests')} ({percentage}%)
            </p>
          )}

          {chartMode === 'quota' && (
            <p>
              {formatNumber(value / 1000000)} ({percentage}%)
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  // Custom legend that shows percentages
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className='flex flex-col gap-1 text-xs'>
        {payload?.map((entry: any, index: number) => {
          const item = chartData.find(d => d.name === entry.value);
          if (!item) return null;

          const value = item[chartMode];
          const percentage = ((value / totals[chartMode]) * 100).toFixed(1);

          return (
            <li key={`legend-${index}`} className='flex items-center'>
              <span
                className='inline-block w-3 h-3 mr-2 rounded-sm'
                style={{ backgroundColor: entry.color }}
              />
              <span className='truncate max-w-[150px]' title={entry.value}>
                {entry.value}
              </span>
              <span className='ml-1 text-muted-foreground'>({percentage}%)</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className='h-[300px]'>
      <div className='mb-4 flex gap-2'>
        <Button
          variant={chartMode === 'tokens' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setChartMode('tokens')}
        >
          {t('dashboard.charts.by_tokens')}
        </Button>
        <Button
          variant={chartMode === 'requests' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setChartMode('requests')}
        >
          {t('dashboard.charts.by_requests')}
        </Button>
        <Button
          variant={chartMode === 'quota' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setChartMode('quota')}
        >
          {t('dashboard.charts.by_quota')}
        </Button>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey={chartMode}
              nameKey='name'
              label={false}
              labelLine={false}
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout='vertical'
              verticalAlign='middle'
              align='right'
              content={<CustomLegend />}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className='h-full flex items-center justify-center'>
          <p className='text-muted-foreground'>{t('dashboard.charts.no_data')}</p>
        </div>
      )}
    </div>
  );
};

export default ModelDistributionChart;
