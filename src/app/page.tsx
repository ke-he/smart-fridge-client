'use server';

import { ListPlus } from 'lucide-react';
import { getItems, ItemsDtoFilter } from '@service';
import { Input, ThemeToggle, Button, DatePicker } from '@components';
import ItemTypeSelect from '@/components/custom/item-type-select';
import ItemList from '@/components/custom/item-list';

export type SearchParamsInterface = ItemsDtoFilter;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParamsInterface;
}) {
  const items = await getItems(searchParams);

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex w-screen justify-start p-5">
        <h1 className="text-3xl font-bold gap-3 align-bottom">
          <span>Smart Fridge Manager</span>
          <span className="text-muted-foreground text-sm p-2.5">/home</span>
        </h1>
        <ThemeToggle />
      </header>
      <ItemList items={items} />
      <div className="flex gap-2 p-5 pb-2">
        <Input className="w-100" placeholder="New Item Name" />
        <DatePicker className="w-100" placeholder="Expiraton date" />
      </div>
      <div className="flex gap-2 p-5 pt-2">
        <ItemTypeSelect className="w-100" />
        <Button className="w-100">
          <ListPlus />
        </Button>
      </div>
    </div>
  );
}
