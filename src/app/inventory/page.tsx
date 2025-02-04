'use client';

import Filter from '@/components/custom/misc/filter';
import Sort, { SortOrder } from '@/components/custom/misc/sort';
import { useItemContext } from '@/contexts/item.provider';
import ItemCard from '@/components/custom/item/card/item-card';

export default function Inventory() {
  const { items } = useItemContext();

  return (
      <>
        <div className="flex flex-col w-full justify-center p-3 mb-5">
          <div className="flex justify-between">
            <Filter
                form={undefined}
                onSubmit={function (
                    values: Record<string, string | number | null | undefined>,
                ): void {
                  console.log(values);
                }}
            />
            <Sort
                onSortChange={function (order: SortOrder): void {
                  console.log(order);
                }}
            />
          </div>
          {/* Grid-Layout für Items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 overflow-y-auto">
            {items.length > 0 ? (
                items.map((item) => (
                    <ItemCard
                        key={item.id}
                        parentParam={{
                          itemCardSmall: {
                            id: item.id,
                            name: item.name,
                            item_type_id: item.item_type_id,
                            quantity: 3,
                          },
                        }}
                    />
                ))
            ) : (
                <p className="text-center col-span-4">No items near expiry</p>
            )}
          </div>
        </div>
      </>
  );
}
