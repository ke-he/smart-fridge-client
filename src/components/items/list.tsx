'use client';

import ItemTypeSelect from '@/components/item-type-select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@radix-ui/react-select';
import { useItemsContext } from './context';

export function ItemList() {
  const { setItemType, searchQuery, setSearchQuery, itemType, items } =
    useItemsContext();

  return (
    <>
      <Input
        placeholder="Test"
        name="query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ItemTypeSelect
        name="itemType"
        value={itemType}
        onValueChange={(newType) => setItemType(newType)}
      />
      <div className="flex w-screen justify-center p-5">
        <ScrollArea className="h-72 w-screen rounded-md border">
          <div className="p-4">
            {items.map((item, i, arr) => (
              <>
                <div key={item.id} className="text-sm">
                  {item.name}
                </div>
                {i !== arr.length - 1 && <Separator className="my-2" />}
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
