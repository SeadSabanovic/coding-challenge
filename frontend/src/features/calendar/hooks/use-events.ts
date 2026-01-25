import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  type CreateEventPayload,
  type UpdateEventPayload,
  type DateRangeParams,
} from '@/api/events';
import { ApiError } from '@/api/http';
import type { CalendarEvent } from '../types';

// Query key factory
export const eventsKeys = {
  root: ['events'] as const,
  list: () => [...eventsKeys.root, 'list'] as const,
  range: (params: DateRangeParams) => [...eventsKeys.list(), params.from, params.to] as const,
};

// Fetch events by date range
export function useEvents(params: DateRangeParams) {
  return useQuery({
    queryKey: eventsKeys.range(params),
    queryFn: ({ signal }) => getEvents(params, { signal }),
    placeholderData: keepPreviousData,
  });
}

// Create event mutation (no optimistic update - uses loading states)
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventsKeys.root });
    },
  });
}

// Update event mutation with optimistic update
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateEventPayload }) =>
      updateEvent(id, payload),

    onMutate: async ({ id, payload }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventsKeys.root });

      // Snapshot all event caches
      const previousCaches = queryClient.getQueriesData<CalendarEvent[]>({
        queryKey: eventsKeys.root,
      });

      // Optimistically update all caches that contain this event
      queryClient.setQueriesData<CalendarEvent[]>({ queryKey: eventsKeys.root }, (old) => {
        if (!old) return old;
        return old.map((event) => (event.id === id ? { ...event, ...payload } : event));
      });

      return { previousCaches };
    },

    onError: (_err, _variables, context) => {
      // Rollback to previous state
      if (context?.previousCaches) {
        context.previousCaches.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: eventsKeys.root });
    },
  });
}

// Delete event mutation with optimistic delete
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),

    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventsKeys.root });

      // Snapshot all event caches
      const previousCaches = queryClient.getQueriesData<CalendarEvent[]>({
        queryKey: eventsKeys.root,
      });

      // Optimistically remove from all caches
      queryClient.setQueriesData<CalendarEvent[]>({ queryKey: eventsKeys.root }, (old) => {
        if (!old) return old;
        return old.filter((event) => event.id !== id);
      });

      return { previousCaches };
    },

    onError: (_err, _id, context) => {
      // Rollback to previous state
      if (context?.previousCaches) {
        context.previousCaches.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: eventsKeys.root });
    },
  });
}

// Re-export ApiError for use in components
export { ApiError };
