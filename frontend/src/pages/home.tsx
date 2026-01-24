import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import { Container } from '@/components/layout/container';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Link } from '@tanstack/react-router';

export function HomeComponent() {
  return (
    <Container className="flex flex-1 flex-col">
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-lg border p-4">
        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          <h3 className="mx-auto max-w-2xl text-center text-2xl font-bold">
            Welcome to the Evermore Coding-Challenge!
          </h3>
          <p className="mx-auto max-w-2xl text-center text-muted-foreground">
            This is the starting point of your coding challenge. Feel free to adjust the
            technologies and architecture, the goal of this template is to provide you a starting
            point for the solution.
          </p>
          <Link to="/calendar">
            <InteractiveHoverButton>Calendar</InteractiveHoverButton>
          </Link>
        </div>

        <StarsBackground
          starColor="#c9c9c9"
          className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,#f5f5f5_0%,#fff_100%)]"
        />
      </div>
    </Container>
  );
}
