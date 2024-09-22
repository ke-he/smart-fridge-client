import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@radix-ui/react-select';
import { ListPlus, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="flex justify-start w-screen p-5">
        <h1 className="text-3xl font-bold">Smart Fridge Manager</h1>
        <ThemeToggle />
      </header>
      <div className="w-screen flex gap-2 p-5">
        <Input placeholder="Test" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>
          <Search size={20} className="mr-1.5" />
          Search
        </Button>
      </div>
      <div className="w-screen p-5 flex justify-center">
        <ScrollArea className="w-screen h-72 rounded-md border">
          <div className="p-4">
            <h2 className="mb-4 font-medium leading-none">Items in stock</h2>
            <div key="test" className="text-sm">
              Test
            </div>
            <Separator className="my-2" />
          </div>
        </ScrollArea>
      </div>
      <div className="flex align-bottom gap-2 p-5">
        <Input placeholder="New Item Name" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>
          <ListPlus />
        </Button>
      </div>
    </div>
  );
}
