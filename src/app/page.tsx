import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@radix-ui/react-select';
import { ListPlus, Search } from 'lucide-react';
import ItemTypeSelect from '@/components/item-type-select';
import { DatePicker } from '@/components/ui/date-picker';
import { getItems } from '@service';

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
