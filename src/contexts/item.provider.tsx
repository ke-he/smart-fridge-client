import { ItemTable, ItemTypeTable } from '@lib/database';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  addItem,
  getItems,
  getItemTypes,
  increaseItem,
  ItemsDto,
  ItemsDtoFilter,
} from '@service/item';
import { AppProviderArgs } from '@lib/common';

interface ItemContext {
  items: ItemsDto[];
  loadItems: (search?: ItemsDtoFilter) => Promise<ItemsDto[]>;
  addItem: (item: Omit<ItemTable, 'id'>) => Promise<void>;
  increaseItem: (id: number) => Promise<void>;
  types: ItemTypeTable[];
  loadItemTypes: () => Promise<ItemTypeTable[]>;
}

export const ItemContext = createContext<ItemContext>({
  items: [],
  loadItems: async () => [],
  addItem: async () => {},
  increaseItem: async () => {},
  types: [],
  loadItemTypes: async () => [],
});

const ItemProvider = ({ children }: AppProviderArgs) => {
  const [items, setItems] = useState<ItemsDto[]>([]);
  const [types, setItemTypes] = useState<ItemTypeTable[]>([]);

  const _loadItems = async (search?: ItemsDtoFilter) => {
    const items = await getItems(search);
    setItems(items);
    return items;
  };

  const _addItem = async (item: Omit<ItemTable, 'id'>) => {
    await addItem(item);
    await _loadItems();
  };

  const _increaseItem = async (id: number) => {
    await increaseItem(id);
    await _loadItems();
  };

  const loadItemTypes = async () => {
    const types = await getItemTypes();
    setItemTypes(types);
    return types;
  };

  useEffect(() => {
    _loadItems().then();
    loadItemTypes().then();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        items: items,
        loadItems: _loadItems,
        addItem: _addItem,
        increaseItem: _increaseItem,
        types: types,
        loadItemTypes: loadItemTypes,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);

export default ItemProvider;
