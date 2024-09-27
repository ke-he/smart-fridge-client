'use server';

import { Button, DatePicker, Input, ItemTypeSelect } from '@components';
import { ListPlus } from 'lucide-react';
import { ItemTypeTable } from '@lib/database';
import { addItem } from '@service';

export default async function ItemAdd({ types }: { types: ItemTypeTable[] }) {
  const handleAddItem = async (formData: FormData) => {
    'use server';
    const itemName = formData.get('itemName') as string;
    const itemExpirationDate = formData.get('itemExpirationDate') as string;
    const itemType = formData.get('itemType') as string;

    await addItem({
      name: itemName,
      expiration_date: new Date(itemExpirationDate),
      item_type_id: parseInt(itemType),
    });
  };

  return (
    <form action={handleAddItem}>
      <div className="flex gap-2 p-5 pb-2">
        <Input name="itemName" className="w-100" placeholder="New Item Name" />
        <DatePicker
          name="itemExpirationDate"
          className="w-100"
          placeholder="Expiraton date"
        />
      </div>
      <div className="flex gap-2 p-5 pt-2">
        <ItemTypeSelect name="itemType" types={types} className="w-100" />
        <Button className="w-100" type="submit">
          <ListPlus />
        </Button>
      </div>
    </form>
  );
}
