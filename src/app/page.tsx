'use server';

import ItemTypeSelect from '@/components/item-type-select';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getItems } from '@/lib/services/items';
import { Separator } from '@radix-ui/react-select';
import { ListPlus, Search } from 'lucide-react';
import { addItem } from './actions';

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
      <form action={addItem}>
        <div className="flex w-screen flex-wrap gap-2 p-5 align-bottom">
          <div className="flex gap-2 w-screen">
            <Input placeholder="New Item Name" name="name" />
            <DatePicker placeholder="Expiraton date" name="expirationDate" />
          </div>
          <div className="flex w-screen justify-between gap-2">
            <ItemTypeSelect />
            <Button type="submit">
              <ListPlus />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
