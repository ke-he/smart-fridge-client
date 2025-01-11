'use client';

import { ThemeProvider } from '@/components/custom/theme/theme-provider';
import Navbar from '@/components/custom/layout/navigation';
import ItemProvider from '@/contexts/item.provider';
import { RouteProvider } from '@/contexts/route.context';
import Header from '@/components/custom/layout/header';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ItemProvider>
        <RouteProvider>
          <Header />
          <div className="flex h-screen w-screen flex-col">{children}</div>
          <Navbar />
        </RouteProvider>
      </ItemProvider>
    </ThemeProvider>
  );
}
