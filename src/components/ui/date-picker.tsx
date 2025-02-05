'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  name,
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
          <button className="date-picker">
            <CalendarIcon className="mr-2 h-4 w-4 text-[#1E2B19]" />
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="date-picker-popover">
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
