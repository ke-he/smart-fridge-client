'use server';

import { ItemTable, ItemTypeTable } from '@lib/types';
import { BaseService } from '@lib/common';

export interface ItemsDto extends ItemTable {
  count: number;
}

export interface ItemsDtoFilter {
  name: string;
  type: number;
}

class ItemService extends BaseService {
  private static instance: ItemService;

  private constructor() {
    super('/item');
  }

  public static getInstance(): ItemService {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService();
    }
    return ItemService.instance;
  }

  public async getItems(search?: ItemsDtoFilter): Promise<ItemsDto[]> {
    return this.httpClient.post<ItemsDto[]>(`${this.endpoint}/`, search, false);
  }

  public async addItem(item: Omit<ItemTable, 'id'>): Promise<void> {
    await this.httpClient.post(`${this.endpoint}/add`, item, false);
  }

  public async getItemTypes(): Promise<ItemTypeTable[]> {
    return this.httpClient.get<ItemTypeTable[]>(`${this.endpoint}/type`, false);
  }
}

export const getItems = async (search?: ItemsDtoFilter) => {
  return await ItemService.getInstance().getItems(search);
};

export const getItemTypes = async () => {
  return ItemService.getInstance().getItemTypes();
};

export const addItem = async (item: Omit<ItemTable, 'id'>) => {
  await ItemService.getInstance().addItem(item);
};
