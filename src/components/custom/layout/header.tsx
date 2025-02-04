import { Bell, Search, Settings } from 'lucide-react';
import { useRoute } from '@/contexts/route.context';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { activeTab } = useRoute();
  const router = useRouter();

  return (
    <header className="flex justify-between items-center p-3 mb-5 w-full ml-0 lg:pl-64 px-4 md:px-6">
      <Search />
      <span className="pageTitle">{activeTab?.name.toLowerCase() ?? ''}</span>
      <div className="flex gap-4">
        <Bell />
        <Settings onClick={() => router.replace('/settings')} />
      </div>
    </header>
  );
}
