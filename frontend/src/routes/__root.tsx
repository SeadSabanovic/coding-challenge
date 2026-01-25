import { Navigate, createRootRoute } from '@tanstack/react-router';
import { RootLayout } from '../layouts/root';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <Navigate to="/" replace />,
});
