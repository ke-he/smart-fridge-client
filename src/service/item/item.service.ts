'use server';

import {
  ITEM_TABLE_NAME,
  ITEM_TYPE_TABLE_NAME,
  ItemTable,
  ItemTypeTable,
  DatabaseService,
} from '@lib/database';
import { ServiceInterface } from '@lib/common';

export interface ItemsDto extends ItemTable {
  count: number;
}

export interface ItemsDtoFilter {
  name: string;
  type: number;
}

class ItemService extends ServiceInterface {
  static async getItems(search?: ItemsDtoFilter): Promise<ItemsDto[]> {
    const query = DatabaseService.getInstance()
      .table<ItemsDto>(ITEM_TABLE_NAME)
      .select('*', {
        count: DatabaseService.getInstance().raw('COUNT(*)'),
      })
      .groupBy('id');

    if (search?.name != null) {
      void query.where('name', 'like', `%${search.name}%`);
    }

    if (search?.type != null) {
      void query.where('item_type_id', search.type);
    }

    return query;
  }

  static async getItemTypes(): Promise<ItemTypeTable[]> {
    return DatabaseService.getInstance()
      .table<ItemTypeTable>(ITEM_TYPE_TABLE_NAME)
      .select('*');
  }
}

export const getItems = async (search?: ItemsDtoFilter) =>
  await ItemService.getItems(search);
export const getItemTypes = async () => await ItemService.getItemTypes();
