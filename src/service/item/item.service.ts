'use server';

import {
  ITEM_TABLE_NAME,
  ITEM_TYPE_TABLE_NAME,
  ItemTable,
  ItemTypeTable,
} from '@lib/database';
import { ServiceInterface } from '@lib/common';
import { DatabaseService } from '@/lib/database/service/database.service';

class ItemService extends ServiceInterface {
  static async getItems(): Promise<ItemTable[]> {
    return DatabaseService.getInstance()
      .table<ItemTable>(ITEM_TABLE_NAME)
      .select('*');
  }

  static async getItemTypes(): Promise<ItemTypeTable[]> {
    return DatabaseService.getInstance()
      .table<ItemTypeTable>(ITEM_TYPE_TABLE_NAME)
      .select('*');
  }
}

export const getItems = async () => await ItemService.getItems();
export const getItemTypes = async () => await ItemService.getItemTypes();
