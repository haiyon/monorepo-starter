interface LoadingProps {
  className?: string;
  children?: React.ReactNode;
}
export const Loading = ({ className, children }: LoadingProps) => (
  <div className={`flex h-screen flex-col items-center justify-center ${className}`}>
    <div className='h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
    {children && <div className='py-4 text-gray-500 text-md'>{children}</div>}
  </div>
);
