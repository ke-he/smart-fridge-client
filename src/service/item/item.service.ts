'use server';

import { ITEM_TABLE_NAME, ItemTable } from '@lib/database';
import { ServiceInterface } from '@lib/common';
import { DatabaseService } from '@/lib/database/service/database.service';

class ItemService extends ServiceInterface {
  static async getItems(): Promise<ItemTable[]> {
    return DatabaseService.getInstance()
      .table<ItemTable>(ITEM_TABLE_NAME)
      .select('*');
  }
}

export const getItems = async () => await ItemService.getItems();
