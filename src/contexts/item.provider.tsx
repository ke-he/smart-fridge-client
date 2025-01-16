import { ItemTable, ItemTypeTable } from '@lib/types';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  addItem,
  getItems,
  getItemTypes,
  getItemsNearExpiry,
  ItemsDto,
  ItemsDtoFilter,
  getItemsLastAdded,
} from '@service/item';
import { AppProviderArgs } from '@lib/common';

interface ItemContext {
  items: ItemsDto[];
  itemsNearExpiry: ItemsDto[];
  itemsLastAdded: ItemsDto[];
  loadItems: (search?: ItemsDtoFilter) => Promise<ItemsDto[]>;
  addItem: (item: Omit<ItemTable, 'id'>) => Promise<void>;
  // increaseItem: (id: number) => Promise<void>;
  types: ItemTypeTable[];
  loadItemTypes: () => Promise<ItemTypeTable[]>;
  loadItemsNearExpiry: () => Promise<ItemsDto[]>;
  loadItemsLastAdded: () => Promise<ItemsDto[]>;
}

export const ItemContext = createContext<ItemContext>({
  items: [],
  itemsNearExpiry: [],
  itemsLastAdded: [],
  loadItems: async () => [],
  addItem: async () => {},
  // increaseItem: async () => {},
  types: [],
  loadItemTypes: async () => [],
  loadItemsNearExpiry: async () => [],
  loadItemsLastAdded: async () => [],
});

const ItemProvider = ({ children }: AppProviderArgs) => {
  const [items, setItems] = useState<ItemsDto[]>([]);
  const [types, setItemTypes] = useState<ItemTypeTable[]>([]);
  const [itemsNearExpiry, setItemsNearExpiry] = useState<ItemsDto[]>([]);
  const [itemsLastAdded, setItemsLastAdded] = useState<ItemsDto[]>([]);

  const _loadItems = async (search?: ItemsDtoFilter) => {
    const items = await getItems(search);
    setItems(items);
    return items;
  };

  const _addItem = async (item: Omit<ItemTable, 'id'>) => {
    await addItem(item);
    await _loadItems();
  };
  //
  // const _increaseItem = async (id: number) => {
  //   await increaseItem(id);
  //   await _loadItems();
  // };

  const loadItemTypes = async () => {
    const types = await getItemTypes();
    setItemTypes(types);
    return types;
  };

  const loadItemsNearExpiry = async () => {
    const items = await getItemsNearExpiry();
    setItemsNearExpiry(items);
    return items;
  };

  const loadItemsLastAdded = async () => {
    const items = await getItemsLastAdded();
    setItemsLastAdded(items);
    return items;
  };

  useEffect(() => {
    _loadItems().then();
    loadItemTypes().then();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        items: items,
        itemsNearExpiry: itemsNearExpiry,
        itemsLastAdded: itemsLastAdded,
        loadItems: _loadItems,
        addItem: _addItem,
        // increaseItem: _increaseItem,
        types: types,
        loadItemTypes: loadItemTypes,
        loadItemsNearExpiry: loadItemsNearExpiry,
        loadItemsLastAdded: loadItemsLastAdded,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);

export default ItemProvider;
