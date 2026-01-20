import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Nav from '@/components/layout/nav';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* GLOBAL NAVIGATION */}
      <Nav />

      {/* PAGE CONTENT */}
      <main className="py-8 flex-1">
        <Outlet />
      </main>

      {/* DEVTOOLS (Only shows in dev mode) */}
      <TanStackRouterDevtools />
    </div>
  );
}
