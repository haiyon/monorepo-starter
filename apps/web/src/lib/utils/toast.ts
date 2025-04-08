import type { ToastPosition } from '@/components/ui/toast';
import { setToastPosition, toast } from '@/hooks/use-toast';

/**
 * Set the global position for all toasts
 * @param position - The position to display toasts
 */
export function setToastGlobalPosition(position: ToastPosition) {
  setToastPosition(position);
}

/**
 * Display an error toast notification
 * @param message - The error message to display
 * @param options - Optional configuration
 * @param options.duration - Toast display duration in milliseconds (default: 5000)
 * @param options.position - Position to display toast (overrides global setting)
 */
export function showError(
  message: string,
  options?: { title?: string; duration?: number; position?: ToastPosition }
) {
  toast({
    variant: 'destructive',
    title: options?.title || 'Error',
    description: message,
    duration: options?.duration ?? 2500,
    position: options?.position
  });
}

/**
 * Display a success toast notification
 * @param message - The success message to display
 * @param options - Optional configuration
 * @param options.duration - Toast display duration in milliseconds (default: 3000)
 * @param options.position - Position to display toast (overrides global setting)
 */
export function showSuccess(
  message: string,
  options?: { title?: string; duration?: number; position?: ToastPosition }
) {
  toast({
    variant: 'success',
    title: options?.title || 'Success',
    description: message,
    duration: options?.duration ?? 3000,
    position: options?.position
  });
}

/**
 * Display a warning toast notification
 * @param message - The warning message to display
 * @param options - Optional configuration
 * @param options.duration - Toast display duration in milliseconds (default: 4000)
 * @param options.position - Position to display toast (overrides global setting)
 */
export function showWarning(
  message: string,
  options?: { title?: string; duration?: number; position?: ToastPosition }
) {
  toast({
    variant: 'warning',
    title: options?.title || 'Warning',
    description: message,
    duration: options?.duration ?? 2000,
    position: options?.position
  });
}

/**
 * Display an info toast notification
 * @param message - The info message to display
 * @param options - Optional configuration
 * @param options.duration - Toast display duration in milliseconds (default: 3000)
 * @param options.position - Position to display toast (overrides global setting)
 */
export function showInfo(
  message: string,
  options?: { title?: string; duration?: number; position?: ToastPosition }
) {
  toast({
    variant: 'info',
    title: options?.title || 'Info',
    description: message,
    duration: options?.duration ?? 1500,
    position: options?.position
  });
}

/**
 * Display a notice toast notification
 * @param message - The notice message to display
 * @param options - Optional configuration
 * @param options.duration - Toast display duration in milliseconds (default: 3000)
 * @param options.position - Position to display toast (overrides global setting)
 */
export function showNotice(
  message: string,
  options?: { title?: string; duration?: number; position?: ToastPosition }
) {
  toast({
    variant: 'info',
    title: options?.title || 'Notice',
    description: message,
    duration: options?.duration ?? 1500,
    position: options?.position
  });
}
