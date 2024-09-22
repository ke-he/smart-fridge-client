'use server';

import { ListPlus, Search } from 'lucide-react';
import { getItems } from '@service';
import {
  Input,
  ThemeToggle,
  Button,
  ScrollArea,
  Separator,
  DatePicker,
} from '@components';
import ItemTypeSelect from '@/components/custom/item-type-select';

export default async function Home() {
  const items = await getItems();
  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex w-screen justify-start p-5">
        <h1 className="text-3xl font-bold">Smart Fridge Manager</h1>
        <ThemeToggle />
      </header>
      <div className="flex w-screen gap-2 p-5">
        <Input placeholder="Test" />
        <ItemTypeSelect />
        <Button>
          <Search />
        </Button>
      </div>
      <div className="flex w-screen justify-center p-5">
        <ScrollArea className="h-72 w-screen rounded-md border">
          <div className="p-4">
            {items.map((item) => (
              <>
                <div key={item.id} className="text-sm">
                  {item.name}
                </div>
                <Separator key={item.id + '-seperate'} className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex w-screen flex-wrap gap-2 p-5 align-bottom">
        <div className="flex gap-2 w-screen">
          <Input placeholder="New Item Name" />
          <DatePicker placeholder="Expiraton date" />
        </div>
        <div className="flex w-screen justify-between gap-2">
          <ItemTypeSelect />
          <Button>
            <ListPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}
