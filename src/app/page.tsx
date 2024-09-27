'use server';

import AddItemForm from '@/components/items/add';
import { ItemsContextProvider } from '@/components/items/context';
import { ItemList } from '@/components/items/list';
import { ThemeToggle } from '@/components/theme-toggle';
import { getItems } from '@/lib/services/items';

export default async function Home() {
  const items = await getItems();

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex w-screen justify-start p-5">
        <h1 className="text-3xl font-bold">Smart Fridge Manager</h1>
        <ThemeToggle />
      </header>
      <ItemsContextProvider items={items}>
        <ItemList />
        <AddItemForm />
      </ItemsContextProvider>
    </div>
  );
}
