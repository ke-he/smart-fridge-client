'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useItemContext } from '@/contexts/item.provider';
import { ItemsDto } from '@service/item';
import CustomButton from '@/components/custom/misc/button/custom-button';

export default function ItemDetail() {
  const router = useRouter();
  const { itemId } = useParams();
  const { items } = useItemContext();

  const [item, setItem] = useState<ItemsDto | null>(null);

  useEffect(() => {
    console.log('itemId', itemId);
    if (itemId?.length && items) {
      console.log('itemId', itemId);
      const foundItem = items.find((i) => i.id === parseInt(itemId[0]));
      if (foundItem) {
        setItem(foundItem);
      } else {
        router.replace('/404');
      }
    }
  }, [itemId, items, router]);

  if (!item) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <img
        src={'/placeholder.png'}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg my-4"
      />
      <p>
        <strong>Type:</strong> {item.item_type_id}
      </p>
      <p>
        <strong>Quantity:</strong> {'test-quantity'}
      </p>
      <p>
        <strong>Expiration Date:</strong> {'test-expiration-date'}
      </p>
      <CustomButton onClick={() => router.push('/inventory')}>
        Back to Inventory
      </CustomButton>
    </div>
  );
}
