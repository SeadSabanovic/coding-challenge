import { Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AnimatePresence, motion } from 'motion/react';

import Nav from '@/components/layout/nav';

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />

      <AnimatePresence>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-1 flex-col py-8"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <TanStackRouterDevtools />
    </div>
  );
}
