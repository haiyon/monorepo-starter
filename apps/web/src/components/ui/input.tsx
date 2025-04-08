import * as React from 'react';

import { cn } from '@monorepo/utils';
import { X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, clearable, onClear, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || '');
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Combine the external ref with our internal ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Update internal value state when external value changes
    React.useEffect(() => {
      setValue(props.value || '');
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    const handleClear = () => {
      setValue('');
      if (inputRef.current) {
        const event = new Event('change', { bubbles: true });
        Object.defineProperty(event, 'target', { value: { value: '' }, enumerable: true });
        inputRef.current.dispatchEvent(event);
        inputRef.current.focus();
      }
      onClear?.();
    };

    return (
      <div className='relative flex items-center w-full'>
        {icon && (
          <div className='absolute left-3 flex items-center pointer-events-none text-muted-foreground'>
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            icon && 'pl-10',
            clearable && !!value && 'pr-10',
            className
          )}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {clearable && !!value && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-3 flex items-center justify-center h-5 w-5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors'
            aria-label='Clear input'
          >
            <X className='h-3.5 w-3.5' />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
