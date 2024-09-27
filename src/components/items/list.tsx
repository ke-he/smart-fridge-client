'use client';

import ItemTypeSelect from '@/components/item-type-select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Item } from '@/lib/services/items';
import { Separator } from '@radix-ui/react-select';
import { useRouter, useSearchParams } from 'next/navigation';

export function ItemList({ items }: { items: Item[] }) {
  const { replace } = useRouter();
  const params = useSearchParams();

  return (
    <>
      <Input
        placeholder="Test"
        name="query"
        value={params.get('query') || ''}
        onChange={(e) => {
          const query = e.target.value;
          const params = new URLSearchParams();
          if (!query) {
            params.delete('query');
          } else {
            params.set('query', query);
          }
          const url = new URL(window.location.href);
          url.search = params.toString();
          replace(url.toString());
        }}
      />
      <ItemTypeSelect name="itemType" value={params.get('type') || ''} />
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
