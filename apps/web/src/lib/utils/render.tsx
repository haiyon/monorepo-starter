import React from 'react';

import { Badge } from '@/components/ui/badge';

/**
 * Formats a number for display with thousands separators
 * @param num - The number to format
 * @returns Formatted number string
 */
export function renderNumber(num?: number | string): string {
  if (num === undefined) return '0';
  if (typeof num === 'string') num = parseInt(num);
  return num.toLocaleString();
}

/**
 * Renders quota values consistently with proper formatting
 * @param quota - The quota value to render
 * @param t - Translation function
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted quota string
 */
export function renderQuota(quota?: number, t?: any, decimals: number = 2): string {
  if (quota === undefined) return '0';

  // If in display currency mode
  const displayInCurrency = localStorage.getItem('display_in_currency') === 'true';
  if (displayInCurrency) {
    const quotaPerUnit = parseFloat(localStorage.getItem('quota_per_unit') || '0.002');
    if (quotaPerUnit <= 0) return renderNumber(quota);

    const dollars = quota * quotaPerUnit;
    return '$' + dollars.toFixed(decimals);
  }

  // Regular quota display
  return renderNumber(quota);
}

/**
 * Renders quota with additional context for input fields
 * @param quota - The quota value
 * @param t - Translation function
 * @returns Formatted string with context
 */
export function renderQuotaWithPrompt(quota: number, t: any): string {
  if (quota === undefined) quota = 0;

  const displayInCurrency = localStorage.getItem('display_in_currency') === 'true';
  if (displayInCurrency) {
    const quotaPerUnit = parseFloat(localStorage.getItem('quota_per_unit') || '0.002');
    if (quotaPerUnit <= 0) return ` (${renderNumber(quota)})`;

    const dollars = quota * quotaPerUnit;
    return ` ($${dollars.toFixed(6)})`;
  }

  return ` (${renderNumber(quota)})`;
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text - The text to truncate
 * @param length - Maximum length (default: 36)
 * @returns Truncated text
 */
export function renderText(text?: string, length: number = 36): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Renders a user or channel group with appropriate styling
 * @param group - The group name
 * @returns JSX element with the group display
 */
export function renderGroup(group?: string): React.ReactNode {
  if (!group || group === '' || group === 'default') {
    return <Badge variant='outline'>default</Badge>;
  }

  const groups = group.split(',');
  return (
    <div className='flex flex-wrap gap-1'>
      {groups.map(g => (
        <Badge key={g} variant='outline' className='bg-blue-50 text-blue-700 border-blue-200'>
          {g}
        </Badge>
      ))}
    </div>
  );
}

/**
 * Renders a colored label for models, tokens, etc.
 * @param text - The text to display
 * @returns JSX element with the colored label
 */
export function renderColorLabel(text: string): React.ReactNode {
  if (!text) return null;

  // Generate a deterministic color based on the text
  const hashCode = text.split('').reduce((hash, char) => {
    return (hash << 5) - hash + char.charCodeAt(0);
  }, 0);

  // Map the hash to one of several predefined colors
  const colors = [
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'indigo',
    'gray',
    'red',
    'orange',
    'teal'
  ];
  const colorIndex = Math.abs(hashCode) % colors.length;
  const color = colors[colorIndex];

  return (
    <Badge variant='outline' className={`bg-${color}-50 text-${color}-700 border-${color}-200`}>
      {text}
    </Badge>
  );
}
