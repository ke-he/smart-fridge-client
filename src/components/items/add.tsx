'use server';

import { addItem } from '@/app/actions';
import ItemTypeSelect from '@/components/item-type-select';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { ListPlus } from 'lucide-react';

export default async function AddItemForm() {
  return (
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
  );
}
