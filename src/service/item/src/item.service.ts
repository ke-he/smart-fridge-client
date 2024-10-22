'use server';

import {
  ITEM_TABLE_NAME,
  ITEM_TYPE_TABLE_NAME,
  ItemTable,
  ItemTypeTable,
  DatabaseService,
  ItemHomeLinkTable,
  ITEM_HOME_LINK_TABLE_NAME,
} from '@lib/database';
import { ServiceInterface } from '@lib/common';
import { revalidatePath } from 'next/cache';

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

  static async addItem(item: Omit<ItemTable, 'id'>): Promise<void> {
    await DatabaseService.getInstance()
      .table<ItemTable>(ITEM_TABLE_NAME)
      .insert(item);

    revalidatePath('/');
  }

  static async getItemTypes(): Promise<ItemTypeTable[]> {
    return DatabaseService.getInstance()
      .table<ItemTypeTable>(ITEM_TYPE_TABLE_NAME)
      .select('*');
  }

  static async increaseItem(id: number): Promise<void> {
    await DatabaseService.getInstance()
      .table<ItemHomeLinkTable>(ITEM_HOME_LINK_TABLE_NAME)
      .insert({ item_id: id, home_id: 1 });

    revalidatePath('/');
  }
}

export const getItems = async (search?: ItemsDtoFilter) =>
  await ItemService.getItems(search);

export const getItemTypes = async () => await ItemService.getItemTypes();

export const addItem = async (item: Omit<ItemTable, 'id'>) =>
  await ItemService.addItem(item);

export const increaseItem = async (id: number) =>
  await ItemService.increaseItem(id);
