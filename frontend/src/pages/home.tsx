import { Container } from '@/components/layout/container';

export function HomeComponent() {
  return (
    <Container>
      <h3 className="text-2xl">Welcome to the Evermore Coding-Challenge!</h3>
      <p className="text-muted-foreground">
        This is the starting point of your coding challenge. Feel free to adjust the technologies
        and architecture, the goal of this template is to provide you a starting point for the
        solution.
      </p>
    </Container>
  );
}
