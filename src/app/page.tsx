'use client';

import ItemProvider from '@/contexts/item.provider';
import ItemCard, {
  ItemCardTypeBig,
  ItemCardTypeSmall,
} from '@/components/custom/item-card';
import { Bell, Search } from 'lucide-react';

const testObject: ItemCardTypeSmall = {
  id: 1,
  name: 'Banana',
  item_type_id: 1,
  quantity: 3,
  img_url: 'test',
};

const testObject2: ItemCardTypeBig = {
  id: 1,
  name: 'Banana',
  item_type_id: 1,
  quantity: 3,
  img_url: 'test',
  expiration_date: 'MAR 05',
};

export default function Home() {
  return (
    <ItemProvider>
      <div className="flex h-screen w-screen flex-col">
        <header className="flex w-screen justify-between items-center p-3 mb-5">
          <Search />
          <span className="pageTitle">home</span>
          <Bell />
        </header>
        <div className="flex flex-col w-100 justify-center p-3">
          <div className="flex justify-between">
            <h2 className="font-bold">Items nearing expiry</h2>
            <h3
              className="font-bold underline"
              style={{ color: 'var(--custom-green-dark)' }}
            >
              See all
            </h3>
          </div>
          <div
            className={'flex overflow-x-auto w-100 gap-3 justify-center pt-5'}
          >
            <ItemCard parentParam={{ itemCardBig: testObject2 }} />
            <ItemCard parentParam={{ itemCardBig: testObject2 }} />
            <ItemCard parentParam={{ itemCardBig: testObject2 }} />
            <ItemCard parentParam={{ itemCardBig: testObject2 }} />
          </div>
        </div>
        <div className={'flex flex-col w-screen justify-center p-3'}>
          <h2 className="font-bold">Last added</h2>
          <div className={'flex flex-col w-100 gap-3 justify-center pt-5'}>
            <ItemCard parentParam={{ itemCardSmall: testObject }} />
            <ItemCard parentParam={{ itemCardSmall: testObject }} />
            <ItemCard parentParam={{ itemCardSmall: testObject }} />
          </div>
        </div>
      </div>
    </ItemProvider>
  );
}
