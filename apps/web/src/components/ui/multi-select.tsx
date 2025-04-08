import * as React from 'react';

import { cn } from '@monorepo/utils';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface MultiSelectItem {
  value: string;
  label: string;
}

interface MultiSelectProps {
  placeholder?: string;
  values: string[];
  options: MultiSelectItem[];
  onChange: (values: string[]) => void;
  className?: string;
  badgeClassName?: string;
  maxHeight?: number;
}

export function MultiSelect({
  placeholder = 'Select options...',
  values = [],
  options = [],
  onChange,
  className,
  badgeClassName,
  maxHeight = 300
}: MultiSelectProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [customOptions, setCustomOptions] = React.useState<MultiSelectItem[]>([]);

  // Find option by value
  const findOption = (value: string) => {
    return [...options, ...customOptions].find(option => option.value === value);
  };

  // Add custom option from search input if it doesn't exist
  const addCustomOption = () => {
    if (
      searchValue &&
      !options.some(option => option.value === searchValue) &&
      !customOptions.some(option => option.value === searchValue) &&
      !values.includes(searchValue)
    ) {
      const newOption = { value: searchValue, label: searchValue };
      setCustomOptions(prev => [...prev, newOption]);
      onChange([...values, searchValue]);
      setSearchValue('');
    }
  };

  // Remove selected item
  const removeItem = (value: string) => {
    onChange(values.filter(item => item !== value));
  };

  // Add or remove item based on current selection
  const toggleItem = (value: string) => {
    if (values.includes(value)) {
      removeItem(value);
    } else {
      onChange([...values, value]);
    }
  };

  // Find matching options based on search value
  const filteredOptions = [...options, ...customOptions].filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Clear search when popover closes
  React.useEffect(() => {
    if (!open) {
      setSearchValue('');
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between ${values.length > 0 ? 'h-auto min-h-10' : 'h-10'} ${className}`}
          onClick={() => setOpen(!open)}
        >
          <div className='flex flex-wrap gap-1'>
            {values.length > 0 ? (
              values.map(value => {
                const option = findOption(value);
                return (
                  <Badge
                    key={value}
                    variant='secondary'
                    className={cn('mr-1 mb-1', badgeClassName)}
                  >
                    {option ? option.label : value}
                    <button
                      className='ml-1 rounded-full outline-hidden ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      onMouseDown={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeItem(value);
                      }}
                    >
                      <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                    </button>
                  </Badge>
                );
              })
            ) : (
              <span className='text-sm text-muted-foreground'>{placeholder}</span>
            )}
          </div>
          <div className='opacity-0'>
            <X className='h-4 w-4' />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='start'>
        <Command className='w-full'>
          <CommandInput
            placeholder={t('common.search')}
            value={searchValue}
            onValueChange={setSearchValue}
            className='h-9'
          />
          <ScrollArea className={`max-h-[${maxHeight}px] overflow-auto`}>
            <CommandGroup className='max-h-full overflow-auto'>
              <CommandEmpty>
                {searchValue ? (
                  <Button
                    variant='ghost'
                    className='w-full justify-start text-left text-sm'
                    onClick={addCustomOption}
                  >
                    {t('common.add')} "{searchValue}"
                  </Button>
                ) : (
                  t('common.no_results')
                )}
              </CommandEmpty>
              {filteredOptions.map(option => {
                const isSelected = values.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleItem(option.value)}
                    className='cursor-pointer'
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-xs border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <svg
                        className='h-3 w-3'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
