import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { useRoute } from '@/contexts/route.context';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth.provider';

export default function Header() {
    const { activeTab } = useRoute();
    const router = useRouter();
    const { logout } = useAuth(); // Auth-Logout Funktion

    return (
        <header className="flex justify-between items-center p-3 mb-5 w-full ml-0 lg:pl-64 px-4 md:px-6">
            <Search />
            <span className="pageTitle">{activeTab?.name.toLowerCase() ?? ''}</span>
            <div className="flex gap-4">
                <Bell />
                <Settings onClick={() => router.replace('/settings')} className="cursor-pointer" />
                <LogOut
                    onClick={() => {
                        logout(); // User ausloggen
                        router.push('/login'); // Zur Login-Seite weiterleiten
                    }}
                    className="cursor-pointer text-red-600 hover:text-red-800 transition-all"
                />
            </div>
        </header>
    );
}
