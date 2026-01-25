import type { CalendarEvent, EventColor } from '@/features/calendar/types';

import { API_BASE_URL } from './config';
import { fetchWithTimeout, handleResponse } from './http';

function isEventColor(value: string): value is EventColor {
  return (
    value === 'blue' ||
    value === 'green' ||
    value === 'red' ||
    value === 'yellow' ||
    value === 'purple' ||
    value === 'orange'
  );
}

// API response type (matches backend Event model)
interface ApiEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  timezone: string;
  color: EventColor;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// Transform API response to frontend type
const toCalendarEvent = (apiEvent: ApiEvent): CalendarEvent => {
  const color = isEventColor(apiEvent.color) ? apiEvent.color : 'blue';

  return {
    id: apiEvent.id,
    title: apiEvent.title,
    startDate: apiEvent.startDate,
    endDate: apiEvent.endDate,
    timezone: apiEvent.timezone,
    color,
    description: apiEvent.description ?? undefined,
  };
};

// Create event payload
export interface CreateEventPayload {
  title: string;
  startDate: string;
  endDate: string;
  timezone: string;
  color: EventColor;
  description?: string;
}

// Update event payload
export type UpdateEventPayload = Partial<CreateEventPayload>;

// Date range params for fetching events
export interface DateRangeParams {
  from: string; // ISO date string
  to: string; // ISO date string
}

// Get events by date range
export async function getEvents(params: DateRangeParams): Promise<CalendarEvent[]> {
  const url = new URL(`${API_BASE_URL}/events`);
  url.searchParams.set('from', params.from);
  url.searchParams.set('to', params.to);

  const response = await fetchWithTimeout(url);
  const apiEvents = await handleResponse<ApiEvent[]>(response);
  return apiEvents.map(toCalendarEvent);
}

// Get single event
export async function getEvent(id: string): Promise<CalendarEvent> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/events/${id}`);
  const apiEvent = await handleResponse<ApiEvent>(response);
  return toCalendarEvent(apiEvent);
}

// Create event
export async function createEvent(payload: CreateEventPayload): Promise<CalendarEvent> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const apiEvent = await handleResponse<ApiEvent>(response);
  return toCalendarEvent(apiEvent);
}

// Update event
export async function updateEvent(id: string, payload: UpdateEventPayload): Promise<CalendarEvent> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const apiEvent = await handleResponse<ApiEvent>(response);
  return toCalendarEvent(apiEvent);
}

// Delete event
export async function deleteEvent(id: string): Promise<void> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE',
  });
  await handleResponse<void>(response);
}
