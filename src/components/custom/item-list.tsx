'use client';

import { Input, ScrollArea, Separator } from '@components';
import ItemTypeSelect from '@/components/custom/item-type-select';
import { SearchParamsInterface } from '@/app/page';
import { useWritableSearchParams } from '@/lib/common/hooks/useWritableSearchParams';
import { useDebounce } from '@/lib/common/hooks/useDebounce';
import { DisplayCount } from '@/components/custom/display-count';
import DisplayDate from '@/components/custom/display-date';
import { ItemsDto } from '@service';

export default function ItemList({ items }: { items: ItemsDto[] }) {
  const { searchParams, setParam } =
    useWritableSearchParams<SearchParamsInterface>();

  const handleTypeChange = (value: string) => {
    setParam('type', value);
  };

  const handleNameChange = (value: string) => {
    setParam('name', value);
  };

  const debouncedNameChange = useDebounce(handleNameChange, 500);

  return (
    <>
      <div className="flex w-screen gap-2 p-5">
        <Input
          name="name-search"
          placeholder="Search item..."
          value={searchParams.get('name') || ''}
          onChange={(e) => debouncedNameChange(e.target.value)}
        />
        <ItemTypeSelect
          className="w-[180px]"
          name="type-search"
          value={searchParams.get('type') || ''}
          onValueChange={handleTypeChange}
        />
      </div>
      <div className="flex w-screen justify-center p-5">
        <ScrollArea className="h-72 w-screen rounded-md border">
          <div className="p-4">
            {items.map((item) => (
              <>
                <div
                  key={item.id + '-wrapper'}
                  className="flex justify-between"
                >
                  <div key={item.id} className="text-sm">
                    {item.name}
                  </div>
                  <div key={item.id + '-count'} className="text-xs">
                    <DisplayCount count={item.count} />
                  </div>
                  <div key={item.id + '-expiration'} className="text-xs">
                    <DisplayDate date={item.expiration_date} />
                  </div>
                </div>
                <Separator key={item.id + '-separator'} className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
