'use client';

import ItemCard from '@/components/custom/item/card/item-card';
import { useItemContext } from '@/contexts/item.provider';
import { useEffect, useState } from 'react';
import { ItemsDto } from '@service/item';

export default function Home() {
  const [itemsNearExpiry, setItemsNearExpiry] = useState<ItemsDto[]>([]);
  const [itemsLastAdded, setItemsLastAdded] = useState<ItemsDto[]>([]);

  const { loadItemsNearExpiry, loadItemsLastAdded } = useItemContext();

  useEffect(() => {
    loadItemsNearExpiry().then((items) => {
      setItemsNearExpiry(items);
    });
    loadItemsLastAdded().then((items) => {
      setItemsLastAdded(items);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col w-100 justify-center p-3 mb-5">
        <div className="flex justify-between">
          <h2 className="font-bold">Items nearing expiry</h2>
          <h3
            className="font-bold underline"
            style={{ color: 'var(--custom-green-dark)' }}
          >
            See all
          </h3>
        </div>
        <div className={'flex overflow-x-auto w-100 gap-3 justify-center pt-5'}>
          {itemsNearExpiry.length > 0 ? (
            itemsNearExpiry.map((item) => (
              <ItemCard
                key={item.id}
                parentParam={{
                  itemCardBig: {
                    id: item.id,
                    name: item.name,
                    item_type_id: item.item_type_id,
                    quantity: 3,
                    img_url: 'test',
                    expiration_date: 'MAR 05',
                  },
                }}
              />
            ))
          ) : (
            <p>No items near expiry</p>
          )}
        </div>
      </div>
      <div className={'flex flex-col w-screen justify-center p-3'}>
        <h2 className="font-bold">Last added</h2>
        <div className={'flex flex-col w-100 gap-3 justify-center pt-5'}>
          {itemsLastAdded.length > 0 ? (
            itemsLastAdded.map((item) => (
              <ItemCard
                key={item.id}
                parentParam={{
                  itemCardSmall: {
                    id: item.id,
                    name: item.name,
                    item_type_id: item.item_type_id,
                    quantity: 3,
                    img_url: 'test',
                  },
                }}
              />
            ))
          ) : (
            <p>No items added</p>
          )}
        </div>
      </div>
    </>
  );
}
