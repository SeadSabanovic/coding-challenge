import { Container } from '@/components/layout/container';

export function HomeComponent() {
  return (
    <Container className="flex flex-1 flex-col">
      <div className="relative flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border p-4">
        <h3 className="mx-auto max-w-2xl text-center text-2xl font-bold">
          Welcome to the Evermore Coding-Challenge!
        </h3>
        <p className="mx-auto max-w-2xl text-center text-muted-foreground">
          This is the starting point of your coding challenge. Feel free to adjust the technologies
          and architecture, the goal of this template is to provide you a starting point for the
          solution.
        </p>
      </div>
    </Container>
  );
}
