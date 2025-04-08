/**
 * Convert a timestamp to a formatted date string
 * @param timestamp - Unix timestamp in seconds
 * @param config - Configuration options for formatting
 * @returns Formatted date string
 */
export const formatTimestamp = (
  timestamp: number,
  {
    locale,
    formatOptions = {},
    date = true,
    time = true
  }: {
    locale?: Intl.LocalesArgument;
    formatOptions?: Intl.DateTimeFormatOptions;
    date?: boolean;
    time?: boolean;
  } = {}
): string => {
  if (timestamp === 0) return '';
  // Detect locale
  const detectedLocale =
    locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  // If timestamp is in milliseconds, convert it to seconds
  const localDate = timestamp > 9999999999 ? new Date(timestamp) : new Date(timestamp * 1000);
  // Define date and time formats
  const dateFormat: Intl.DateTimeFormatOptions = date
    ? {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    : {};
  const timeFormat: Intl.DateTimeFormatOptions = time
    ? { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
    : {};

  return localDate.toLocaleString(detectedLocale, {
    ...dateFormat,
    ...timeFormat,
    ...formatOptions
  });
};

/**
 * Format quota for display
 */
export function formatQuota(quota: number, precision: number = 2): string {
  const displayInCurrency = localStorage.getItem('display_in_currency') === 'true';
  const quotaPerUnit = parseFloat(localStorage.getItem('quota_per_unit') || '1');

  if (displayInCurrency) {
    const amount = (quota / quotaPerUnit).toFixed(precision);
    return `$${amount}`;
  }

  return formatNumber(quota);
}

/**
 * Format large numbers
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 10000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
}
