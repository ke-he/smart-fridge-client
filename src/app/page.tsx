'use client';

import { ThemeToggle } from '@components';
import { ItemList } from '@/components/custom/item-list';
import ItemAdd from '@/components/custom/item-add';
import ItemProvider from '@/contexts/item.provider';

export default function Home() {
  return (
    <ItemProvider>
      <div className="flex h-screen w-screen flex-col">
        <header className="flex w-screen justify-start p-5">
          <h1 className="text-3xl font-bold gap-3 align-bottom">
            <span>Smart Fridge Manager</span>
            <span className="text-muted-foreground text-sm p-2.5">/home</span>
          </h1>
          <ThemeToggle />
        </header>
        <ItemList />
        <ItemAdd />
      </div>
    </ItemProvider>
  );
}
