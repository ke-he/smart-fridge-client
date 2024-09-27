'use server';

import AddItemForm from '@/components/items/add';
import { ItemList } from '@/components/items/list';
import { ThemeToggle } from '@/components/theme-toggle';
import { getItems } from '@/lib/services/items';

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const items = await getItems(searchParams);

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex w-screen justify-start p-5">
        <h1 className="text-3xl font-bold">Smart Fridge Manager</h1>
        <ThemeToggle />
      </header>
      <ItemList items={items} />
      <AddItemForm />
    </div>
  );
}
