import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/api/http';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Disable refetch on window focus
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },

  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error.message ? error.message : 'An error occurred');
    },
  }),

  mutationCache: new MutationCache({
    onError: (error) => {
      const message = error.message || 'An error occurred';

      // 4xx errors are client/validation errors - use warn
      // 5xx errors are server errors - use error
      if (error instanceof ApiError && error.statusCode < 500) {
        console.warn(message);
      } else {
        console.error(message);
      }
    },
  }),
});
