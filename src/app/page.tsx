import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@radix-ui/react-select';
import { ListPlus, Search } from 'lucide-react';
import ItemTypeSelect from '@/components/item-type-select';
import { DatePicker } from '@/components/ui/date-picker';

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="flex justify-start w-screen p-5">
        <h1 className="text-3xl font-bold">Smart Fridge Manager</h1>
        <ThemeToggle />
      </header>
      <div className="w-screen flex gap-2 p-5">
        <Input placeholder="Test" />
        <ItemTypeSelect />
        <Button>
          <Search />
        </Button>
      </div>
      <div className="w-screen p-5 flex justify-center">
        <ScrollArea className="w-screen h-72 rounded-md border">
          <div className="p-4">
            <Separator className="my-2" />
            <div key="test" className="text-sm">
              Test
            </div>
            <Separator className="my-2" />
            <div key="test" className="text-sm">
              Test
            </div>
            <Separator className="my-2" />
          </div>
        </ScrollArea>
      </div>
      <div className="flex align-bottom gap-2 p-5">
        <Input placeholder="New Item Name" />
        <DatePicker />
        <ItemTypeSelect />
        <Button>
          <ListPlus />
        </Button>
      </div>
    </div>
  );
}
