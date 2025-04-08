/**
 * Check if mobile device
 * @returns True if mobile device, false otherwise
 */
export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};
