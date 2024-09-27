'use client';

import { useDebounce } from '@/lib/hooks/useDebounce';
import { getItems, Item } from '@/lib/services/items';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ItemContext = {
  items: Item[];
  searchQuery?: string;
  setSearchQuery: (query: string) => void;
  itemType?: string;
  setItemType: (type: string) => void;
};

const ItemsContext = createContext<ItemContext>({
  items: [],
  setSearchQuery: () => {},
  setItemType: () => {},
});

export const ItemsContextProvider = ({
  items: _items,
  children,
}: {
  items: Item[];
  children: ReactNode[];
}) => {
  const [items, setItems] = useState<Item[]>(_items);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [itemType, setItemType] = useState<string>();

  const debouncedQuery = useDebounce(searchQuery);

  useEffect(() => {
    const load = async () => {
      const prevQuery = debouncedQuery;
      const prevType = itemType;

      const fetchedItems = await getItems({
        query: debouncedQuery,
        type: itemType,
      });
      if (prevQuery !== debouncedQuery || prevType !== itemType) return;

      setItems(fetchedItems);
    };
    load();
  }, [debouncedQuery, itemType]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        searchQuery,
        setSearchQuery,
        setItemType,
        itemType,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => useContext(ItemsContext);
