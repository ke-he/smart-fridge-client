'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components';
import { ItemTypeTable } from '@lib/database';

export function ItemTypeSelect({
  types,
  className,
  name,
  value,
  onValueChange,
}: {
  types: ItemTypeTable[];
  className?: string;
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <div className={className}>
      <Select name={name} value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={null}>All</SelectItem>
            {types.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
