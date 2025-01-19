'use client';

import * as React from 'react';
import { cn } from '@/lib/common/utils/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function NumberPicker({
  name,
  className,
  placeholder = 'Select a number',
  min = 1,
  max = 100,
}: {
  name: string;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}) {
  const [number, setNumber] = React.useState<number>();

  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <>
      <input type="hidden" name={name} value={number} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !number && 'text-muted-foreground',
            )}
          >
            {number !== undefined ? number : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={className}>
          <div className="max-h-60 overflow-y-auto">
            {numbers.map((num) => (
              <div
                key={num}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => setNumber(num)}
              >
                {num}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}