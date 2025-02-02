'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { Book, Home, List, Plus } from 'lucide-react';

interface Tab {
  name: string;
  icon: React.ReactNode;
  id: string;
  path: string;
}

interface RouteContextType {
  activeTabId: string | null;
  activeTab: Tab | null;
  pathname: string;
  setActiveTabId: (id: string | null) => void;
  tabs: Tab[];
}

// Route Context erstellen
const RouteContext = createContext<RouteContextType | undefined>(undefined);

// Tabs für Navigation
const tabs: Tab[] = [
  { name: 'Home', icon: <Home />, id: 'home', path: '/' },
  { name: 'Inventory', icon: <List />, id: 'inventory', path: '/inventory' },
  { name: 'Add Item', icon: <Plus />, id: 'add', path: '/add' },
  { name: 'Recipes', icon: <Book />, id: 'recipes', path: '/recipes' },
];

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  // Beim Laden den aktiven Tab aus URL setzen
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === pathname);
    setActiveTabId(currentTab ? currentTab.id : null);
  }, [pathname]);

  // Aktiven Tab aus der ID ableiten
  const activeTab = activeTabId
      ? tabs.find((tab) => tab.id === activeTabId) || null
      : null;

  return (
      <RouteContext.Provider
          value={{
            activeTabId,
            activeTab,
            pathname,
            setActiveTabId,
            tabs,
          }}
      >
        {children}
      </RouteContext.Provider>
  );
};

// Custom Hook
export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};
