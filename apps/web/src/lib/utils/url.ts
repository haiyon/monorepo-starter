/**
 * Remove trailing slash from URL
 * @param url - URL to process
 * @returns URL without trailing slash
 */
export const removeTrailingSlash = (url: string): string => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
