import { Bell, Settings, LogOut } from 'lucide-react';
import { useRoute } from '@/contexts/route.context';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth.provider';

export default function Header() {
  const { activeTab } = useRoute();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <header className="relative flex items-center justify-between px-6 py-4 mb-2">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <h1 className="pageTitle absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-900">
        {activeTab?.name.toLowerCase() ?? 'dashboard'}
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => router.replace('/settings')}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Settings className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="p-2 rounded-md hover:bg-red-100 transition"
        >
          <LogOut className="w-6 h-6 text-red-600 hover:text-red-800" />
        </button>
      </div>
    </header>
  );
}
