'use client';

import ItemCard from '@/components/custom/item/card/item-card';
import { useItemContext } from '@/contexts/item.provider';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const { itemsNearExpiry, itemsLastAdded } = useItemContext();

  const handleSeeAllClick = () => {
    router.push('/inventory');
  };

  return (
    <div className="flex flex-col p-3 mb-5">
      {/* Items nearing expiry */}
      <div className="flex flex-col md:w-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-xl">Items nearing expiry</h2>
          <h3
            className="font-bold underline cursor-pointer text-green-700"
            onClick={handleSeeAllClick}
          >
            See all
          </h3>
        </div>

        {/* Mobile: Horizontales Scrollen | Desktop: Grid Layout */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-hidden">
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
                    expiration_date: 'MAR 05',
                  },
                }}
              />
            ))
          ) : (
            <p className="text-gray-500">No items near expiry</p>
          )}
        </div>
      </div>

      {/* Last added items */}
      <div className="flex flex-col mt-10 md:w-full">
        <h2 className="font-bold text-xl mb-3">Last added</h2>

        {/* Mobile: Liste | Desktop: Grid */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
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
                  },
                }}
              />
            ))
          ) : (
            <p className="text-gray-500">No items added</p>
          )}
        </div>
      </div>
    </div>
  );
}
