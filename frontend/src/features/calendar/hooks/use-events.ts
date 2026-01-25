import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  type CreateEventPayload,
  type UpdateEventPayload,
  ApiError,
} from '@/api/events';

// Query key
export const eventsQueryKey = ['events'] as const;

// Fetch all events
export function useEvents() {
  return useQuery({
    queryKey: eventsQueryKey,
    queryFn: getEvents,
  });
}

// Create event mutation
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventsQueryKey });
    },
  });
}

// Update event mutation
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateEventPayload }) =>
      updateEvent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventsQueryKey });
    },
  });
}

// Delete event mutation
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventsQueryKey });
    },
  });
}

// Re-export ApiError for use in components
export { ApiError };
