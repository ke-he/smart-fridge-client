'use client';

import ItemTypeSelect from '@/components/item-type-select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWritableSearchParams } from '@/lib/hooks/useWritableSearchParams';
import { Item } from '@/lib/services/items';
import { Separator } from '@radix-ui/react-select';

export function ItemList({ items }: { items: Item[] }) {
  const { searchParams, setParam } = useWritableSearchParams();

  return (
    <>
      <Input
        placeholder="Test"
        name="query"
        value={searchParams.get('query') || ''}
        onChange={(e) => setParam('query', e.target.value)}
      />
      <ItemTypeSelect
        name="itemType"
        value={searchParams.get('type') || ''}
        onValueChange={(value) => setParam('type', value)}
      />
      <div className="flex w-screen justify-center p-5">
        <ScrollArea className="h-72 w-screen rounded-md border">
          <div className="p-4">
            {items.map((item, i, arr) => (
              <>
                <div key={item.id + '-wrapper'} className="text-sm">
                  {item.name}
                </div>
                {i !== arr.length - 1 && (
                  <Separator className="my-2" key={`${item.id}-separator`} />
                )}
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
