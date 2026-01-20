import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Container } from './container';

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="container flex h-14 items-center">
        <Link to="/">
          <h1 className="mr-8 text-lg font-semibold">Calendar Scheduling</h1>
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/" activeProps={{ className: 'font-bold underline underline-offset-4' }}>
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              to="/calendar"
              activeProps={{ className: 'font-bold underline underline-offset-4' }}
            >
              Calendar
            </Link>
          </Button>
        </nav>
      </Container>
    </header>
  );
}
