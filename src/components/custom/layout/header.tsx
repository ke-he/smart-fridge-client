import { Bell, Search } from 'lucide-react';
import { useRoute } from '@/contexts/route.context';

export default function Header() {
    const { activeTab } = useRoute();

    return (
        <header className="flex justify-between items-center p-3 mb-5 w-full ml-0 lg:pl-64 px-4 md:px-6">
            <Search />
            <span className="pageTitle">{activeTab?.name.toLowerCase() ?? ''}</span>
            <Bell />
        </header>
    );
}
