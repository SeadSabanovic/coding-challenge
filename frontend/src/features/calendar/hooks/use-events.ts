import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  all: ['events'] as const,
  range: (params: DateRangeParams) => ['events', params] as const,
};

// Fetch events by date range
export function useEvents(params: DateRangeParams) {
  return useQuery({
    queryKey: eventsKeys.range(params),
    queryFn: () => getEvents(params),
  });
}

// Create event mutation (no optimistic update - uses loading states)
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventsKeys.all });
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
      await queryClient.cancelQueries({ queryKey: eventsKeys.all });

      // Snapshot all event caches
      const previousCaches = queryClient.getQueriesData<CalendarEvent[]>({
        queryKey: eventsKeys.all,
      });

      // Optimistically update all caches that contain this event
      queryClient.setQueriesData<CalendarEvent[]>({ queryKey: eventsKeys.all }, (old) => {
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
      queryClient.invalidateQueries({ queryKey: eventsKeys.all });
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
      await queryClient.cancelQueries({ queryKey: eventsKeys.all });

      // Snapshot all event caches
      const previousCaches = queryClient.getQueriesData<CalendarEvent[]>({
        queryKey: eventsKeys.all,
      });

      // Optimistically remove from all caches
      queryClient.setQueriesData<CalendarEvent[]>({ queryKey: eventsKeys.all }, (old) => {
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
      queryClient.invalidateQueries({ queryKey: eventsKeys.all });
    },
  });
}

// Re-export ApiError for use in components
export { ApiError };
