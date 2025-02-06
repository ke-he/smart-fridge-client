'use client';

import Filter from '@/components/custom/misc/filter';
import Sort, { SortOrder } from '@/components/custom/misc/sort';
import { useItemContext } from '@/contexts/item.provider';
import ItemCard from '@/components/custom/item/card/item-card';
import { useEffect, useState } from 'react';
import { ItemsDto } from '@service/item';

const MyForm = () => (
  <>
    <div>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        style={{
          width: '100%',
          padding: '8px',
          margin: '5px 0',
          boxSizing: 'border-box',
          border: '1px solid grey',
          borderRadius: '8px',
        }}
      />
    </div>
  </>
);

const sortItems = (items: ItemsDto[], order: SortOrder) => {
  return [...items].sort((a, b) => {
    return order === SortOrder.ASC
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
};

export default function Inventory() {
  const { items } = useItemContext();
  const [filteredItems, setFilteredItems] = useState<ItemsDto[]>([]);
  const [_, setSortOrder] = useState(SortOrder.ASC);

  const handleFormSubmit = (
    values: Record<string, string | number | null | undefined>,
  ) => {
    const { search } = values;
    let filtered = [...items];

    if (search) {
      const searchLower = search.toString().toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchLower),
      );
    }

    setFilteredItems(filtered);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    setFilteredItems(sortItems(filteredItems, order));
  };

  useEffect(() => {
    setFilteredItems(sortItems(items, SortOrder.ASC));
  }, []);

  return (
    <>
      <div className="flex flex-col w-full justify-center p-3 mb-5">
        <div className="flex justify-between">
          <Filter form={<MyForm />} onSubmit={handleFormSubmit} />
          <Sort onSortChange={handleSortChange} />
        </div>
        <div
          style={{ paddingBottom: '120px' }}
          className="flex flex-col gap-4 mt-8 overflow-y-auto"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                parentParam={{
                  itemCardSmall: {
                    id: item.id,
                    name: item.name,
                    item_type_id: item.item_type_id,
                    quantity: 3,
                    image_url: item.image_url,
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
