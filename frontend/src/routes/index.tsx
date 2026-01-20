import { createFileRoute } from '@tanstack/react-router';
import { HomeComponent } from '../pages/home';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
