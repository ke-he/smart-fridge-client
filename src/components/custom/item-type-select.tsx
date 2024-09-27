'use server';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components';
import { getItemTypes } from '@service';

export default async function ItemTypeSelect({
  className,
  name,
  value,
  onValueChange,
}: {
  className?: string;
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const types = await getItemTypes();
  return (
    <div className={className}>
      <Select name={name} value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
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
