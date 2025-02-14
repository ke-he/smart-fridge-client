'use client';

import { ThemeProvider } from '@/components/custom/theme/theme-provider';
import Navbar from '@/components/custom/layout/navigation';
import ItemProvider from '@/contexts/item.provider';
import { RouteProvider } from '@/contexts/route.context';
import Header from '@/components/custom/layout/header';
import SidebarNav from '@/components/custom/layout/sidebar';
import { AuthProvider, useAuth } from '@/contexts/auth.provider';
import LoginScreen from '@/components/auth/login-screen';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthLayout>{children}</AuthLayout>
    </AuthProvider>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {isLoggedIn ? (
        <ItemProvider>
          <RouteProvider>
            <Header />
            <div className="flex h-screen w-screen">
              <SidebarNav className="hidden lg:block w-64 fixed left-0 top-0 h-full" />
              <main className="flex-1 ml-0 lg:ml-64 flex flex-col">
                {children}
              </main>
            </div>
            <Navbar />
          </RouteProvider>
        </ItemProvider>
      ) : (
        <LoginScreen />
      )}
    </ThemeProvider>
  );
}
