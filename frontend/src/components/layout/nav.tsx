import { Link } from '@tanstack/react-router';
import { Calendar, Home, Menu, type LucideIcon } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Container } from './container';

const NAV_ITEMS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/calendar', label: 'Calendar', icon: Calendar },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="container flex h-14 items-center">
        <nav className="flex w-full items-center justify-between gap-2">
          <Link to="/">
            <h1 className="mr-8 text-lg font-semibold whitespace-nowrap">Calendar Scheduling</h1>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <Button key={to} variant="ghost" asChild>
                <Link to={to} activeProps={{ className: 'font-bold underline underline-offset-4' }}>
                  <Icon />
                  {label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile nav */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
                <DrawerDescription className="sr-only">Navigation</DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-2 p-4 pb-20">
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                  <DrawerClose key={to} asChild>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to={to}>
                        <Icon />
                        {label}
                      </Link>
                    </Button>
                  </DrawerClose>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </nav>
      </Container>
    </header>
  );
}
