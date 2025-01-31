'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/common/utils/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  name,
  className,
  placeholder = 'Select a date',
  date,
  onChange,
}: {
  name: string;
  className?: string;
  placeholder?: string;
  date: Date | null;
  onChange: (date: Date | null) => void;
}) {
  return (
    <>
      <input type="hidden" name={name} value={date?.toISOString()} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={className}>
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(newDate) => onChange(newDate ?? null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
