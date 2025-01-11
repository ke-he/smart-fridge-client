import { Bell, Search } from 'lucide-react';
import { useRoute } from '@/contexts/route.context';

export default function Header() {
  const { activeTab } = useRoute();

  return (
    <header className="flex w-screen justify-between items-center p-3 mb-5">
      <Search />
      <span className="pageTitle">{activeTab?.name.toLowerCase() ?? ''}</span>
      <Bell />
    </header>
  );
}
