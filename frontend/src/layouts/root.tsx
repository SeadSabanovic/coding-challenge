import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Nav from '@/components/layout/nav';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* GLOBAL NAVIGATION */}
      <Nav />

      {/* PAGE CONTENT */}
      <main className="flex flex-1 flex-col py-8">
        <Outlet />
      </main>

      {/* DEVTOOLS (Only shows in dev mode) */}
      <TanStackRouterDevtools />
    </div>
  );
}
