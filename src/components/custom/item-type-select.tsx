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
  nullable = false,
  className,
  name,
  value,
  onValueChange,
}: {
  types: ItemTypeTable[];
  nullable?: boolean;
  className?: string;
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  // the value null error is wrong, it is possible to have a null value
  return (
    <div className={className}>
      <Select name={name} value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {nullable && <SelectItem value={null}>All</SelectItem>}
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
