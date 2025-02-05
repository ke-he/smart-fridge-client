'use server';

import { ItemTable, ItemTypeTable } from '@lib/types';
import { BaseService } from '@lib/common';

export interface ItemsDto extends ItemTable {
  image_url: any;
  count: number;
}

export interface ItemsDtoFilter {
  name: string | null;
  type: number | null;
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

  public async getItemsNearExpiry(): Promise<ItemsDto[]> {
    return this.httpClient.get<ItemsDto[]>(
      `${this.endpoint}/near-expiry`,
      false,
    );
  }

  public async getItemsLastAdded(): Promise<ItemsDto[]> {
    return this.httpClient.get<ItemsDto[]>(
      `${this.endpoint}/last-added`,
      false,
    );
  }
}

export const getItems = async (search?: ItemsDtoFilter) => {
  return await ItemService.getInstance().getItems(search);
};

export const getItemTypes = async () => {
  return ItemService.getInstance().getItemTypes();
};

export const getItemsNearExpiry = async () => {
  return ItemService.getInstance().getItemsNearExpiry();
};

export const getItemsLastAdded = async () => {
  return ItemService.getInstance().getItemsLastAdded();
};

export const addItem = async (item: {
  item_type_id: number;
  image_url: string | null;
  name: string;
  expiration_date: string;
  created_by: number;
}) => {
  await ItemService.getInstance().addItem(item);
};
