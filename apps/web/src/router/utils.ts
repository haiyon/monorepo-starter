const ADMIN_PREFIX = import.meta.env.VITE_ADMIN_PREFIX || '/hodor';
/**
 * Adds admin prefix to routes
 * @param path Original route path
 * @returns Prefixed admin route path
 */
export const adminPath = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${ADMIN_PREFIX}${normalizedPath}`;
};
